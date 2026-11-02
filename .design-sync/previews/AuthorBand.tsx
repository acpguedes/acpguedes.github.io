import type { ReactNode } from "react";
import { AuthorBand, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

export const Default = () => (
  <Paper>
<AuthorBand
    name="Aureliano Guedes"
    photoSrc={profilePhoto}
    intro="I write about technology, mainly AI: how to apply it and how to lead projects that deliver results."
    aside="Technology is only a means to building real solutions."
    topics={["Technology & AI", "Article commentary", "Market analysis & trends", "Tutorials & tips"]}
    links={[
      { label: "About", href: "/about/", accent: true },
      { label: "All articles", href: "/articles/" },
    ]}
  />
  </Paper>
);
