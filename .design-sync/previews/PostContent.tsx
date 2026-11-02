import type { ReactNode } from "react";
import { CodeBlock, Note, PostAuthor, PostContent, StepHeading, TableOfContents, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

const toc = [
  { id: "introduction", label: "Introduction" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "step-1", label: "Environment setup" },
];

export const ArticleBody = () => (
  <Paper>
<PostContent sidebar={<TableOfContents items={toc} />}>
    <h2 id="introduction">Introduction</h2>
    <p>
      By the end of this tutorial, the text of your PDF files will be split into chunks, converted to embeddings with
      the OpenAI API, and stored in PostgreSQL. That prepares your data for Retrieval-Augmented Generation (RAG).
    </p>
    <h2 id="prerequisites">Prerequisites</h2>
    <ul>
      <li>Python installed on your machine</li>
      <li>
        PostgreSQL installed and configured, with the <code>embedding</code> extension
      </li>
    </ul>
    <StepHeading step={1} id="step-1">Environment Setup</StepHeading>
    <p>First, install the necessary libraries:</p>
    <CodeBlock language="bash" code={'pip install psycopg2 "openai<1" PyPDF2 "langchain<0.1"'} />
    <Note>The code in this tutorial targets those older interfaces.</Note>
    <PostAuthor
      photoSrc={profilePhoto}
      intro="I build predictive models for refinery engineers and write about the data and code behind them."
      links={[
        { label: "About Aureliano", href: "/about/", accent: true },
        { label: "All articles", href: "/articles/" },
      ]}
    />
  </PostContent>
  </Paper>
);
