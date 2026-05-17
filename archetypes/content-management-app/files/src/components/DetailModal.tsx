import { CalendarDays, UserRound } from 'lucide-react';
import { ContentItem } from '../types';
import { formatDate } from '../lib/format';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Modal } from './ui/Modal';

type DetailModalProps = {
  item: ContentItem | null;
  saved: boolean;
  onSave: () => void;
  onClose: () => void;
};

export function DetailModal({ item, saved, onSave, onClose }: DetailModalProps) {
  return (
    <Modal open={Boolean(item)} title={item?.title || 'Detalhes'} onClose={onClose}>
      {item && (
        <div className="detail-stack">
          <p className="detail-summary">{item.summary}</p>
          <div className="detail-meta">
            <Badge tone={item.status === 'Active' ? 'success' : item.status === 'Review' ? 'warning' : 'neutral'}>{item.status}</Badge>
            <Badge tone={item.priority === 'High' ? 'danger' : item.priority === 'Medium' ? 'warning' : 'neutral'}>{item.priority}</Badge>
            <span><UserRound size={15} /> {item.owner}</span>
            <span><CalendarDays size={15} /> {formatDate(item.updatedAt)}</span>
          </div>
          <p>{item.details}</p>
          <div className="tag-list">
            {item.tags.map(tag => <span key={tag}>{tag}</span>)}
          </div>
          <Button onClick={onSave}>{saved ? 'Remover dos salvos' : 'Salvar item'}</Button>
        </div>
      )}
    </Modal>
  );
}
