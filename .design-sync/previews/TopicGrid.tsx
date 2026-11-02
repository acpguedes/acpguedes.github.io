import type { ReactNode } from "react";
import { TopicGrid, topicArticleCommentary, topicMarketTrends, topicTechnologyAi, topicTutorialsTips } from "@acpguedes/applied-science";
const Paper = ({ children }: { children: ReactNode }) => <div style={{ background: "var(--paper)", padding: 24 }}>{children}</div>;

export const BlogTopics = () => (
  <Paper>
    <div style={{ maxWidth: 560 }}>
      <TopicGrid
        topics={[
          { label: "Technology & AI", src: topicTechnologyAi, alt: "Engraving: a neural network with one signal path traced through its layers." },
          { label: "Article commentary", src: topicArticleCommentary, alt: "Engraving: a page with a marked passage and a note pulled out beside it." },
          { label: "Market analysis & trends", src: topicMarketTrends, alt: "Engraving: a bar series with a trend line continuing past the data." },
          { label: "Tutorials & tips", src: topicTutorialsTips, alt: "Engraving: a terminal and numbered steps climbing to a checked result." },
        ]}
      />
    </div>
  </Paper>
);
