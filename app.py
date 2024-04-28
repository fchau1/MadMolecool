from flask import Flask, jsonify
from pymongo import MongoClient

app = Flask(__name__)

client = MongoClient('mongodb+srv://madScientist:molecoolPass@madmolecoolhackdavis202.uus6i9d.mongodb.net/')
db = client['madMolecool']
notebook_collection = db['Notebook']
chemcyclopedia_collection = db['Chemcyclopedia']

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/notebooks/<string:user_id>')
def get_notebooks(user_id):
    # Query data from collection based on user_id
    cursor = notebook_collection.find({'user_id': user_id})
    notebooks = []
    for notebook in cursor:
        notebooks.append({
            'name': notebook['name'],
            'summary': notebook['summary'],
            'text': notebook['text'],
            'attachment_list': notebook['attachment_list'],
            'user_id': notebook['user_id']
        })
    return jsonify(notebooks)

@app.route('/chemcyclopedia/<string:compound>')
def get_chemicals(compound):
    cursor = notebook_collection.find({'chemical_name': compound})
    chemicals = []
    for chemical in cursor:
        chemicals.append({
            'bioavailability': chemical['bioavailability'],
            'chemical_name': chemical['chemical_name'],
            'elim_half_life': chemical['elim_half_life'],
            'iupac_name': chemical['iupac_name'],
            'metabolites': chemical['metabolites']
        })
    return jsonify(chemicals)

if __name__ == '__main__':
    app.run(debug=True)
