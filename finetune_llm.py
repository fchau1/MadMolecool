from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments
import logging
from transformers import logging as hf_logging
import os

# Setup logging
logging.basicConfig(level=logging.INFO)  # Adjust as per the desired verbosity
hf_logging.set_verbosity_info()
hf_logging.enable_default_handler()
hf_logging.enable_explicit_format()

model = GPT2LMHeadModel.from_pretrained('distilgpt2')
tokenizer = GPT2Tokenizer.from_pretrained('distilgpt2')

train_dataset = TextDataset(
  tokenizer=tokenizer,
  file_path="papers_data.txt",
  block_size=256)

data_collator = DataCollatorForLanguageModeling(
  tokenizer=tokenizer, mlm=False)

training_args = TrainingArguments(
    output_dir="./distilgpt2-finetuned-swag",
    overwrite_output_dir=True,
    num_train_epochs=4,
    per_device_train_batch_size=8,
    gradient_accumulation_steps=2,
    learning_rate=2e-4,
    save_steps=1_000,
    save_total_limit=3,
    logging_dir='./logs',
    logging_steps=50,
)

trainer = Trainer(
  model=model,
  args=training_args,
  data_collator=data_collator,
  train_dataset=train_dataset,
)

trainer.train()

# Save model and tokenizer
model_path = "./saved_small_model_directory"

# Check if the directory exists, and if not, create it
if not os.path.exists(model_path):
    os.makedirs(model_path)


model.save_pretrained(model_path)
tokenizer.save_pretrained(model_path)
