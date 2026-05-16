import type { ContentItem } from "../types";
import { ContentCard } from "./ContentCard";

type ContentGridProps = {
  items: ContentItem[];
  onOpen: (item: ContentItem) => void;
  onToggleSaved: (id: string) => void;
};

export function ContentGrid({
  items,
  onOpen,
  onToggleSaved
}: ContentGridProps) {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ContentCard
          item={item}
          key={item.id}
          onOpen={onOpen}
          onToggleSaved={onToggleSaved}
        />
      ))}
    </section>
  );
}
