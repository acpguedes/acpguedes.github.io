import type { ReactNode } from "react";
import { Note, PostContent } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)" }}>{children}</div>;

export const InsideAnArticle = () => (
  <Paper>
<PostContent>
    <Note>For production, avoid exposing sensitive information in your code. Use environment variables or secure vaults to manage credentials.</Note>
  </PostContent>
  </Paper>
);
