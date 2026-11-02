import type { ReactNode } from "react";
import { AuthorBand, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

export const Default = () => (
  <Paper>
<AuthorBand
    name="Aureliano Guedes"
    photoSrc={profilePhoto}
    intro="I build predictive models for refinery engineers and write about the data and code behind them."
    aside="Before refineries, bioinformatics."
    links={[
      { label: "About", href: "/about/", accent: true },
      { label: "All articles", href: "/articles/" },
    ]}
  />
  </Paper>
);
