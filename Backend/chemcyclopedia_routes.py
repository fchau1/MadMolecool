
from flask import Flask, jsonify, Blueprint
from db_config import db
import xml.etree.ElementTree as ET
import requests

chemcyclopedia_collection = db['Chemcyclopedia']
chemcyclopedia_routes = Blueprint('user_routes', __name__)

import requests
import xml.etree.ElementTree as ET
from flask import jsonify, Blueprint

chemcyclopedia_routes = Blueprint('chemcyclopedia_routes', __name__)

@chemcyclopedia_routes.route('/chemcyclopedia/<string:compound>')
def get_chemicals(compound):

    url = f'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{compound}/description/XML'

    response = requests.get(url)

    if response.status_code == 200:

        root = ET.fromstring(response.content)
        
        information_elements = root.findall('.//{http://pubchem.ncbi.nlm.nih.gov/pug_rest}Information')

        if information_elements:

            title_element = information_elements[0].find('{http://pubchem.ncbi.nlm.nih.gov/pug_rest}Title')
            title = title_element.text if title_element is not None else ""

            if len(information_elements) > 1:
                description_element = information_elements[1].find('{http://pubchem.ncbi.nlm.nih.gov/pug_rest}Description')
                description = description_element.text if description_element is not None else ""
            else:
                description = ""  
            
            return jsonify({'Title': title, 'Description': description})
        else:
            return jsonify({'error': 'No information found for the compound'}), 404
    else:
        return jsonify({'error': 'Could not retrieve data from PubChem'}), response.status_code



@chemcyclopedia_routes.route('/chemcyclopedia/img/<string:compound>')
def get_image(compound):
    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{compound}/PNG"

    response = requests.get(url)
    if response.status_code == 200:
        return response.content, 200, {'Content-Type': 'image/png'}
    else:
        return jsonify({'error': 'Failed to fetch image'}), response.status_code

from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/chemcyclopedia/molecular-weight/<string:compound>')
def fetch_molecular_weight(compound):
    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{compound}/property/MolecularWeight/JSON"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        molecular_weight = data['PropertyTable']['Properties'][0]['MolecularWeight']

        return jsonify({'molecular_weight': molecular_weight})
    else:

        return jsonify({'error': 'Failed to fetch molecular weight'}), response.status_code
