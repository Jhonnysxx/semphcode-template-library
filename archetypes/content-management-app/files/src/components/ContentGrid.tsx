import { ContentItem } from '../types';
import { ContentCard } from './ContentCard';

type ContentGridProps = {
  items: ContentItem[];
  savedIds: string[];
  onSave: (id: string) => void;
  onOpen: (item: ContentItem) => void;
};

export function ContentGrid({ items, savedIds, onSave, onOpen }: ContentGridProps) {
  return (
    <section className="content-grid">
      {items.map(item => (
        <ContentCard
          key={item.id}
          item={item}
          saved={savedIds.includes(item.id)}
          onSave={onSave}
          onOpen={onOpen}
        />
      ))}
    </section>
  );
}
