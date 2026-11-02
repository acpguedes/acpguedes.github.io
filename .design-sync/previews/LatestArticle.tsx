import type { ReactNode } from "react";
import { LatestArticle, ragPostgresPlateCrop } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const WithPlate = () => (
  <Paper>
    <LatestArticle
      post={{
        title: "Storing PDF embeddings in PostgreSQL for RAG",
        href: "#tutorial",
        date: "July 29, 2024",
        isoDate: "2024-07-29",
        kind: "Tutorial",
        description: "Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL.",
        thumbnailSrc: ragPostgresPlateCrop,
      }}
    />
  </Paper>
);
export const NothingPublished = () => (
  <Paper>
    <LatestArticle />
  </Paper>
);
