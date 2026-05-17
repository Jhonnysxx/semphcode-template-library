import { Archive, CheckCircle2, Clock3, Star } from 'lucide-react';
import { ContentItem } from '../types';

type StatsStripProps = {
  items: ContentItem[];
  savedCount: number;
};

export function StatsStrip({ items, savedCount }: StatsStripProps) {
  const active = items.filter(item => item.status === 'Active').length;
  const review = items.filter(item => item.status === 'Review').length;
  const archived = items.filter(item => item.status === 'Archived').length;

  return (
    <section className="stats-strip">
      <article><CheckCircle2 size={18} /><span>{active}</span><small>Ativos</small></article>
      <article><Clock3 size={18} /><span>{review}</span><small>Em revisão</small></article>
      <article><Archive size={18} /><span>{archived}</span><small>Arquivados</small></article>
      <article><Star size={18} /><span>{savedCount}</span><small>Salvos</small></article>
    </section>
  );
}
