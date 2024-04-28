from Bio import Entrez
from bs4 import BeautifulSoup
import re


def remove_latex(text):
    """ Remove LaTeX from text using regex. """
    cleaned_text = re.sub(r'\\.+?{.*?}', '', text)
    cleaned_text = re.sub(r'[{}\\]', '', cleaned_text)
    cleaned_text = re.sub(r'\b(ABSTRACT|METHODS)\b', '', cleaned_text, flags=re.IGNORECASE)  # Improved regex
    return cleaned_text


def clean_text(text):
    """ Clean and prepare text for output. """
    text = remove_latex(text)
    text = text.replace('\n', ' ').strip()  # Replace newlines with spaces
    return ' '.join(text.split())  # Removes excessive whitespace


Entrez.email = "polymathykhan@gmail.com"  # legally required


def search_pmc_articles(query, max_papers):
    handle = Entrez.esearch(db="pmc", term=query, retmax=max_papers)
    record = Entrez.read(handle)
    handle.close()
    return record["IdList"]


def fetch_full_text(paper_id):
    try:
        handle = Entrez.efetch(db="pmc", id=paper_id, rettype="xml", retmode="xml")
        xml_data = handle.read()
        handle.close()
        return xml_data
    except Exception as e:
        print(f"Failed to fetch data for paper ID {paper_id}: {str(e)}")
        return None


# Fetch paper IDs
query = "molecular biology[Title] AND open access[Filter]"
max_papers = 1000
paper_ids = search_pmc_articles(query, max_papers*20)

# Open a file to write
with open('papers_data_newbig.txt', 'w', encoding='utf-8') as file:
    current_papers = 0
    for paper_id in paper_ids:
        if current_papers >= max_papers:
            break
        xml_full_text = fetch_full_text(paper_id)
        if not xml_full_text:
            continue

        soup = BeautifulSoup(xml_full_text, 'xml')

        abstract_text = soup.find('abstract')
        method_section = soup.find('sec', {'sec-type': 'methods'})

        if abstract_text and method_section:
            abstract_content = clean_text(abstract_text.get_text())
            method_content = clean_text(method_section.get_text())

            file.write(
                f"Here is an example past experiment's abstract which tells you amongst other things the main results of what was studied, what methods do you think were used for it? {abstract_content}\n")
            file.write(
                f"{method_content}\n\n")

            current_papers += 1
