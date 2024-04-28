from transformers import DistilBertTokenizer, DistilBertForQuestionAnswering
from flask import Flask, request, jsonify
import torch
app = Flask(__name__)

# Load model and tokenizer
tokenizer = DistilBertTokenizer.from_pretrained('distilbert-base-uncased-distilled-squad')
model = DistilBertForQuestionAnswering.from_pretrained('distilbert-base-uncased-distilled-squad')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    context = data['context']  # The passage where the answer might be located
    question = data['question']  # The question to answer

    # Tokenize and create tensors
    inputs = tokenizer.encode_plus(question, context, return_tensors='pt', add_special_tokens=True)
    input_ids = inputs['input_ids'].tolist()[0]

    outputs = model(**inputs)

    answer_start_scores, answer_end_scores = outputs.start_logits, outputs.end_logits
    answer_start = torch.argmax(answer_start_scores)
    answer_end = torch.argmax(answer_end_scores) + 1

    answer = tokenizer.convert_tokens_to_string(tokenizer.convert_ids_to_tokens(input_ids[answer_start:answer_end]))
    return jsonify({'result': answer})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
