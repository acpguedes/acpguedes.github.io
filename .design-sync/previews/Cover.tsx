import type { ReactNode } from "react";
import { Cover, ragPostgresPlate, ragPostgresPlateCrop } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

const plate = {
  src: ragPostgresPlate,
  alt: "Engraving: a PDF page unfolds into chunks, the chunks become vectors and flow into a PostgreSQL cylinder.",
  caption: "Plate I — A page unfolds into chunks, chunks into vectors, vectors into PostgreSQL.",
  cropSrc: ragPostgresPlateCrop,
  cropAlt: "Detail of the engraving: vectors arriving in a PostgreSQL cylinder.",
  cropCaption: "Plate I, detail — vectors arriving in PostgreSQL.",
};
const steps = [
  { id: "step-1", label: "Environment setup" },
  { id: "step-2", label: "Extracting text from PDFs" },
  { id: "step-3", label: "Generating embeddings" },
  { id: "step-4", label: "PostgreSQL setup" },
  { id: "step-5", label: "Processing and storing PDFs" },
  { id: "step-6", label: "Verifying the insert" },
];

export const Tutorial = () => (
  <Paper>
<Cover
    title={<>Storing <em>PDF embeddings</em> in PostgreSQL for RAG</>}
    href="#tutorial"
    kind="Tutorial"
    section="ML engineering / RAG"
    date="July 29, 2024"
    isoDate="2024-07-29"
    description="Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL."
    steps={steps}
    plate={plate}
  />
  </Paper>
);
export const ArticleWithoutPlate = () => (
  <Paper>
<Cover
    title={<>Soft sensors for <em>catalyst</em> monitoring</>}
    href="#sensors"
    date="November 2, 2024"
    isoDate="2024-11-02"
    description="Estimate catalyst activity between laboratory samples with models refinery engineers can inspect."
  />
  </Paper>
);
