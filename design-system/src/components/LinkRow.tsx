import type { LinkItem } from "../types";

export interface LinkRowProps {
  links: LinkItem[];
}

/** Row of mono links with 44 px touch targets, used in the footer, author blocks and About page. */
export function LinkRow({ links }: LinkRowProps) {
  return (
    <ul className="link-row">
      {links.map((link) => (
        <li key={link.href + link.label}>
          <a className={link.accent ? "accent" : undefined} href={link.href}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
