import { Fragment } from "react";

export interface MetaProps {
  /** Vermilion kicker, for example "Tutorial". */
  kind?: string;
  /** Muted items that follow the kicker, for example "ML engineering / RAG". */
  items?: string[];
  /** Display date, for example "July 29, 2024". */
  date?: string;
  /** Machine-readable date, for example "2024-07-29". */
  isoDate?: string;
}

/** Mono uppercase line of article metadata, separated by middle dots. */
export function Meta({ kind, items = [], date, isoDate }: MetaProps) {
  const parts = [
    ...(kind ? [<span className="kind">{kind}</span>] : []),
    ...items.map((item) => <span>{item}</span>),
    ...(date ? [<time dateTime={isoDate}>{date}</time>] : []),
  ];
  return (
    <p className="meta">
      {parts.map((part, index) => (
        <Fragment key={index}>
          {index > 0 && <span aria-hidden="true">·</span>}
          {part}
        </Fragment>
      ))}
    </p>
  );
}
