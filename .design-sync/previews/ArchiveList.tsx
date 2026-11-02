import type { ReactNode } from "react";
import { ArchiveList, ragPostgresPlateCrop } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

export const WithPlate = () => (
  <Paper>
<ArchiveList
    posts={[
      {
        title: "Storing PDF embeddings in PostgreSQL for RAG",
        href: "#tutorial",
        date: "July 29, 2024",
        isoDate: "2024-07-29",
        kind: "Tutorial",
        section: "ML engineering / RAG",
        description: "Extract text from PDFs, generate embeddings with Python, and store them in PostgreSQL.",
        thumbnailSrc: ragPostgresPlateCrop,
      },
    ]}
  />
  </Paper>
);
export const SeveralArticles = () => (
  <Paper>
<ArchiveList
    posts={[
      {
        title: "Soft sensors for catalyst monitoring",
        href: "#sensors",
        date: "November 2, 2024",
        isoDate: "2024-11-02",
        section: "Refinery operations",
        description: "Estimate catalyst activity between laboratory samples.",
      },
      {
        title: "Storing PDF embeddings in PostgreSQL for RAG",
        href: "#tutorial",
        date: "July 29, 2024",
        isoDate: "2024-07-29",
        kind: "Tutorial",
        section: "ML engineering / RAG",
      },
    ]}
  />
  </Paper>
);
export const Empty = () => (
  <Paper>
<ArchiveList posts={[]} />
  </Paper>
);
