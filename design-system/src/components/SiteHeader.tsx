import { useEffect, useRef, useState } from "react";

export interface SiteHeaderMenuPost {
  title: string;
  href: string;
  /** Display date, for example "July 29, 2024". */
  date: string;
  /** Machine-readable date, for example "2024-07-29". */
  isoDate: string;
}

export interface SiteHeaderProps {
  /** Author name, linked to the home page. */
  name: string;
  homeHref?: string;
  /** Small portrait next to the name. Hidden below 380 px. */
  photoSrc?: string;
  /** Mono line in the middle of the bar. Shown from 1200 px. */
  folio?: string;
  /** Newest posts, up to three. With none, Articles links straight to the archive. */
  posts?: SiteHeaderMenuPost[];
  articlesHref?: string;
  aboutHref?: string;
  /** Marks the About link as the current page. */
  current?: "about";
  /** Starts with the Articles menu open. */
  defaultOpen?: boolean;
}

/**
 * Site bar with the author name, the Articles disclosure menu and the About link.
 * The menu closes on Escape (returning focus to Articles), on an outside click and when focus leaves it.
 */
export function SiteHeader({
  name,
  homeHref = "/",
  photoSrc,
  folio,
  posts = [],
  articlesHref = "/articles/",
  aboutHref = "/about/",
  current,
  defaultOpen = false,
}: SiteHeaderProps) {
  const [open, setOpen] = useState(defaultOpen);
  const itemRef = useRef<HTMLLIElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (event: MouseEvent) => {
      if (!itemRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <header className="site-header">
      <a className="site-name" href={homeHref}>
        {photoSrc && <img className="site-photo" src={photoSrc} alt="" width={36} height={36} />}
        {name}
      </a>
      {folio && <p className="site-folio">{folio}</p>}
      <nav aria-label="Main">
        <ul className="nav-links">
          <li
            className="nav-articles"
            ref={itemRef}
            onBlur={(event) => {
              const next = event.relatedTarget as Node | null;
              if (next && !event.currentTarget.contains(next)) setOpen(false);
            }}
          >
            {posts.length === 0 ? (
              <a className="nav-link" href={articlesHref}>
                Articles
              </a>
            ) : (
              <>
                <button
                  className="nav-link nav-toggle"
                  type="button"
                  aria-expanded={open}
                  aria-controls="articles-menu"
                  ref={toggleRef}
                  onClick={() => setOpen(!open)}
                >
                  Articles
                </button>
                <ul className="articles-menu" id="articles-menu" hidden={!open}>
                  {posts.slice(0, 3).map((post) => (
                    <li key={post.href}>
                      <a href={post.href}>
                        <time dateTime={post.isoDate}>{post.date}</time>
                        <span className="title">{post.title}</span>
                      </a>
                    </li>
                  ))}
                  <li>
                    <a className="more" href={articlesHref}>
                      more
                    </a>
                  </li>
                </ul>
              </>
            )}
          </li>
          <li>
            <a className="nav-link" href={aboutHref} aria-current={current === "about" ? "page" : undefined}>
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
