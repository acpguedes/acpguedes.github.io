export interface LinkItem {
  label: string;
  href: string;
  /** Renders the label in the vermilion accent. */
  accent?: boolean;
}

export interface PostSummary {
  title: string;
  href: string;
  /** Display date, for example "July 29, 2024". */
  date: string;
  /** Machine-readable date, for example "2024-07-29". */
  isoDate: string;
  /** Article type shown as the kicker. Defaults to "Article". */
  kind?: string;
  section?: string;
  description?: string;
  /** Cropped plate used as the archive thumbnail. */
  thumbnailSrc?: string;
}

export interface SectionLink {
  /** Id of the heading in the article. */
  id: string;
  label: string;
}
