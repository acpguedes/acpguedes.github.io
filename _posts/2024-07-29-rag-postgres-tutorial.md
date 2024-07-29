---
layout: post
title: "Rag Postgres Tutorial"
date: 2024-07-29
categories: ml-engineer rag rag-postgres-tutorial
permalink: /ml-engineer/rag/rag-postgres-tutorial/
---

# Tutorial: Creating a Database for RAG using PDFs and PostgreSQL

## Introduction

In this tutorial, we will guide you through the process of creating a database for Retrieval-Augmented Generation (RAG) applications using PDFs as source of information and PostgreSQL as database to store. This setup leverages the OpenAI API to generate text embeddings, which are then stored in a PostgreSQL database to facilitate efficient search and information retrieval.

Before starting, ensure that PostgreSQL is installed and configured. If you need assistance, follow the [official installation guide](https://www.postgresql.org/docs/current/tutorial-install.html) and [create a new database](#).

## Prerequisites

To follow along, you will need:
- Python installed on your machine
- PostgreSQL installed and configured
- Access to the OpenAI API
- The following Python libraries:
  - `psycopg2`
  - `openai`
  - `PyPDF2`
  - `langchain`

## Hands-on 

### Step 1: Environment Setup

First, install the necessary libraries:

```bash
pip install psycopg2 openai PyPDF2 langchain
```

Set up the environment variable for the OpenAI API key. Ensure the `OPENAI_API_KEY` environment variable is set. For instructions, refer to [this guide](https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety).

### Step 2: Extracting Text from PDFs

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

### Step 3: Generating Embeddings with OpenAI API

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
        batch_size is set to 2048  # Token limit per batch

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

**Note:** You can specify a different model based on your needs, considering factors like vector size, computational efficiency, and data type.

### Step 4: PostgreSQL Database Setup

**Note:** We assume that you already have a database set up.

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

**Note:** For production, avoid exposing sensitive information in your code. Use environment variables or secure vaults to manage credentials.

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

### Step 5: Processing and Storing PDFs

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

### Step 6: Data Insertion Verification

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

**Note:** This tutorial is designed for hands-on practice. If you want to understand how an embedding database works in depth, [see this article](#). 

There are many ways to improve the efficiency of a RAG database, such as:
- Enhancing entity recognition and boundary detection
- Optimizing database schema and indexing
- Implementing advanced search and retrieval algorithms