import { LinkRow } from "./LinkRow";
import type { LinkItem } from "../types";

export interface SiteFooterProps {
  author: string;
  year: number;
  /** Usually GitHub, LinkedIn and Feed. */
  links: LinkItem[];
}

/** Bottom bar with the copyright line and a LinkRow. */
export function SiteFooter({ author, year, links }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <p>
        &copy; {year} {author}
      </p>
      <LinkRow links={links} />
    </footer>
  );
}
