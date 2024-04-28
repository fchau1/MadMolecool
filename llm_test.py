from transformers import GPT2Tokenizer, GPT2LMHeadModel
from flask import Flask, request, jsonify

app = Flask(__name__)

# Path to your fine-tuned model
model_path = './saved_gpt2_medium_nice_model_directory'

# Load model and tokenizer from the specified path
tokenizer = GPT2Tokenizer.from_pretrained(model_path)
model = GPT2LMHeadModel.from_pretrained(model_path)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']

    # Tokenize and encode the input text
    inputs = tokenizer.encode(text, return_tensors='pt')
    outputs = model.generate(inputs, max_length=50)  # Adjust max_length as needed

    # Decode the output tokens to string
    text_output = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return jsonify({'result': text_output})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)