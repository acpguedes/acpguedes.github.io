
### Tutorial: Creating a Database for RAG using PDFs and PostgreSQL

## Introduction
In this tutorial, we will create a database for Retrieve and Generate (RAG) applications using PDFs and PostgreSQL. We will use the OpenAI API to generate text embeddings, which will be stored in a PostgreSQL database to facilitate search and information retrieval.

Before we begin, ensure you have [PostgreSQL installed and configured](#) on your machine. If not, please follow this [installation guide](#) and [create a new database](#) for this tutorial.

## Prerequisites
- Python installed on your machine
- PostgreSQL installed and configured
- Access to the OpenAI API
- Required Python libraries:
  - `psycopg2`
  - `openai`
  - `PyPDF2`
  - `langchain`

## Step 1: Environment Setup
1. **Install the necessary libraries**:
   ```bash
   pip install psycopg2 openai PyPDF2 langchain
   ```

2. **Set up the environment variable for the OpenAI API**:
   Ensure that the `OPENAI_API_KEY` environment variable is set with your OpenAI API key.

## Step 2: Extracting Text from PDFs
Create a function to extract text from PDF files using `PyPDF2`:

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

## Step 3: Generating Embeddings with OpenAI API
Create a class to generate embeddings using the OpenAI API. The method `embed_documents` allows setting the model, with a default of "text-embedding-3-large":

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
        batch_size = 2048  # Token limit per batch

        for i in range(0, len(valid_texts), batch_size):
            batch_texts = valid_texts[i:i + batch_size]
            try:
                response = openai.Embedding.create(
                    input=batch_texts,
                    model=model,
                    max_tokens=batch_size
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

**Note:** You can specify a different model by changing the `model` parameter when calling the `embed_documents` method. Choose the model based on your specific needs, such as the size of the embedding vectors, computational efficiency, or the type of data being processed.

## Step 4: PostgreSQL Database Setup
1. **Configure the database connection details**:

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

2. **Connect to the PostgreSQL database and clear tables**:

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

## Step 5: Processing and Storing PDFs
1. **Function to process PDFs and store them in the database**:

```python
from langchain.vectorstores.pgembedding import PGEmbedding
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter

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

2. **Process and store all PDFs in the directory**:

```python
pdf_directory = '/path/to/your/pdfs'
process_and_store_pdfs(pdf_directory)
```

## Step 6: Data Insertion Verification
Verify that the data was inserted correctly:

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
This is a basic tutorial for setting up a system to extract text from PDFs, generate embeddings using the OpenAI API, and store these data in a PostgreSQL database. There are numerous enhancements you can make to improve this system, such as improving text extraction from PDFs, refining the text boundaries per chunk, and many others.
