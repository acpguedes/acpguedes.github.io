import type { ReactNode } from "react";
import { SiteHeader, profilePhoto } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ ...{ background: "var(--paper)" } }}>{children}</div>;

const posts = [
  { title: "Storing PDF embeddings in PostgreSQL for RAG", href: "#tutorial", date: "July 29, 2024", isoDate: "2024-07-29" },
];
const threePosts = [
  { title: "Reading a refinery P&ID with a language model", href: "#pid", date: "March 10, 2025", isoDate: "2025-03-10" },
  { title: "Soft sensors for catalyst monitoring", href: "#sensors", date: "November 2, 2024", isoDate: "2024-11-02" },
  ...posts,
];
const folio = "AI for refinery operations · Technical document search";

export const Default = () => (
  <Paper>
<SiteHeader name="Aureliano Guedes" photoSrc={profilePhoto} folio={folio} posts={posts} />
  </Paper>
);
export const MenuOpen = () => (
  <Paper>
<div style={{ minHeight: 430 }}>
    <SiteHeader name="Aureliano Guedes" photoSrc={profilePhoto} folio={folio} posts={threePosts} defaultOpen />
  </div>
  </Paper>
);
export const NoArticlesYet = () => (
  <Paper>
<SiteHeader name="Aureliano Guedes" photoSrc={profilePhoto} />
  </Paper>
);
export const OnAboutPage = () => (
  <Paper>
<SiteHeader name="Aureliano Guedes" photoSrc={profilePhoto} posts={posts} current="about" />
  </Paper>
);
