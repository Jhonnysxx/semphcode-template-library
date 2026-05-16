import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ContentItem, ContentPriority, ContentStatus } from "../types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";

type ItemFormModalProps = {
  open: boolean;
  categories: string[];
  onClose: () => void;
  onCreate: (item: ContentItem) => void;
};

type FormState = {
  title: string;
  description: string;
  category: string;
  status: ContentStatus;
  priority: ContentPriority;
  tags: string;
  owner: string;
  readTime: string;
};

const initialState: FormState = {
  title: "",
  description: "",
  category: "",
  status: "draft",
  priority: "medium",
  tags: "",
  owner: "",
  readTime: "5"
};

function createId() {
  return `item-${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;
}

export function ItemFormModal({
  open,
  categories,
  onClose,
  onCreate
}: ItemFormModalProps) {
  const [form, setForm] = useState<FormState>(initialState);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set(["Operations", "Product", "Content", ...categories])).sort();
  }, [categories]);

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key]
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      return;
    }

    const tags = form.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    onCreate({
      id: createId(),
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category || "General",
      status: form.status,
      priority: form.priority,
      tags: tags.length > 0 ? tags : ["new", "content"],
      owner: form.owner.trim() || "Workspace Team",
      updatedAt: new Date().toISOString(),
      readTime: Number.parseInt(form.readTime, 10) || 5,
      featured: false,
      saved: false
    });

    setForm(initialState);
    onClose();
  }

  return (
    <Modal
      open={open}
      title="Novo item"
      description="Adicione um novo registro ao workspace de conteúdo."
      onClose={onClose}
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <Input
          label="Título"
          name="title"
          placeholder="Ex: Plano de expansão trimestral"
          value={form.title}
          onChange={(event) => updateField("title", event.target.value)}
          required
        />

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-slate-700">
            Descrição
          </span>
          <textarea
            className="min-h-[120px] w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="Descreva o conteúdo, objetivo ou contexto principal."
            value={form.description}
            onChange={(event) => updateField("description", event.target.value)}
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Categoria
            </span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={form.category}
              onChange={(event) => updateField("category", event.target.value)}
            >
              <option value="">Selecionar categoria</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Responsável
            </span>
            <input
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 shadow-sm placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="Equipe ou pessoa responsável"
              value={form.owner}
              onChange={(event) => updateField("owner", event.target.value)}
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={form.status}
              onChange={(event) =>
                updateField("status", event.target.value as ContentStatus)
              }
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Prioridade
            </span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200"
              value={form.priority}
              onChange={(event) =>
                updateField("priority", event.target.value as ContentPriority)
              }
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </label>

          <Input
            label="Tempo"
            min={1}
            name="readTime"
            type="number"
            value={form.readTime}
            onChange={(event) => updateField("readTime", event.target.value)}
          />
        </div>

        <Input
          helperText="Separe tags com vírgula."
          label="Tags"
          name="tags"
          placeholder="planejamento, operação, qualidade"
          value={form.tags}
          onChange={(event) => updateField("tags", event.target.value)}
        />

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button onClick={onClose} variant="secondary">
            Cancelar
          </Button>

          <Button type="submit">
            <Plus className="h-4 w-4" />
            Criar item
          </Button>
        </div>
      </form>
    </Modal>
  );
}
