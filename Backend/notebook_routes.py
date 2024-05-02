
from flask import Flask, jsonify, request, Blueprint
from pymongo import ReturnDocument
from db_config import db
import json
from bson import ObjectId

notebook_collection = db['Notebook']
notebook_routes = Blueprint('notebook_routes', __name__)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)


@notebook_routes.route('/notebooks', methods=['GET'])
def get_notebooks():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({"error": "User ID is required"}), 400

    output = []
    cursor = notebook_collection.find({"user_id": user_id})

    for data in cursor:
        data["_id"] = str(data["_id"])
        output.append(data)

    return jsonify({"data": output})

@notebook_routes.route('/notebooks/findOne', methods=['GET'])
def find_by_id_notebooks():
    notebook_id = request.args.get('notebook_id')

    # Use find_one instead of find to get a single document
    data = notebook_collection.find_one({"_id": ObjectId(notebook_id)})

    if data:  # Check if data is not None
        data["_id"] = str(data["_id"])
        return jsonify({"data": data})
    else:
        return jsonify({"message": "Notebook not found"}), 404


@notebook_routes.route('/notebooks/create', methods=['POST'])
def create_notebook():
    notebook = request.json

    if 'name' not in notebook and 'user_id' not in notebook:
        return jsonify({'error': 'Missing required fields'}), 400


    result = notebook_collection.insert_one(notebook)

    if result.inserted_id:
        return jsonify({'message': 'Notebook created successfully'}), 201
    else:
        return jsonify({'error': 'Failed to create notebook'}), 500

@notebook_routes.route('/notebooks/update/<string:notebook_id>', methods=['PUT'])
def update_notebook(notebook_id):
    notebook = request.json
    updated_notebook = notebook_collection.find_one_and_update(
        {'_id': ObjectId(notebook_id)},
        {'$set': notebook},
        return_document=ReturnDocument.AFTER
    )
    if updated_notebook:
        updated_notebook["_id"] = str(updated_notebook["_id"])
        return jsonify({'message': 'Notebook updated successfully', 'notebook': updated_notebook}), 200
    else:
        return jsonify({'message': 'Notebook not found'}), 404

@notebook_routes.route('/notebooks/delete/<string:notebook_id>', methods=['DELETE'])
def delete_notebook(notebook_id):

    result = notebook_collection.delete_one({'_id': ObjectId(notebook_id)})

    if result.deleted_count > 0:
        return jsonify({'message': 'Notebook deleted successfully'}), 200
    else:
        return jsonify({'message': 'Notebook not found'}), 404

