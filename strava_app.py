import os
import requests
from flask import Flask, redirect, request, jsonify, session
from dotenv import load_dotenv
import urllib.parse
from flask_cors import CORS
import time

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.environ.get('FLASK_SECRET_KEY', 'dev-secret-key')
# Enable CORS with credentials support
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:3000"],
        "supports_credentials": True,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

# Strava OAuth configuration
CLIENT_ID = os.getenv('STRAVA_CLIENT_ID')
CLIENT_SECRET = os.getenv('STRAVA_CLIENT_SECRET')
REDIRECT_URI = "http://localhost:5000/callback"  # Override to use Flask endpoint
AUTH_URL = "https://www.strava.com/oauth/authorize"
TOKEN_URL = "https://www.strava.com/oauth/token"

@app.route('/')
def index():
    """Initialize Strava OAuth flow with required scopes"""
    params = {
        'client_id': CLIENT_ID,
        'response_type': 'code',
        'redirect_uri': REDIRECT_URI,
        'approval_prompt': 'force',
        'scope': 'activity:read_all,profile:read_all'
    }
    
    auth_url = f"{AUTH_URL}?{urllib.parse.urlencode(params)}"
    return redirect(auth_url)

@app.route('/callback')
def callback():
    """Handle the Strava OAuth callback"""
    try:
        error = request.args.get('error')
        if error:
            return redirect(f'http://localhost:3000/?error={error}')

        code = request.args.get('code')
        if not code:
            return redirect('http://localhost:3000/?error=no_code')

        # Exchange the authorization code for tokens
        response = requests.post(TOKEN_URL, data={
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'code': code,
            'grant_type': 'authorization_code'
        })

        if response.status_code != 200:
            error_data = response.json()
            print(f"Token exchange error: {error_data}")
            return redirect(f'http://localhost:3000/?error=token_exchange_failed')

        # Store tokens in session
        tokens = response.json()
        session['access_token'] = tokens['access_token']
        session['refresh_token'] = tokens['refresh_token']
        session['expires_at'] = tokens['expires_at']
        
        return redirect('http://localhost:3000')
    except Exception as e:
        print(f"Callback error: {str(e)}")
        return redirect('http://localhost:3000/?error=server_error')

@app.route('/api/activities')
def get_activities():
    """Return activities as JSON"""
    try:
        # Check if we have a valid token
        if 'access_token' not in session:
            return jsonify({'error': 'Not authorized'}), 401

        # Check if token is expired and refresh if needed
        if session.get('expires_at', 0) < time.time():
            if not refresh_token():
                return jsonify({'error': 'Failed to refresh token'}), 401

        headers = {'Authorization': f'Bearer {session["access_token"]}'}
        activities_url = "https://www.strava.com/api/v3/athlete/activities"
        
        # Get the list of activities
        response = requests.get(activities_url, headers=headers, params={'per_page': 9})
        
        if response.status_code == 401:
            # Token invalid, clear session
            session.clear()
            return jsonify({'error': 'Not authorized'}), 401
        
        if response.status_code != 200:
            return jsonify({'error': f'Strava API error: {response.status_code}'}), response.status_code
            
        return jsonify(response.json())
    except Exception as e:
        print(f"Error fetching activities: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def refresh_token():
    """Refresh the access token using the refresh token"""
    try:
        if 'refresh_token' not in session:
            return False

        response = requests.post(TOKEN_URL, data={
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'refresh_token': session['refresh_token'],
            'grant_type': 'refresh_token'
        })

        if response.status_code != 200:
            return False

        tokens = response.json()
        session['access_token'] = tokens['access_token']
        session['refresh_token'] = tokens['refresh_token']
        session['expires_at'] = tokens['expires_at']
        return True
    except Exception as e:
        print(f"Token refresh error: {str(e)}")
        return False

if __name__ == '__main__':
    app.run(port=5000, debug=True)
