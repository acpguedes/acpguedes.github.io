import type { ReactNode } from "react";

export interface NoteProps {
  children: ReactNode;
}

/** Paragraph led by a vermilion mono "Note" label. Place it inside PostContent. */
export function Note({ children }: NoteProps) {
  return (
    <p className="note">
      <strong>Note</strong> {children}
    </p>
  );
}
