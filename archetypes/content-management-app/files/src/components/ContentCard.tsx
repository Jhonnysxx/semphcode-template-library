import { CalendarDays, Eye, Tag } from 'lucide-react';
import { ContentItem } from '../types';
import { formatDate, getInitials } from '../lib/format';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { Button } from './ui/Button';

const priorityTone = {
  Low: 'neutral',
  Medium: 'warning',
  High: 'danger',
} as const;

type ContentCardProps = {
  item: ContentItem;
  saved: boolean;
  onSave: (id: string) => void;
  onOpen: (item: ContentItem) => void;
};

export function ContentCard({ item, saved, onSave, onOpen }: ContentCardProps) {
  return (
    <Card className="content-card">
      <div className="card-topline">
        <span className="owner-avatar">{getInitials(item.owner)}</span>
        <Badge tone={item.status === 'Active' ? 'success' : item.status === 'Review' ? 'warning' : 'neutral'}>{item.status}</Badge>
      </div>
      <h3>{item.title}</h3>
      <p>{item.summary}</p>
      <div className="meta-row">
        <span><Tag size={14} /> {item.category}</span>
        <span><CalendarDays size={14} /> {formatDate(item.updatedAt)}</span>
      </div>
      <div className="tag-list">
        {item.tags.slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}
      </div>
      <div className="card-actions">
        <Badge tone={priorityTone[item.priority]}>{item.priority}</Badge>
        <Button variant="ghost" onClick={() => onSave(item.id)}>{saved ? 'Salvo' : 'Salvar'}</Button>
        <Button variant="secondary" onClick={() => onOpen(item)}><Eye size={16} /> Detalhes</Button>
      </div>
    </Card>
  );
}
