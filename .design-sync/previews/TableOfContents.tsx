import type { ReactNode } from "react";
import { TableOfContents } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

const items = [
  { id: "introduction", label: "Introduction" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "step-1", label: "Environment setup" },
  { id: "step-2", label: "Extracting text from PDFs" },
  { id: "conclusion", label: "Conclusion" },
];

export const Sidebar = () => (
  <Paper>
<div style={{ display: "flex" }}>
    <TableOfContents variant="sidebar" items={items} />
  </div>
  </Paper>
);
