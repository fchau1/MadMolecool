import torch
from transformers import BertForMaskedLM, BertTokenizer

def load_model_and_tokenizer(model_path):
    model = BertForMaskedLM.from_pretrained(model_path)
    tokenizer = BertTokenizer.from_pretrained(model_path)
    return model, tokenizer


def generate_text(input_text, model, tokenizer):
    # Encode the input text
    input_ids = tokenizer.encode(input_text, return_tensors='pt')
    # Generate output from the model
    output = model.generate(input_ids, max_length=50, num_return_sequences=1)
    # Decode and print the output
    return tokenizer.decode(output[0], skip_special_tokens=True)


if __name__ == "__main__":
    model_path = "./saved_mountain_model_directory"  # Adjust the path as needed
    model, tokenizer = load_model_and_tokenizer(model_path)

    # Ensure model is in eval mode
    model.eval()

    print("Type 'exit' to quit.")
    while True:
        input_text = input("Enter your text: ")
        if input_text.lower() == 'exit':
            break
        response = generate_text(input_text, model, tokenizer)
        print("Generated text:", response)