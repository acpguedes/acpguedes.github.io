import type { ReactNode } from "react";

export interface StepHeadingProps {
  /** Number of the step. */
  step: number;
  children: ReactNode;
  /** Anchor used by TableOfContents and Cover steps. */
  id?: string;
}

/** Heading for one step of a tutorial, with a vermilion "Step N" label above it. Place it inside PostContent. */
export function StepHeading({ step, children, id }: StepHeadingProps) {
  return (
    <h3 id={id}>
      <span className="step-label">Step {step}</span>
      {children}
    </h3>
  );
}
