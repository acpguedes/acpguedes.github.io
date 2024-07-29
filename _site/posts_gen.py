#%%
import os
import shutil
from datetime import datetime
import re
import yaml

# Diretórios de origem e destino
source_dir = "posts"
destination_dir = "_posts"
categories_file = "_data/categories.yml"

# Função para gerar o nome do arquivo no formato Jekyll
def generate_jekyll_filename(filepath):
    date = datetime.now().strftime('%Y-%m-%d')
    title = os.path.basename(filepath).replace(".md", "")
    title = re.sub(r'[^\w\s-]', '', title).replace(" ", "-").lower()
    return f"{date}-{title}.md"

# Função para adicionar metadados aos arquivos Markdown
def add_metadata_to_md(filepath, destination_path, categories_list):
    date = datetime.now().strftime('%Y-%m-%d')
    title = os.path.basename(filepath).replace(".md", "").replace("-", " ").title()
    
    # Extrai o nome do diretório pai
    parent_dir = os.path.basename(os.path.dirname(filepath))

    # Para o nível de diretório principal, não adicionamos categorias e ajustamos o permalink
    if len(categories_list) == 1:
        categories_str = ""
        permalink = f"/{categories_list[0].replace(' ', '-').lower()}/"
    else:
        categories = [cat.replace(" ", "-").lower() for cat in categories_list]
        categories_str = " ".join(categories)
        # Evitar repetição do nome se o arquivo for o índice do diretório
        if parent_dir == title.lower().replace(" ", "-"):
            permalink = f"/{'/'.join(categories)}/"
        else:
            permalink = f"/{'/'.join(categories)}/{title.replace(' ', '-').lower()}/"

    metadata = f"---\nlayout: post\ntitle: \"{title}\"\ndate: {date}\ncategories: {categories_str}\npermalink: {permalink}\n---\n\n"

    with open(filepath, 'r') as f:
        content = f.read()

    with open(destination_path, 'w') as dest_file:
        dest_file.write(metadata)
        dest_file.write(content)
    print(f"Added metadata and copied {filepath} to {destination_path}")

# Função para copiar e renomear os arquivos
def process_files(source_dir, destination_dir):
    for root, _, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.md'):
                source_path = os.path.join(root, file)
                categories_list = os.path.relpath(root, source_dir).split(os.sep)
                dest_file = generate_jekyll_filename(source_path)
                dest_path = os.path.join(destination_dir, dest_file)
                add_metadata_to_md(source_path, dest_path, categories_list)

# Função para gerar o arquivo categories.yml
def generate_categories_yaml(source_dir, output_file):
    categories = {}

    for root, _, files in os.walk(source_dir):
        for file in files:
            if file.endswith('.md'):
                rel_dir = os.path.relpath(root, source_dir)
                categories_list = rel_dir.split(os.sep)
                current_level = categories
                for category in categories_list:
                    if category not in current_level:
                        current_level[category] = {}
                    current_level = current_level[category]

    # Função recursiva para formatar o dicionário de categorias
    def format_categories(categories_dict, base_path=""):
        formatted = []
        for key, value in categories_dict.items():
            if isinstance(value, dict):
                path = f"{base_path}/{key.replace(' ', '-').lower()}"
                formatted.append({
                    'name': key.replace('-', ' ').title(),
                    'url': path,
                    'children': format_categories(value, path)
                })
        return formatted

    formatted_categories = format_categories(categories)

    # Escrever o arquivo YAML
    with open(output_file, 'w') as f:
        yaml.dump(formatted_categories, f, default_flow_style=False, sort_keys=False)
    print(f"Generated {output_file}")

# Criar o diretório de destino se não existir
os.makedirs(destination_dir, exist_ok=True)
os.makedirs(os.path.dirname(categories_file), exist_ok=True)

# Processar arquivos e gerar categories.yml
process_files(source_dir, destination_dir)
generate_categories_yaml(source_dir, categories_file)

# %%
