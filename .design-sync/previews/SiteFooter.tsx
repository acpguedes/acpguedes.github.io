import type { ReactNode } from "react";
import { SiteFooter } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)" }}>{children}</div>;

const links = [
  { label: "GitHub", href: "https://github.com/acpguedes" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/aureliano-guedes-30918021/" },
  { label: "Feed", href: "/feed.xml" },
];

export const Default = () => (
  <Paper>
<SiteFooter author="Aureliano Guedes" year={2026} links={links} />
  </Paper>
);
