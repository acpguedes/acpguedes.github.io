import type { ReactNode } from "react";
import { PostContent, StepHeading } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

export const InsideAnArticle = () => (
  <Paper>
<PostContent>
    <StepHeading step={1} id="step-1">Environment Setup</StepHeading>
    <p>First, install the necessary libraries.</p>
    <StepHeading step={2} id="step-2">Extracting Text from PDFs</StepHeading>
    <p>Use the following function to extract text from PDF files using PyPDF2.</p>
  </PostContent>
  </Paper>
);
