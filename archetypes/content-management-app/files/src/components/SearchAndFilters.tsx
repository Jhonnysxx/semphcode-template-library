import { Search, SlidersHorizontal } from 'lucide-react';
import { ContentPriority, ContentStatus } from '../types';
import { Input } from './ui/Input';

type SearchAndFiltersProps = {
  query: string;
  category: string;
  status: 'All' | ContentStatus;
  priority: 'All' | ContentPriority;
  categories: string[];
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: 'All' | ContentStatus) => void;
  onPriorityChange: (value: 'All' | ContentPriority) => void;
};

export function SearchAndFilters({
  query,
  category,
  status,
  priority,
  categories,
  onQueryChange,
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
}: SearchAndFiltersProps) {
  return (
    <section className="filters-panel">
      <div className="search-box">
        <Search size={18} />
        <Input value={query} onChange={event => onQueryChange(event.target.value)} placeholder="Buscar por titulo, resumo, responsavel ou tag" />
      </div>
      <div className="filter-grid">
        <label>
          <span><SlidersHorizontal size={15} /> Categoria</span>
          <select value={category} onChange={event => onCategoryChange(event.target.value)}>
            <option value="All">Todas</option>
            {categories.map(item => <option key={item} value={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span>Status</span>
          <select value={status} onChange={event => onStatusChange(event.target.value as 'All' | ContentStatus)}>
            <option value="All">Todos</option>
            <option value="Active">Active</option>
            <option value="Review">Review</option>
            <option value="Archived">Archived</option>
          </select>
        </label>
        <label>
          <span>Prioridade</span>
          <select value={priority} onChange={event => onPriorityChange(event.target.value as 'All' | ContentPriority)}>
            <option value="All">Todas</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>
    </section>
  );
}
