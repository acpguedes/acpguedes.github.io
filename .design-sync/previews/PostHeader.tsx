import type { ReactNode } from "react";
import { PostHeader, profilePhoto, ragPostgresPlate, ragPostgresPlateCrop } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

export const Tutorial = () => (
  <Paper>
<PostHeader
    title={<>Storing <em>PDF embeddings</em> in PostgreSQL for RAG</>}
    kind="Tutorial"
    section="ML engineering / RAG"
    description="Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL."
    author="Aureliano Guedes"
    photoSrc={profilePhoto}
    date="July 29, 2024"
    isoDate="2024-07-29"
    plate={{
      src: ragPostgresPlate,
      alt: "Engraving: a PDF page unfolds into chunks, the chunks become vectors and flow into a PostgreSQL cylinder.",
      caption: "Plate I — A page unfolds into chunks, chunks into vectors, vectors into PostgreSQL.",
      cropSrc: ragPostgresPlateCrop,
      cropAlt: "Detail of the engraving: vectors arriving in a PostgreSQL cylinder.",
      cropCaption: "Plate I, detail — vectors arriving in PostgreSQL.",
    }}
  />
  </Paper>
);
export const WithoutPlate = () => (
  <Paper>
<PostHeader
    title="Soft sensors for catalyst monitoring"
    section="Refinery operations"
    author="Aureliano Guedes"
    photoSrc={profilePhoto}
    date="November 2, 2024"
    isoDate="2024-11-02"
  />
  </Paper>
);
