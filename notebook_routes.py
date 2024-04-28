
from flask import Flask, jsonify, request, Blueprint
from pymongo import ReturnDocument
from db_config import db

notebook_collection = db['Notebook']
notebook_routes = Blueprint('notebook_routes', __name__)

@notebook_routes.route('/notebooks/<string:user_id>')
def get_notebooks(user_id):

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

@notebook_routes.route('/notebook/create', methods=['POST'])
def create_notebook():
    notebook = request.json

    if 'name' not in notebook or 'summary' not in notebook or 'text' not in notebook or 'text' not in notebook or 'user_id' not in notebook:
        return jsonify({'error': 'Missing required fields'}), 400

    result = notebook_collection.insert_one(notebook)

    if result.inserted_id:
        return jsonify({'message': 'Notebook created successfully'}), 201
    else:
        return jsonify({'message': 'Failed to create notebook'}), 500

@notebook_routes.route('/notebooks/update/<string:notebook_id>', methods=['PUT'])
def update_notebook(notebook_id):

    notebook = request.json

    updated_notebook = notebook_collection.find_one_and_update(
        {'_id': notebook_id},
        {'$set': notebook},
        return_document=ReturnDocument.AFTER
    )

    if updated_notebook:
        return jsonify({'message': 'Notebook updated successfully', 'notebook': updated_notebook}), 200
    else:
        return jsonify({'message': 'Notebook not found'}), 404

@notebook_routes.route('/notebooks/delete/<string:notebook_id>', methods=['DELETE'])
def delete_notebook(notebook_id):

    result = notebook_collection.delete_one({'_id': notebook_id})

    if result.deleted_count > 0:
        return jsonify({'message': 'Notebook deleted successfully'}), 200
    else:
        return jsonify({'message': 'Notebook not found'}), 404

