import type { ReactNode } from "react";
import { Plate, ragPostgresPlate, ragPostgresPlateCrop } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const ResponsivePlate = () => (
  <Paper>
<div style={{ maxWidth: 520 }}>
    <Plate
      src={ragPostgresPlate}
      alt="Engraving: a PDF page unfolds into chunks, the chunks become vectors and flow into a PostgreSQL cylinder."
      caption="Plate I — A page unfolds into chunks, chunks into vectors, vectors into PostgreSQL."
      cropSrc={ragPostgresPlateCrop}
      cropAlt="Detail of the engraving: vectors arriving in a PostgreSQL cylinder."
      cropCaption="Plate I, detail — vectors arriving in PostgreSQL."
    />
  </div>
  </Paper>
);
