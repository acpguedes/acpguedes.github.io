export interface PlateProps {
  /** Full plate: SVG with a 520 × 600 viewBox. Shown from 960 px. */
  src: string;
  alt: string;
  /** Sentence below the full plate, for example "Plate I — …". */
  caption?: string;
  /** Detail of the same drawing, 380 × 270. Shown below 960 px. Defaults to src. */
  cropSrc?: string;
  cropAlt?: string;
  cropCaption?: string;
  /** Use "post" inside PostHeader for the tighter frame. */
  variant?: "cover" | "post";
}

/** Framed engraving for an article. Renders the full plate on wide screens and the crop on narrow ones. */
export function Plate({ src, alt, caption, cropSrc, cropAlt, cropCaption, variant = "cover" }: PlateProps) {
  return (
    <>
      <figure className={variant === "post" ? "plate post-plate" : "plate"}>
        <div className="plate-frame">
          <img src={src} alt={alt} width={520} height={600} />
        </div>
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
      <figure className="plate-crop">
        <div>
          <img src={cropSrc ?? src} alt={cropAlt ?? alt} width={380} height={270} />
        </div>
        {cropCaption && <figcaption>{cropCaption}</figcaption>}
      </figure>
    </>
  );
}
