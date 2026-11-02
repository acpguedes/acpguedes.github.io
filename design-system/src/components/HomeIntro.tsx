import type { ReactNode } from "react";

export interface HomeIntroProps {
  /** The blog's thesis, shown as the page's H1. Wrap the key words in <em> for the italic accent. */
  title: ReactNode;
  /** One sentence on what the blog covers. */
  intro: string;
  /** Short note about the author. */
  authorNote: string;
  photoSrc: string;
  /** Used as the portrait's alternative text. */
  name: string;
  aboutHref?: string;
  /** Mono line above the title. */
  eyebrow?: string;
}

/** Opening of the home page: the blog's thesis and intention, then a short note about the author. */
export function HomeIntro({ title, intro, authorNote, photoSrc, name, aboutHref = "/about/", eyebrow = "The blog" }: HomeIntroProps) {
  return (
    <section className="home-intro">
      <p className="meta">
        <span className="kind">{eyebrow}</span>
      </p>
      <h1>{title}</h1>
      <p className="dek">{intro}</p>
      <div className="home-author">
        <img src={photoSrc} alt={name} width={48} height={48} />
        <p>
          {authorNote} <a href={aboutHref}>More about me</a>
        </p>
      </div>
    </section>
  );
}
