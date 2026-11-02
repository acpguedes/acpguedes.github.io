import { Meta } from "./Meta";
import type { PostSummary } from "../types";

export interface LatestArticleProps {
  /** The newest published article. Leave it out when nothing is published yet. */
  post?: PostSummary;
  archiveHref?: string;
  /** Shown when there is no article. */
  emptyMessage?: string;
}

/** Small block with the newest article on the home page. It must stay secondary to the presentation of the blog. */
export function LatestArticle({ post, archiveHref = "/articles/", emptyMessage = "No articles published yet." }: LatestArticleProps) {
  return (
    <section className="latest">
      <h2>Latest article</h2>
      {post ? (
        <>
          <article className="latest-item">
            {post.thumbnailSrc && (
              <a className="thumb" href={post.href} tabIndex={-1} aria-hidden="true">
                <img src={post.thumbnailSrc} alt="" width={380} height={270} />
              </a>
            )}
            <div>
              <Meta kind={post.kind ?? "Article"} date={post.date} isoDate={post.isoDate} />
              <h3>
                <a href={post.href}>{post.title}</a>
              </h3>
              {post.description && <p className="latest-dek">{post.description}</p>}
            </div>
          </article>
          <a className="cta" href={archiveHref}>
            All articles →
          </a>
        </>
      ) : (
        <p>{emptyMessage}</p>
      )}
    </section>
  );
}
