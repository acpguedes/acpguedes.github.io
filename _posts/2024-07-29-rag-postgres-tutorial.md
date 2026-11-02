---
layout: post
title: "Storing PDF embeddings in PostgreSQL for RAG"
display_title: "Storing <em>PDF embeddings</em> in PostgreSQL for RAG"
description: "Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL."
date: 2024-07-29
categories: ml-engineer rag
permalink: /ml-engineer/rag/rag-postgres-tutorial/
kind: "Tutorial"
section: "ML engineering / RAG"
art: /assets/art/rag-postgres-tutorial.svg
art_crop: /assets/art/rag-postgres-tutorial-crop.svg
art_alt: "Engraving: a PDF page unfolds into chunks, the chunks become vectors and flow into a PostgreSQL cylinder."
art_crop_alt: "Detail of the engraving: vectors arriving in a PostgreSQL cylinder."
art_caption: "Plate I — A page unfolds into chunks, chunks into vectors, vectors into PostgreSQL."
art_crop_caption: "Plate I, detail — vectors arriving in PostgreSQL."
steps:
  - { id: step-1-environment-setup, label: "Environment setup" }
  - { id: step-2-extracting-text-from-pdfs, label: "Extracting text from PDFs" }
  - { id: step-3-generating-embeddings-with-openai-api, label: "Generating embeddings" }
  - { id: step-4-postgresql-database-setup, label: "PostgreSQL setup" }
  - { id: step-5-processing-and-storing-pdfs, label: "Processing and storing PDFs" }
  - { id: step-6-data-insertion-verification, label: "Verifying the insert" }
toc:
  - { id: introduction, label: "Introduction" }
  - { id: prerequisites, label: "Prerequisites" }
  - { id: step-1-environment-setup, label: "Environment setup" }
  - { id: step-2-extracting-text-from-pdfs, label: "Extracting text from PDFs" }
  - { id: step-3-generating-embeddings-with-openai-api, label: "Generating embeddings" }
  - { id: step-4-postgresql-database-setup, label: "PostgreSQL setup" }
  - { id: step-5-processing-and-storing-pdfs, label: "Processing and storing PDFs" }
  - { id: step-6-data-insertion-verification, label: "Verifying the insert" }
  - { id: conclusion, label: "Conclusion" }
---

## Introduction

By the end of this tutorial, the text of your PDF files will be split into chunks, converted to embeddings with the OpenAI API, and stored in PostgreSQL. That prepares your data for Retrieval-Augmented Generation (RAG): an application can then search those chunks and pass the relevant ones to a language model. The retrieval and generation steps are outside the scope of this tutorial.

