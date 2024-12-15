from google import generativeai as genai
from elevenlabs import ElevenLabs, VoiceSettings
import sounddevice as sd
import soundfile as sf
import io
from config import *
import os
import sys
import keyboard
import threading

def initialize_apis():
    """Initialize the APIs with credentials"""
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        global eleven_client
        eleven_client = ElevenLabs(api_key=ELEVENLABS_API_KEY)
        print("APIs initialized successfully!")
    except Exception as e:
        print(f"Error initializing APIs: {e}")
        sys.exit(1)

def generate_response(prompt):
    """Generate response using Gemini model"""
    try:
        model = genai.GenerativeModel('gemini-2.0-flash-exp')
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        print(f"Error generating response: {e}")
        return None

def text_to_speech(text):
    """Convert text to speech using ElevenLabs Turbo"""
    try:
        # Get the audio bytes using Turbo model
        response = eleven_client.text_to_speech.convert(
            text=text,
            model_id="eleven_turbo_v2_5",
            voice_id="21m00Tcm4TlvDq8ikWAM",  # Rachel voice
            voice_settings=VoiceSettings(
                stability=0.5,
                similarity_boost=0.75,
                style=0.0,
                use_speaker_boost=True
            )
        )
        
        # Create a BytesIO object to hold the audio data
        audio_stream = io.BytesIO()
        
        # Write each chunk of audio data to the stream
        for chunk in response:
            if chunk:
                audio_stream.write(chunk)
        
        # Reset stream position to the beginning
        audio_stream.seek(0)
        
        # Convert to numpy array for playback
        audio_data, sample_rate = sf.read(audio_stream)
        return audio_data, sample_rate
    except Exception as e:
        print(f"Error generating speech: {e}")
        return None, None

# Global flag for audio control
is_playing = False
audio_thread = None

def stop_audio():
    """Stop audio playback"""
    global is_playing
    is_playing = False
    sd.stop()
    print("\nAudio stopped!")

def play_audio(audio_data, sample_rate):
    """Play the audio using sounddevice"""
    global is_playing, audio_thread
    try:
        is_playing = True
        sd.play(audio_data, sample_rate)
        
        # Wait for audio to finish or be stopped
        while is_playing and sd.get_stream().active:
            sd.wait()
            
    except Exception as e:
        print(f"\nError playing audio: {e}")
    finally:
        is_playing = False
        audio_thread = None

def get_user_input():
    """Get user input with error handling"""
    try:
        return input("\nYou: ")
    except (EOFError, KeyboardInterrupt):
        print("\nExiting chatbot...")
        sys.exit(0)

def main():
    print("\nInitializing chatbot...")
    initialize_apis()
    print("\nChatbot initialized! Type 'quit' to exit.")
    print("Press 'Esc' to stop audio playback at any time.")
    
    # Setup keyboard hook for Esc key
    keyboard.on_press_key('esc', lambda _: stop_audio())
    
    while True:
        try:
            user_input = get_user_input()
            
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("\nGoodbye!")
                break
                
            # Generate response using Gemini
            response = generate_response(user_input)
            if response:
                print(f"\nBot: {response}")
                
                # Convert to speech and play
                audio_data, sample_rate = text_to_speech(response)
                if audio_data is not None:
                    # Create and start audio thread
                    global audio_thread
                    if audio_thread is not None and audio_thread.is_alive():
                        stop_audio()
                        audio_thread.join()
                    
                    audio_thread = threading.Thread(target=play_audio, args=(audio_data, sample_rate))
                    audio_thread.start()
            
        except Exception as e:
            print(f"\nAn error occurred: {e}")
            print("Please try again or type 'quit' to exit.")
            continue

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\nFatal error: {e}")
        sys.exit(1)
