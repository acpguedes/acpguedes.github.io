import type { ReactNode } from "react";
import { PostAuthor, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)", padding: 24 } }}>{children}</div>;

export const Default = () => (
  <Paper>
<PostAuthor
    photoSrc={profilePhoto}
    intro="I build predictive models for refinery engineers and write about the data and code behind them."
    links={[
      { label: "About Aureliano", href: "/about/", accent: true },
      { label: "All articles", href: "/articles/" },
    ]}
  />
  </Paper>
);
