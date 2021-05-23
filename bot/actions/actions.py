# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

# from typing import Any, Text, Dict, List
#
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet

class ActionCheckWeather(Action):
   def name(self):
      return "action_check_weather"

   def run(self, dispatcher,
           tracker: Tracker,
           domain):

      dispatcher.utter_message("Hello World! from custom action")
      return []