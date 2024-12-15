import os
import requests
from flask import Flask, redirect, request, jsonify
from dotenv import load_dotenv
import urllib.parse
from flask_cors import CORS
from google import generativeai as genai

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize Google Gemini
genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
model = genai.GenerativeModel('gemini-pro')

# Strava OAuth configuration
CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
REDIRECT_URI = os.getenv('STRAVA_REDIRECT_URI')
AUTH_URL = "https://www.strava.com/oauth/authorize"
TOKEN_URL = "https://www.strava.com/oauth/token"

# Store the access token in memory (in a real app, use a proper database)
current_token = None

# Add CORS headers to all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')  # Allow all origins for development
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def index():
    """Initialize Strava OAuth flow with required scopes"""
    # Print environment variables for debugging
    print(f"Client ID: {CLIENT_ID}")
    print(f"Redirect URI: {REDIRECT_URI}")
    
    if not CLIENT_ID or not CLIENT_SECRET or not REDIRECT_URI:
        print("Missing required environment variables!")
        return "Error: Missing Strava configuration", 500
        
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'approval_prompt': 'force',
        'scope': 'activity:read_all,profile:read_all'
    }
    
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    print(f"Redirecting to: {auth_url}")
    return redirect(auth_url)

@app.route('/callback')
def callback():
    """Handle Strava OAuth callback"""
    global current_token
    
    print("Callback received with args:", request.args)
    print(f"Client ID: {CLIENT_ID}")
    print(f"Redirect URI: {REDIRECT_URI}")
    
    if 'error' in request.args:
        error = request.args.get('error')
        print(f"Error in callback: {error}")
        return redirect(f'http://localhost:3008?error={error}')
    
    code = request.args.get('code')
    if not code:
        print("No code in callback")
        return redirect('http://localhost:3008?error=no_code')
    
    print(f"Exchanging code for token...")
    # Exchange authorization code for tokens
    token_data = {
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET,
        'code': code,
        'grant_type': 'authorization_code'
    }
    print(f"Token request data: {token_data}")
    
    try:
        token_response = requests.post(TOKEN_URL, data=token_data)
        print(f"Token response status: {token_response.status_code}")
        print(f"Token response: {token_response.text}")
        
        if token_response.status_code != 200:
            return redirect('http://localhost:3008?error=token_error')
        
        token_json = token_response.json()
        current_token = token_json['access_token']
        print("Successfully got access token")
        
        return redirect('http://localhost:3008')
        
    except Exception as e:
        print(f"Error during token exchange: {str(e)}")
        return redirect('http://localhost:3008?error=token_exchange_error')

@app.route('/api/activities')
def get_activities():
    """Return activities as JSON"""
    global current_token
    
    if not current_token:
        return jsonify({'error': 'Not authorized'}), 401
    
    headers = {'Authorization': f'Bearer {current_token}'}
    activities_url = "https://www.strava.com/api/v3/athlete/activities"
    
    # First get the list of activities
    activities_response = requests.get(activities_url, headers=headers, params={'per_page': 9})
    
    if activities_response.status_code == 401:
        # Token expired or invalid, clear it and return unauthorized
        current_token = None
        return jsonify({'error': 'Not authorized'}), 401
    
    if activities_response.status_code != 200:
        return jsonify({'error': 'Failed to fetch activities'}), 500
        
    activities = activities_response.json()
    
    # For each activity, get the detailed information
    detailed_activities = []
    for activity in activities:
        activity_id = activity['id']
        detailed_url = f"https://www.strava.com/api/v3/activities/{activity_id}"
        detailed_response = requests.get(detailed_url, headers=headers, params={
            'include_all_efforts': True
        })
        
        if detailed_response.status_code == 200:
            detailed_activity = detailed_response.json()
            
            # Add weather data if available
            if 'start_latlng' in detailed_activity and detailed_activity['start_latlng']:
                lat, lng = detailed_activity['start_latlng']
                start_date = detailed_activity['start_date']
                weather_data = get_weather_data(lat, lng, start_date)
                if weather_data:
                    detailed_activity['weather'] = weather_data
            
            detailed_activities.append(detailed_activity)
        else:
            # If we can't get details, use the basic activity data
            detailed_activities.append(activity)
    
    return jsonify(detailed_activities)

def get_weather_data(lat, lng, date):
    """Get historical weather data for the activity"""
    # You would need to implement this using a weather API service
    # For now, returning None as it requires additional setup
    return None

@app.route('/api/chat', methods=['POST'])
def chat():
    """Handle chat requests"""
    try:
        data = request.json
        message = data.get('message')
        
        if not message:
            return jsonify({'error': 'No message provided'}), 400

        # Generate response using Gemini
        response = model.generate_content(message)
        return jsonify({'response': response.text})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000)
