# from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, \
#     TrainingArguments
# import logging
# from transformers import logging as hf_logging
# import os
# from torch.quantization import quantize_dynamic
# import torch
#
# # Setup logging
# logging.basicConfig(level=logging.INFO)  # Adjust as per the desired verbosity
# hf_logging.set_verbosity_info()
# hf_logging.enable_default_handler()
# hf_logging.enable_explicit_format()
#
#
# # Define the custom data collator
# class CustomDataCollatorForLanguageModeling(DataCollatorForLanguageModeling):
#     def collate_batch(self, features):
#         batch = super().collate_batch(features)
#         batch = {k: v.to(torch.bfloat16) if isinstance(v, torch.Tensor) else v for k, v in batch.items()}
#         return batch
#
#
# model = GPT2LMHeadModel.from_pretrained('distilgpt2').to(torch.bfloat16)
# tokenizer = GPT2Tokenizer.from_pretrained('distilgpt2')
#
# train_dataset = TextDataset(
#     tokenizer=tokenizer,
#     file_path="papers_data_biggest.txt",
#     block_size=256)
#
# # Instantiate the custom data collator
# data_collator = CustomDataCollatorForLanguageModeling(
#     tokenizer=tokenizer, mlm=False
# )
#
# training_args = TrainingArguments(
#     output_dir="./distilgpt2-finetuned-swag",
#     overwrite_output_dir=True,
#     num_train_epochs=4,
#     per_device_train_batch_size=8,
#     gradient_accumulation_steps=2,
#     learning_rate=2e-4,
#     save_steps=1_000,
#     save_total_limit=3,
#     logging_dir='./logs',
#     logging_steps=50,
#     fp16=False  # Ensure this is false since we're using bfloat16 manually
# )
#
# trainer = Trainer(
#     model=model,
#     args=training_args,
#     data_collator=data_collator,
#     train_dataset=train_dataset,
# )
#
# trainer.train()
#
# # Save model and tokenizer
# model_path = "./saved_biggest_model_directory"
#
# # Check if the directory exists, and if not, create it
# if not os.path.exists(model_path):
#     os.makedirs(model_path)
#
# model.save_pretrained(model_path)
# tokenizer.save_pretrained(model_path)
#
# # Load the full-precision model
# model.eval()  # Ensure the model is in evaluation mode
# quantized_model = quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8)
# quantized_model_path = "./quantized_model_directory"
# if not os.path.exists(quantized_model_path):
#     os.makedirs(quantized_model_path)
# torch.save(quantized_model.state_dict(), os.path.join(quantized_model_path, 'quantized_biggest_model.pth'))

# from transformers import BertForMaskedLM, BertTokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments
# import logging
# from transformers import logging as hf_logging
# import os
# from torch.quantization import quantize_dynamic
# import torch
#
# # Setup logging
# logging.basicConfig(level=logging.INFO)
# hf_logging.set_verbosity_info()
# hf_logging.enable_default_handler()
# hf_logging.enable_explicit_format()
#
# # Define the custom data collator for masked language modeling
# class CustomDataCollatorForLanguageModeling(DataCollatorForLanguageModeling):
#     def collate_batch(self, features):
#         batch = super().collate_batch(features)
#         batch = {k: v.to(torch.bfloat16) if isinstance(v, torch.Tensor) else v for k, v in batch.items()}
#         return batch
#
# # Load BioBERT
# model = BertForMaskedLM.from_pretrained('dmis-lab/biobert-v1.1').to(torch.bfloat16)
# tokenizer = BertTokenizer.from_pretrained('dmis-lab/biobert-v1.1')
#
# # Prepare the dataset
# train_dataset = TextDataset(
#     tokenizer=tokenizer,
#     file_path="papers_data_mountain.txt",
#     block_size=512)  # Adjust block_size if necessary
#
# data_collator = CustomDataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=True)
#
# training_args = TrainingArguments(
#     output_dir="./biobert-finetuned",
#     overwrite_output_dir=True,
#     num_train_epochs=4,
#     per_device_train_batch_size=8,
#     gradient_accumulation_steps=2,
#     learning_rate=2e-4,
#     save_steps=1_000,
#     save_total_limit=3,
#     logging_dir='./logs',
#     logging_steps=50,
#     fp16=False  # Ensure this is false since we're using bfloat16 manually
# )
#
# trainer = Trainer(
#     model=model,
#     args=training_args,
#     data_collator=data_collator,
#     train_dataset=train_dataset,
# )
#
# trainer.train()
#
# # Save model and tokenizer
# model_path = "./saved_mountain_model_directory"
# if not os.path.exists(model_path):
#     os.makedirs(model_path)
# model.save_pretrained(model_path)
# tokenizer.save_pretrained(model_path)
#
# # Quantize the model
# model.eval()  # Ensure the model is in evaluation mode
# quantized_model = quantize_dynamic(model, {torch.nn.Linear}, dtype=torch.qint8)
# quantized_model_path = "./quantized_model_directory"
# if not os.path.exists(quantized_model_path):
#     os.makedirs(quantized_model_path)
# torch.save(quantized_model.state_dict(), os.path.join(quantized_model_path, 'quantized_mountain_model.pth'))

