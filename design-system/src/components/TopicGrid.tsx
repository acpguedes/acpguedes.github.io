export interface Topic {
  label: string;
  /** Illustration: SVG in the plate style, 380 × 270. */
  src: string;
  alt: string;
}

export interface TopicGridProps {
  topics: Topic[];
}

/** Two-column grid of illustrated topics, numbered, showing what the blog covers. */
export function TopicGrid({ topics }: TopicGridProps) {
  return (
    <section className="topics" aria-label="What this blog covers">
      <ul>
        {topics.map((topic, index) => (
          <li key={topic.label}>
            <figure>
              <div>
                <img src={topic.src} alt={topic.alt} width={380} height={270} />
              </div>
              <figcaption>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {topic.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  );
}
