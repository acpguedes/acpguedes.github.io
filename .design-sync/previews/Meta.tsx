import type { ReactNode } from "react";
import { Meta } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

export const KindSectionAndDate = () => (
  <Paper>
<Meta kind="Tutorial" items={["ML engineering / RAG"]} date="July 29, 2024" isoDate="2024-07-29" />
  </Paper>
);
export const KindAndSection = () => (
  <Paper>
<Meta kind="Tutorial" items={["ML engineering / RAG"]} />
  </Paper>
);
export const DateOnly = () => (
  <Paper>
<Meta date="July 29, 2024" isoDate="2024-07-29" />
  </Paper>
);
