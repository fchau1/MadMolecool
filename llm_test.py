import json
from transformers import DistilBertTokenizer, DistilBertModel
from flask import Flask, request, jsonify

app = Flask(__name__)

# Load model and tokenizer
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased')
model = DistilBertModel.from_pretrained('distilbert-base-uncased')

@app.route('/predict', methods=['POST'])
def predict():
    # Get text from post request
    data = request.json
    text = data['text']

    # Tokenize and create tensor
    inputs = tokenizer(text, return_tensors="pt")
    outputs = model(**inputs)

    # Just return a simple output for demonstration (e.g., last hidden state)
    # return jsonify({'result': outputs.last_hidden_state.tolist()})

    # Create a JSON object and convert it to a string
    response_object = {'result': outputs.last_hidden_state.tolist()}
    response_string = json.dumps(response_object)  # Convert the Python dictionary to a JSON string

    return response_string, 200, {'ContentType':'application/json'}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
