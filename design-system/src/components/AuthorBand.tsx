import { LinkRow } from "./LinkRow";
import { Meta } from "./Meta";
import type { LinkItem } from "../types";

export interface AuthorBandProps {
  /** One sentence about what the site covers. */
  intro: string;
  /** Short mono line below the sentence. */
  aside?: string;
  /** What the site covers, as a mono line. The first topic gets the vermilion accent. */
  topics?: string[];
  photoSrc: string;
  /** Used as the portrait's alternative text. */
  name: string;
  links?: LinkItem[];
}

/** Full-width band on the deep paper tone that opens the home page: who writes, what about, and the topics. Render it first inside <main className="home">. */
export function AuthorBand({ intro, aside, topics = [], photoSrc, name, links = [] }: AuthorBandProps) {
  return (
    <section className="author-band" aria-label="About this site">
      <div className="who">
        <img src={photoSrc} alt={name} width={60} height={60} />
        <div>
          <p>{intro}</p>
          {aside && <p className="aside">{aside}</p>}
          {topics.length > 0 && <Meta kind={topics[0]} items={topics.slice(1)} />}
        </div>
      </div>
      <LinkRow links={links} />
    </section>
  );
}
