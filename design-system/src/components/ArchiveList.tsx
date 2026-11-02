import type { PostSummary } from "../types";

export interface ArchiveListProps {
  /** Every published post, newest first. */
  posts: PostSummary[];
  /** Shown when there are no posts. */
  emptyMessage?: string;
}

/** Article archive: one row per post with date, kicker, title, summary and optional thumbnail. */
export function ArchiveList({ posts, emptyMessage = "No articles published yet." }: ArchiveListProps) {
  if (posts.length === 0) return <p>{emptyMessage}</p>;
  return (
    <ol className="archive">
      {posts.map((post) => (
        <li key={post.href}>
          <time dateTime={post.isoDate}>{post.date}</time>
          <div className="entry">
            <p className="kind">
              {post.kind ?? "Article"}
              {post.section && ` · ${post.section}`}
            </p>
            <h2>
              <a href={post.href}>{post.title}</a>
            </h2>
            {post.description && <p>{post.description}</p>}
          </div>
          {post.thumbnailSrc && (
            <a className="thumb" href={post.href} tabIndex={-1} aria-hidden="true">
              <img src={post.thumbnailSrc} alt="" width={380} height={270} loading="lazy" />
            </a>
          )}
        </li>
      ))}
    </ol>
  );
}
