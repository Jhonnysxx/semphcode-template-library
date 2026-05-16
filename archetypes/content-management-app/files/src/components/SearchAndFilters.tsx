import { Filter, Search } from "lucide-react";
import type { ContentStatus } from "../types";
import { Input } from "./ui/Input";

type SearchAndFiltersProps = {
  categories: string[];
  selectedCategory: string;
  selectedStatus: "all" | ContentStatus;
  search: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: "all" | ContentStatus) => void;
};

const statuses: Array<{ label: string; value: "all" | ContentStatus }> = [
  { label: "Todos", value: "all" },
  { label: "Publicados", value: "published" },
  { label: "Rascunhos", value: "draft" },
  { label: "Arquivados", value: "archived" }
];

export function SearchAndFilters({
  categories,
  selectedCategory,
  selectedStatus,
  search,
  onSearchChange,
  onCategoryChange,
  onStatusChange
}: SearchAndFiltersProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white/85 p-4 shadow-sm shadow-slate-200/70 backdrop-blur">
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] lg:items-end">
        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Search className="h-4 w-4" />
            Buscar conteúdo
          </div>

          <Input
            aria-label="Buscar conteúdo"
            placeholder="Busque por título, descrição, responsável ou tag..."
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </div>

        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Filter className="h-4 w-4" />
            Categoria
          </span>

          <select
            className="h-11 min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            value={selectedCategory}
            onChange={(event) => onCategoryChange(event.target.value)}
          >
            <option value="all">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Status
          </span>

          <select
            className="h-11 min-w-[160px] rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            value={selectedStatus}
            onChange={(event) =>
              onStatusChange(event.target.value as "all" | ContentStatus)
            }
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
