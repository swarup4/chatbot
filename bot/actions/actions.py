# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
import webbrowser
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet

class OpenVideo(Action):
   def name(self):
      return "open_video"

   def run(self, dispatcher, tracker: Tracker, domain):
      video = 'https://youtu.be/Jz28OYKlaLU'
      dispatcher.utter_message("Opening Video")
      webbrowser.open(video)
      return []