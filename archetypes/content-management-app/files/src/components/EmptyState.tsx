import { SearchX } from 'lucide-react';
import { Button } from './ui/Button';

type EmptyStateProps = {
  onClear: () => void;
};

export function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <section className="empty-state">
      <SearchX size={36} />
      <h3>Nenhum resultado encontrado</h3>
      <p>Ajuste a busca ou os filtros para visualizar outros registros.</p>
      <Button variant="secondary" onClick={onClear}>Limpar filtros</Button>
    </section>
  );
}
