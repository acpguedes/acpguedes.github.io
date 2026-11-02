import type { ReactNode } from "react";
import { HomeIntro, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const Default = () => (
  <Paper>
    <HomeIntro
      title={<>Technology is only a means to building <em>real solutions</em>.</>}
      intro="I write about technology, mainly AI: how to apply it and how to lead projects that deliver results."
      authorNote="I’m Aureliano Guedes, a lead data scientist in refining and renewable fuels."
      photoSrc={profilePhoto}
      name="Aureliano Guedes"
    />
  </Paper>
);
