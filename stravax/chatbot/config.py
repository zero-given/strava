import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys
GOOGLE_API_KEY = "AIzaSyCPGIxOOt5isbCWJUpkJWQ7KcumcamFeu0"
ELEVENLABS_API_KEY = os.getenv('ELEVENLABS_API_KEY')
