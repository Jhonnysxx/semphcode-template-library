import { Bookmark, BookmarkCheck, CalendarDays, Clock3, UserRound } from "lucide-react";
import type { ContentItem } from "../types";
import { formatDate, getPriorityLabel, getStatusLabel } from "../lib/format";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";

type DetailModalProps = {
  item: ContentItem | null;
  onClose: () => void;
  onToggleSaved: (id: string) => void;
};

const statusVariant = {
  published: "success",
  draft: "warning",
  archived: "neutral"
} as const;

const priorityVariant = {
  high: "danger",
  medium: "warning",
  low: "outline"
} as const;

export function DetailModal({ item, onClose, onToggleSaved }: DetailModalProps) {
  if (!item) {
    return null;
  }

  return (
    <Modal
      open={Boolean(item)}
      title={item.title}
      description="Detalhes completos do item selecionado."
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="overflow-hidden rounded-2xl bg-slate-950">
          <div className="h-40 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.32),transparent_28%),linear-gradient(135deg,#020617,#334155)]" />
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="default">{item.category}</Badge>
          <Badge variant={statusVariant[item.status]}>
            {getStatusLabel(item.status)}
          </Badge>
          <Badge variant={priorityVariant[item.priority]}>
            {getPriorityLabel(item.priority)}
          </Badge>
        </div>

        <p className="text-sm leading-7 text-slate-600">{item.description}</p>

        <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <UserRound className="h-4 w-4 text-slate-400" />
            Responsável: <strong className="text-slate-800">{item.owner}</strong>
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-slate-400" />
            Atualizado: <strong className="text-slate-800">{formatDate(item.updatedAt)}</strong>
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="h-4 w-4 text-slate-400" />
            Leitura: <strong className="text-slate-800">{item.readTime} min</strong>
          </span>
        </div>

        <div>
          <p className="mb-2 text-sm font-bold text-slate-700">Tags</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500"
                key={tag}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
          <Button onClick={() => onToggleSaved(item.id)} variant="secondary">
            {item.saved ? (
              <BookmarkCheck className="h-4 w-4" />
            ) : (
              <Bookmark className="h-4 w-4" />
            )}
            {item.saved ? "Remover dos salvos" : "Salvar item"}
          </Button>

          <Button onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
}
