import type { ReactNode } from "react";

export interface PostContentProps {
  /** Article body: h2, h3, p, ul, code and the article components. */
  children: ReactNode;
  /** Optional sidebar, normally <TableOfContents variant="sidebar" />. */
  sidebar?: ReactNode;
}

/** Article body at the 38rem reading measure, with an optional sticky sidebar from 960 px. */
export function PostContent({ children, sidebar }: PostContentProps) {
  return (
    <div className="post-body">
      {sidebar}
      <div className="post-content">{children}</div>
    </div>
  );
}
