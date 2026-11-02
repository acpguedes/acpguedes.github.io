import type { ReactNode } from "react";
import { Meta } from "./Meta";
import type { PlateProps } from "./Plate";
import { Plate } from "./Plate";
import type { SectionLink } from "../types";

export interface CoverProps {
  /** Headline. Wrap the key words in <em> for the italic accent. */
  title: ReactNode;
  href: string;
  /** Article type. Defaults to "Article" and also words the read link. */
  kind?: string;
  section?: string;
  /** Display date, for example "July 29, 2024". */
  date: string;
  /** Machine-readable date, for example "2024-07-29". */
  isoDate: string;
  description?: string;
  /** Numbered links into the article. Shown from 960 px. */
  steps?: SectionLink[];
  plate?: PlateProps;
}

/** Home page cover for the newest article: magazine headline on the left, plate on the right. */
export function Cover({ title, href, kind = "Article", section, date, isoDate, description, steps, plate }: CoverProps) {
  return (
    <section className="cover">
      <div className="cover-text">
        <Meta kind={kind} items={section ? [section] : []} date={date} isoDate={isoDate} />
        <h1>
          <a href={href}>{title}</a>
        </h1>
        {description && <p className="dek">{description}</p>}
        <a className="cta" href={href}>
          Read the {kind.toLowerCase()} →
        </a>
        {steps && steps.length > 0 && (
          <div className="cover-steps">
            <p className="label">In {steps.length} steps</p>
            <ol>
              {steps.map((step, index) => (
                <li key={step.id}>
                  <a href={`${href}#${step.id}`}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {step.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {plate && <Plate {...plate} />}
    </section>
  );
}
