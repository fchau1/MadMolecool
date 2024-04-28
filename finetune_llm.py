from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments
import logging
from transformers import logging as hf_logging

# Setup logging
logging.basicConfig(level=logging.INFO)  # Options are: DEBUG, INFO, WARNING, ERROR, and CRITICAL
hf_logging.set_verbosity_info()
hf_logging.enable_default_handler()
hf_logging.enable_explicit_format()

# Load DistilGPT-2 model and tokenizer
model = GPT2LMHeadModel.from_pretrained('distilgpt2')
tokenizer = GPT2Tokenizer.from_pretrained('distilgpt2')

# Load dataset
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
    logging_dir='./logs',  # Save logs for monitoring the training
    logging_steps=50,
)

trainer = Trainer(
  model=model,
  args=training_args,
  data_collator=data_collator,
  train_dataset=train_dataset,
)

# Start training
trainer.train()
