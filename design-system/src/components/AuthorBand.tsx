import { LinkRow } from "./LinkRow";
import type { LinkItem } from "../types";

export interface AuthorBandProps {
  /** One sentence about what the author does. */
  intro: string;
  /** Short mono line below the sentence. */
  aside?: string;
  photoSrc: string;
  /** Used as the portrait's alternative text. */
  name: string;
  links?: LinkItem[];
}

/** Full-width band on the deep paper tone that introduces the author at the end of the home page. */
export function AuthorBand({ intro, aside, photoSrc, name, links = [] }: AuthorBandProps) {
  return (
    <section className="author-band" aria-label="About the author">
      <div className="who">
        <img src={photoSrc} alt={name} width={60} height={60} />
        <div>
          <p>{intro}</p>
          {aside && <p className="aside">{aside}</p>}
        </div>
      </div>
      <LinkRow links={links} />
    </section>
  );
}
