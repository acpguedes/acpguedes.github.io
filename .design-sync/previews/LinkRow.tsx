import type { ReactNode } from "react";
import { LinkRow } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const Profiles = () => (
  <Paper>
<LinkRow
    links={[
      { label: "GitHub", href: "https://github.com/acpguedes" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/aureliano-guedes-30918021/" },
      { label: "Feed", href: "/feed.xml" },
    ]}
  />
  </Paper>
);
export const WithAccentLink = () => (
  <Paper>
<LinkRow
    links={[
      { label: "About", href: "/about/", accent: true },
      { label: "All articles", href: "/articles/" },
    ]}
  />
  </Paper>
);
