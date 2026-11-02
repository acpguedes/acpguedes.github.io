import { LinkRow } from "./LinkRow";
import type { LinkItem } from "../types";

export interface PostAuthorProps {
  /** One sentence about the author. */
  intro: string;
  photoSrc: string;
  links?: LinkItem[];
}

/** Author note between two ink rules at the end of an article. Place it inside PostContent. */
export function PostAuthor({ intro, photoSrc, links = [] }: PostAuthorProps) {
  return (
    <aside className="post-author" aria-label="About the author">
      <img src={photoSrc} alt="" width={48} height={48} />
      <div>
        <p>{intro}</p>
        <LinkRow links={links} />
      </div>
    </aside>
  );
}
