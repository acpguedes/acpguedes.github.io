import type { ReactNode } from "react";
import { Meta } from "./Meta";
import type { PlateProps } from "./Plate";
import { Plate } from "./Plate";

export interface PostHeaderProps {
  /** Article title. Wrap the key words in <em> for the italic accent. */
  title: ReactNode;
  kind?: string;
  section?: string;
  description?: string;
  author: string;
  photoSrc?: string;
  /** Display date, for example "July 29, 2024". */
  date: string;
  /** Machine-readable date, for example "2024-07-29". */
  isoDate: string;
  plate?: Omit<PlateProps, "variant">;
}

/** Article opening: kicker, title, summary and byline, with the plate beside them from 960 px. */
export function PostHeader({ title, kind = "Article", section, description, author, photoSrc, date, isoDate, plate }: PostHeaderProps) {
  return (
    <header className="post-header">
      <div>
        <Meta kind={kind} items={section ? [section] : []} />
        <h1>{title}</h1>
        {description && <p className="dek">{description}</p>}
        <p className="byline">
          {photoSrc && <img src={photoSrc} alt="" width={28} height={28} />}
          <span className="name">{author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={isoDate}>{date}</time>
        </p>
      </div>
      {plate && <Plate {...plate} variant="post" />}
    </header>
  );
}
