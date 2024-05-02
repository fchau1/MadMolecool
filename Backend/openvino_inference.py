import torch
from transformers import GPT2LMHeadModel

# Load your pre-trained model
model = GPT2LMHeadModel.from_pretrained('./saved_gpt2_medium_nice_model_directory')
model.eval()

# Dummy input for the export
dummy_input = torch.randint(0, 50256, (1, 10))

# Export the model
torch.onnx.export(model, dummy_input, "model.onnx", opset_version=11, input_names=['input_ids'], output_names=['outputs'])
