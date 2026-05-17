import { FormEvent, useState } from 'react';
import { ContentItemDraft, ContentPriority, ContentStatus } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Modal } from './ui/Modal';

type ItemFormModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (draft: ContentItemDraft) => void;
};

export function ItemFormModal({ open, onClose, onCreate }: ItemFormModalProps) {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [category, setCategory] = useState('Operations');
  const [status, setStatus] = useState<ContentStatus>('Review');
  const [priority, setPriority] = useState<ContentPriority>('Medium');
  const [owner, setOwner] = useState('');
  const [tags, setTags] = useState('');
  const [details, setDetails] = useState('');

  const reset = () => {
    setTitle('');
    setSummary('');
    setCategory('Operations');
    setStatus('Review');
    setPriority('Medium');
    setOwner('');
    setTags('');
    setDetails('');
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    onCreate({
      title,
      summary,
      category,
      status,
      priority,
      owner: owner || 'Unassigned',
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
      details,
    });
    reset();
    onClose();
  };

  return (
    <Modal open={open} title="Novo registro" onClose={onClose}>
      <form className="form-grid" onSubmit={submit}>
        <label>Titulo<Input required value={title} onChange={event => setTitle(event.target.value)} /></label>
        <label>Resumo<Input required value={summary} onChange={event => setSummary(event.target.value)} /></label>
        <label>Categoria<Input value={category} onChange={event => setCategory(event.target.value)} /></label>
        <label>Responsavel<Input value={owner} onChange={event => setOwner(event.target.value)} /></label>
        <label>Status<select value={status} onChange={event => setStatus(event.target.value as ContentStatus)}><option>Active</option><option>Review</option><option>Archived</option></select></label>
        <label>Prioridade<select value={priority} onChange={event => setPriority(event.target.value as ContentPriority)}><option>Low</option><option>Medium</option><option>High</option></select></label>
        <label className="span-2">Tags<Input value={tags} onChange={event => setTags(event.target.value)} placeholder="process, reference, review" /></label>
        <label className="span-2">Detalhes<textarea required value={details} onChange={event => setDetails(event.target.value)} /></label>
        <div className="form-actions span-2">
          <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Criar registro</Button>
        </div>
      </form>
    </Modal>
  );
}
