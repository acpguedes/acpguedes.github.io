import type { SectionLink } from "../types";

export interface TableOfContentsProps {
  items: SectionLink[];
  /** "sidebar" is sticky and shows from 960 px; "inline" shows below 960 px. An article normally renders both. */
  variant?: "sidebar" | "inline";
  /** Heading above the list. */
  label?: string;
}

/** Numbered list of links to an article's sections. */
export function TableOfContents({ items, variant = "sidebar", label }: TableOfContentsProps) {
  return (
    <nav className={variant === "sidebar" ? "toc" : "toc-inline"} aria-label="Contents">
      <p className="toc-label">{label ?? (variant === "sidebar" ? "Contents" : "In this article")}</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
