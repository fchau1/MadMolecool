# import json
#
#
# # Function to load JSON data from a file
# def load_json(filename):
#     with open(filename, 'r', encoding='utf-8') as file:
#         return json.load(file)
#
#
# # Function to save text data to a file
# def save_to_text(data, filename):
#     with open(filename, 'w', encoding='utf-8') as file:
#         file.write(data)
#
#
# # Function to process the JSON data into the desired text format
# def process_data(data):
#     formatted_text = ""
#     questions = data.get("questions", [])
#     for question in questions:
#         # Remove newline characters and ensure single line string
#         body = question["body"].replace('\n', ' ').strip()
#         ideal_answer = " ".join(question["ideal_answer"]).replace('\n', ' ').strip()
#
#         # Append the formatted question and answer to the result string
#         formatted_text += body + "\n" + ideal_answer + "\n\n"
#
#     return formatted_text
#
#
# # Main function to orchestrate the JSON to text conversion
# def main():
#     json_data = load_json("C:/Users/ibrah/Downloads/BioASQ-training12b/BioASQ-training12b/training12b_new.json")  # Load the JSON data
#     formatted_data = process_data(json_data)  # Process the data
#     save_to_text(formatted_data, "formatted_data.txt")  # Save the formatted text
#
#
# if __name__ == "__main__":
#     main()

import json

def load_json(filename):
    """Load JSON data from a file."""
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

def save_to_text(data, filename):
    """Save processed data to a text file."""
    with open(filename, 'w', encoding='utf-8') as file:
        for key, value in data.items():
            question = value['QUESTION'].replace('\n', ' ').strip()
            long_answer = value['LONG_ANSWER'].replace('\n', ' ').strip()
            # Write the question and long answer to the file
            file.write(question + '\n' + long_answer + '\n\n')

def main():
    # Load the JSON data from a file
    json_data = load_json("C:/Users/ibrah/Downloads/ori_pqaa.json")
    # Save the formatted data to a text file
    save_to_text(json_data, 'formatted_data_pqaa.txt')

if __name__ == "__main__":
    main()