Before starting, ensure that PostgreSQL is installed and configured. If you need assistance, follow the [official installation guide](https://www.postgresql.org/docs/current/tutorial-install.html) and [create a new database](https://www.postgresql.org/docs/current/tutorial-createdb.html).

## Prerequisites

To follow along, you will need:
- Python installed on your machine
- PostgreSQL installed and configured, with the `embedding` extension that `PGEmbedding` enables
- Access to the OpenAI API
- The following Python libraries:
  - `psycopg2`
  - `openai` (below version 1.0)
  - `PyPDF2`
  - `langchain` (below version 0.1)

## Hands-on 

### <span class="step-label">Step 1</span>Environment Setup {#step-1-environment-setup}

First, install the necessary libraries:

```bash
pip install psycopg2 "openai<1" PyPDF2 "langchain<0.1"
```

**Note** The code in this tutorial targets those older `openai` and `langchain` interfaces. It has been checked for valid syntax and imports, not run end to end against the OpenAI API and a database.
{: .note}
Set up the environment variable for the OpenAI API key. Ensure the `OPENAI_API_KEY` environment variable is set. For instructions, refer to [this guide](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety).

### <span class="step-label">Step 2</span>Extracting Text from PDFs {#step-2-extracting-text-from-pdfs}

Use the following function to extract text from PDF files using PyPDF2:

```python
from PyPDF2 import PdfReader

def extract_text_from_pdf(pdf_path):
    try:
        reader = PdfReader(pdf_path)
        text = ''
        for page in reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF {pdf_path}: {e}")
        return None
```

### <span class="step-label">Step 3</span>Generating Embeddings with OpenAI API {#step-3-generating-embeddings-with-openai-api}

The class below generates embeddings using the OpenAI API. The `embed_documents` method allows specifying a model, with the default being `"text-embedding-3-large"`:

```python
import openai
import time

class OpenAIEmbeddings:
    def embed_documents(self, texts, model="text-embedding-3-large"):
        valid_texts = [text for text in texts if isinstance(text, str) and text.strip()]
        if not valid_texts:
            print("No valid texts to generate embeddings.")
            return []

        all_embeddings = []
        batch_size = 2048  # Maximum number of texts per request

        for i in range(0, len(valid_texts), batch_size):
            batch_texts = valid_texts[i:i + batch_size]
            try:
                response = openai.Embedding.create(
                    input=batch_texts,
                    model=model
                )
                embeddings = [data['embedding'] for data in response['data']]
                all_embeddings.extend(embeddings)
            except openai.error.RateLimitError as e:
                print(f"Rate limit error: {e}. Waiting 60 seconds...")
                time.sleep(60)
            except openai.error.InvalidRequestError as e:
                print(f"Error generating embeddings: {e}")
                continue

        return all_embeddings
```

The loop divides `valid_texts` by number of texts, not by tokens: each request carries up to `batch_size` strings, whatever their length. A batch of long texts can still exceed the API's token limit, so lower `batch_size` if that happens.

**Note** You can specify a different model based on your needs, considering factors like vector size, computational efficiency, and data type.
{: .note}
### <span class="step-label">Step 4</span>PostgreSQL Database Setup {#step-4-postgresql-database-setup}

**Note** We assume that you already have a database set up.
{: .note}
Configure your database connection details:

```python
db_config = {
    'dbname': 'rag_test',
    'user': 'postgres',
    'password': '12345',
    'host': 'localhost',
    'port': '5432'
}

connection_string = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['dbname']}"
```

**Note** For production, avoid exposing sensitive information in your code. Use environment variables or secure vaults to manage credentials.
{: .note}
#### Clearing and Rebuilding the Database

Given that our dataset consists of only 6 PDF files totaling 23MB, it's efficient to clear and rebuild the entire database rather than updating or appending new data. This approach is feasible for small datasets and simplifies the data management process. 

To clear existing tables:

```python
import psycopg2

connection = psycopg2.connect(connection_string)
cursor = connection.cursor()

def clear_tables():
    cursor.execute("DROP TABLE IF EXISTS langchain_pg_embedding CASCADE;")
    cursor.execute("DROP TABLE IF EXISTS langchain_pg_collection CASCADE;")
    connection.commit()

clear_tables()
```

### <span class="step-label">Step 5</span>Processing and Storing PDFs {#step-5-processing-and-storing-pdfs}

Process the PDFs and store them in the database:

```python
from langchain.vectorstores.pgembedding import PGEmbedding
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
import os

def process_and_store_pdfs(directory):
    documents = []
    if not os.path.exists(directory):
        print(f"The directory {directory} does not exist.")
        return

    for filename in os.listdir(directory):
        if filename.endswith('.pdf'):
            pdf_path = os.path.join(directory, filename)
            print(f"Processing {filename}...")

            content = extract_text_from_pdf(pdf_path)
            if content:
                text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
                chunks = text_splitter.split_text(content)

                for chunk in chunks:
                    documents.append(Document(
                        page_content=chunk,
                        metadata={"title": filename}
                    ))

    if documents:
        embedding_function = OpenAIEmbeddings()
        vector_store = PGEmbedding(
            connection_string=connection_string,
            embedding_function=embedding_function
        )
        try:
            vector_store.add_documents(documents)
        except Exception as e:
            print(f"Error inserting documents into the database: {e}")
```

#### Set the path to your PDF files:

```python
pdf_directory = '/path/to/your/pdfs'
process_and_store_pdfs(pdf_directory)
```

### <span class="step-label">Step 6</span>Data Insertion Verification {#step-6-data-insertion-verification}

Verify that the data was correctly inserted:

```python
try:
    with psycopg2.connect(connection_string) as conn:
        with conn.cursor() as cursor:
            cursor.execute("SELECT COUNT(*) FROM langchain_pg_embedding;")
            count = cursor.fetchone()[0]
            print(f"Total number of documents in the 'langchain_pg_embedding' table: {count}")
except Exception as e:
    print(f"Error checking the 'langchain_pg_embedding' table: {e}")

cursor.close()
connection.close()
```

## Conclusion

This tutorial has guided you through setting up a system to extract text from PDFs, generate embeddings using the OpenAI API, and store the data in a PostgreSQL database. You can enhance this system by improving text extraction, refining text chunking methods, and optimizing database interactions.

**Note** This tutorial is designed for hands-on practice.
{: .note}
There are many ways to improve the efficiency of a RAG database, such as:
- Enhancing entity recognition and boundary detection
- Optimizing database schema and indexing
- Implementing advanced search and retrieval algorithms