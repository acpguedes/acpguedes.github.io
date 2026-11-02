import type { ReactNode } from "react";

export interface PageTitleProps {
  children: ReactNode;
  /** Mono line above the title, for example "Archive · newest first". */
  eyebrow?: string;
}

/** Large title for the archive, About and 404 pages. Place it inside <main className="page">. */
export function PageTitle({ children, eyebrow }: PageTitleProps) {
  return (
    <>
      {eyebrow && <p className="meta">{eyebrow}</p>}
      <h1 className="page-title">{children}</h1>
    </>
  );
}
