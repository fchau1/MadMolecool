from flask import Flask
from pymongo import MongoClient

client = MongoClient('mongodb+srv://madScientist:molecoolPass@madmolecoolhackdavis202.uus6i9d.mongodb.net/')
db = client['madMolecool']
