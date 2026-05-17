import { useMemo, useState } from 'react';
import { ContentGrid } from './components/ContentGrid';
import { DetailModal } from './components/DetailModal';
import { EmptyState } from './components/EmptyState';
import { ItemFormModal } from './components/ItemFormModal';
import { LoadingState } from './components/LoadingState';
import { SearchAndFilters } from './components/SearchAndFilters';
import { StatsStrip } from './components/StatsStrip';
import { AppShell } from './components/AppShell';
import { seedItems } from './data/seedItems';
import { loadFromStorage, saveToStorage } from './lib/storage';
import { ContentItem, ContentItemDraft, ContentPriority, ContentStatus } from './types';

const ITEMS_KEY = 'semphcode-content-items';
const SAVED_KEY = 'semphcode-content-saved';

export default function App() {
  const [items, setItems] = useState<ContentItem[]>(() => loadFromStorage(ITEMS_KEY, seedItems));
  const [savedIds, setSavedIds] = useState<string[]>(() => loadFromStorage(SAVED_KEY, []));
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState<'All' | ContentStatus>('All');
  const [priority, setPriority] = useState<'All' | ContentPriority>('All');
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  const categories = useMemo(() => Array.from(new Set(items.map(item => item.category))).sort(), [items]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter(item => {
      const searchable = [item.title, item.summary, item.owner, item.category, item.status, item.priority, ...item.tags].join(' ').toLowerCase();
      const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
      const matchesCategory = category === 'All' || item.category === category;
      const matchesStatus = status === 'All' || item.status === status;
      const matchesPriority = priority === 'All' || item.priority === priority;
      return matchesQuery && matchesCategory && matchesStatus && matchesPriority;
    });
  }, [items, query, category, status, priority]);

  const toggleSaved = (id: string) => {
    setSavedIds(current => {
      const next = current.includes(id) ? current.filter(itemId => itemId !== id) : [...current, id];
      saveToStorage(SAVED_KEY, next);
      return next;
    });
  };

  const createItem = (draft: ContentItemDraft) => {
    const nextItem: ContentItem = {
      ...draft,
      id: `item-${Date.now()}`,
      updatedAt: new Date().toISOString(),
    };
    setItems(current => {
      const next = [nextItem, ...current];
      saveToStorage(ITEMS_KEY, next);
      return next;
    });
    setSelectedItem(nextItem);
  };

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setStatus('All');
    setPriority('All');
  };

  return (
    <AppShell onCreate={() => setFormOpen(true)}>
      <section className="hero-panel">
        <div>
          <p className="eyebrow">Content management</p>
          <h1>Uma central profissional para registros internos</h1>
          <p>Busque, filtre, salve e mantenha conteúdos organizados com metadados consistentes e fluxos simples de criação.</p>
        </div>
        <div className="hero-card">
          <strong>{items.length}</strong>
          <span>registros catalogados</span>
        </div>
      </section>

      <StatsStrip items={items} savedCount={savedIds.length} />

      <SearchAndFilters
        query={query}
        category={category}
        status={status}
        priority={priority}
        categories={categories}
        onQueryChange={setQuery}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      {error && <section className="error-state">Erro: {error}</section>}
      {loading ? <LoadingState /> : filteredItems.length ? (
        <ContentGrid items={filteredItems} savedIds={savedIds} onSave={toggleSaved} onOpen={setSelectedItem} />
      ) : (
        <EmptyState onClear={clearFilters} />
      )}

      <DetailModal
        item={selectedItem}
        saved={selectedItem ? savedIds.includes(selectedItem.id) : false}
        onSave={() => selectedItem && toggleSaved(selectedItem.id)}
        onClose={() => setSelectedItem(null)}
      />
      <ItemFormModal open={formOpen} onClose={() => setFormOpen(false)} onCreate={createItem} />
    </AppShell>
  );
}
