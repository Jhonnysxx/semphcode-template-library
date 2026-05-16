import { useEffect, useMemo, useState } from "react";
import type { ContentItem, ContentStatus } from "./types";
import { categories as seedCategories } from "./data/seedItems";
import { loadItems, resetItems, saveItems } from "./lib/storage";
import { AppShell } from "./components/AppShell";
import { ContentGrid } from "./components/ContentGrid";
import { DetailModal } from "./components/DetailModal";
import { EmptyState } from "./components/EmptyState";
import { Header } from "./components/Header";
import { ItemFormModal } from "./components/ItemFormModal";
import { LoadingState } from "./components/LoadingState";
import { SearchAndFilters } from "./components/SearchAndFilters";
import { StatsStrip } from "./components/StatsStrip";
import { Button } from "./components/ui/Button";

const APP_NAME = "Content Management App";

export default function App() {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState<"all" | ContentStatus>(
    "all"
  );
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setItems(loadItems());
      setIsLoading(false);
    }, 300);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      saveItems(items);
    }
  }, [items, isLoading]);

  const categories = useMemo(() => {
    return Array.from(
      new Set([...seedCategories, ...items.map((item) => item.category)])
    ).sort();
  }, [items]);

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const matchesQuery =
        !query ||
        [
          item.title,
          item.description,
          item.category,
          item.owner,
          item.status,
          item.priority,
          ...item.tags
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;

      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [items, search, selectedCategory, selectedStatus]);

  const featuredItem = items.find((item) => item.featured) ?? items[0];

  function handleToggleSaved(id: string) {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
    );

    setSelectedItem((current) =>
      current?.id === id ? { ...current, saved: !current.saved } : current
    );
  }

  function handleCreate(item: ContentItem) {
    setItems((current) => [item, ...current]);
  }

  function handleReset() {
    const restored = resetItems();
    setItems(restored);
    setSearch("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSelectedItem(null);
  }

  return (
    <AppShell>
      <Header appName={APP_NAME} onCreate={() => setIsCreateOpen(true)} />

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-stretch">
          <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-6 shadow-xl shadow-slate-200/70 backdrop-blur">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-slate-500">
              Workspace inteligente
            </p>
            <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
              Organize conteúdo, fluxos e registros em uma experiência premium.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Um arquétipo profissional para construir aplicações de conteúdo
              com busca, filtros, detalhes, criação de registros e persistência
              local. A SemphCode pode adaptar esta base para diferentes domínios.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button onClick={() => setIsCreateOpen(true)}>Criar novo item</Button>
              <Button onClick={handleReset} variant="secondary">
                Restaurar dados
              </Button>
            </div>
          </div>

          {featuredItem ? (
            <div className="overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl shadow-slate-900/20">
              <div className="h-40 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.32),transparent_28%),linear-gradient(135deg,#020617,#475569)]" />
              <div className="space-y-4 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-300">
                  Destaque
                </p>
                <h3 className="text-2xl font-black tracking-tight">
                  {featuredItem.title}
                </h3>
                <p className="text-sm leading-6 text-slate-300">
                  {featuredItem.description}
                </p>
                <Button onClick={() => setSelectedItem(featuredItem)} variant="secondary">
                  Ver item em destaque
                </Button>
              </div>
            </div>
          ) : null}
        </section>

        <StatsStrip items={items} />

        <SearchAndFilters
          categories={categories}
          search={search}
          selectedCategory={selectedCategory}
          selectedStatus={selectedStatus}
          onCategoryChange={setSelectedCategory}
          onSearchChange={setSearch}
          onStatusChange={setSelectedStatus}
        />

        {isLoading ? (
          <LoadingState />
        ) : filteredItems.length > 0 ? (
          <ContentGrid
            items={filteredItems}
            onOpen={setSelectedItem}
            onToggleSaved={handleToggleSaved}
          />
        ) : (
          <EmptyState
            title="Nenhum conteúdo encontrado"
            description="Ajuste a busca, altere os filtros ou crie um novo item para continuar organizando este workspace."
            actionLabel="Criar item"
            onAction={() => setIsCreateOpen(true)}
          />
        )}
      </main>

      <DetailModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onToggleSaved={handleToggleSaved}
      />

      <ItemFormModal
        categories={categories}
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
    </AppShell>
  );
}
