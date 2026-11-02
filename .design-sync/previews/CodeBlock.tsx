import type { ReactNode } from "react";
import { CodeBlock } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

export const Shell = () => (
  <Paper>
<CodeBlock language="bash" code={'pip install psycopg2 "openai<1" PyPDF2 "langchain<0.1"'} />
  </Paper>
);
export const Python = () => (
  <Paper>
<CodeBlock
    language="python"
    code={`from PyPDF2 import PdfReader

def extract_text_from_pdf(pdf_path):
    reader = PdfReader(pdf_path)
    text = ''
    for page in reader.pages:
        text += page.extract_text()
    return text`}
  />
  </Paper>
);
export const LongLineScrollsInside = () => (
  <Paper>
<div style={{ maxWidth: 420 }}>
    <CodeBlock
      language="python"
      code={`connection_string = f"postgresql://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['dbname']}"`}
    />
  </div>
  </Paper>
);
