from flask import Blueprint, jsonify, request
import requests

pubchem_routes = Blueprint('pubchem_routes', __name__)

@pubchem_routes.route('/get_compound_by_name', methods=['GET'])
def get_compound_by_name():
    name = request.args.get('name')
    if not name:
        return jsonify({"error": "No chemical name provided"}), 400

    url = f"https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/{name}/JSON"
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({"error": "Failed to fetch data from PubChem"}), response.status_code
    
    data = response.json()
    return jsonify(data)