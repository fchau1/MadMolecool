from flask import Flask, jsonify, Blueprint
from db_config import db

chemcyclopedia_collection = db['Chemcyclopedia']
chemcyclopedia_routes = Blueprint('user_routes', __name__)

@chemcyclopedia_routes.route('/chemcyclopedia/<string:compound>')
def get_chemicals(compound):
    cursor = chemcyclopedia_collection.find({'chemical_name': compound})
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