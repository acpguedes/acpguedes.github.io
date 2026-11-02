import type { ReactNode } from "react";
import { PostAuthor, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const Default = () => (
  <Paper>
<PostAuthor
    photoSrc={profilePhoto}
    intro="I write about technology, mainly AI: how to apply it and how to lead projects that deliver results."
    links={[
      { label: "About Aureliano", href: "/about/", accent: true },
      { label: "All articles", href: "/articles/" },
    ]}
  />
  </Paper>
);
