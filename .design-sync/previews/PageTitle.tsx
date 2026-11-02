import type { ReactNode } from "react";
import { PageTitle } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

export const Archive = () => (
  <Paper>
<PageTitle eyebrow="Archive · newest first">Articles</PageTitle>
  </Paper>
);
export const NotFound = () => (
  <Paper>
<PageTitle>Page not found</PageTitle>
  </Paper>
);