from transformers import Phi3Model, Phi3Config, AutoTokenizer, Trainer, TrainingArguments
import logging
from transformers import logging as hf_logging
import os
import torch
from torch.utils.data import Dataset


class TextDataset(Dataset):
    def __init__(self, tokenizer, file_path, block_size=512):
        self.tokenizer = tokenizer
        self.block_size = block_size
        self.input_ids = []

        # Read and tokenize the file content in chunks
        with open(file_path, 'r', encoding='utf-8') as f:
            while True:
                text = f.read(1024 * 1024)  # Read approximately 1MB of text at a time
                if not text:
                    break
                tokens = tokenizer(text, add_special_tokens=True, truncation=True, max_length=block_size,
                                   return_tensors="pt")
                self.input_ids.extend(tokens.input_ids.tolist())

    def __len__(self):
        return len(self.input_ids) - self.block_size

    def __getitem__(self, idx):
        # Extract a sequence of tokens
        input_ids = self.input_ids[idx:idx + self.block_size]
        return {"input_ids": torch.tensor(input_ids, dtype=torch.long)}



# Setup logging
logging.basicConfig(level=logging.INFO)
hf_logging.set_verbosity_info()
hf_logging.enable_default_handler()
hf_logging.enable_explicit_format()

# Load Phi-3 model
configuration = Phi3Config.from_pretrained("microsoft/Phi-3-mini-4k-instruct")
model = Phi3Model(configuration).to(torch.bfloat16)

# Load tokenizer
tokenizer = AutoTokenizer.from_pretrained("microsoft/Phi-3-mini-4k-instruct")


# Initialize the dataset
train_dataset = TextDataset(tokenizer, "papers_data_mountain.txt", block_size=128)

# Custom data collator function (simplified for generality)
def custom_collate_fn(examples):
    batch = tokenizer.pad(
        examples,
        return_tensors='pt',
        padding=True,
        max_length=512
    )
    batch = {k: v.to(torch.bfloat16) if isinstance(v, torch.Tensor) else v for k, v in batch.items()}
    return batch


training_args = TrainingArguments(
    output_dir="./phi3-finetuned",
    overwrite_output_dir=True,
    num_train_epochs=4,
    per_device_train_batch_size=8,
    gradient_accumulation_steps=2,
    learning_rate=2e-4,
    save_steps=1_000,
    save_total_limit=3,
    logging_dir='./logs',
    logging_steps=50,
    fp16=False  # bfloat16 usage is manual
)

trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=custom_collate_fn,
    train_dataset=train_dataset,
)

trainer.train()

# Save model and tokenizer
model_path = "./saved_phi3_model_directory"
if not os.path.exists(model_path):
    os.makedirs(model_path)
model.save_pretrained(model_path)
tokenizer.save_pretrained(model_path)



