import { Bookmark, BookmarkCheck, CalendarDays, Clock3, Eye } from "lucide-react";
import type { ContentItem } from "../types";
import { formatDate, getPriorityLabel, getStatusLabel } from "../lib/format";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";

type ContentCardProps = {
  item: ContentItem;
  onOpen: (item: ContentItem) => void;
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

export function ContentCard({ item, onOpen, onToggleSaved }: ContentCardProps) {
  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/80">
      <div className="relative h-32 overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.35),transparent_30%),linear-gradient(135deg,#0f172a,#334155)]" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <Badge variant="default">{item.category}</Badge>
        </div>

        <button
          aria-label={item.saved ? "Remover dos salvos" : "Salvar item"}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-950 shadow-lg backdrop-blur transition hover:bg-white"
          onClick={() => onToggleSaved(item.id)}
          type="button"
        >
          {item.saved ? (
            <BookmarkCheck className="h-5 w-5" />
          ) : (
            <Bookmark className="h-5 w-5" />
          )}
        </button>
      </div>

      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant={statusVariant[item.status]}>
            {getStatusLabel(item.status)}
          </Badge>
          <Badge variant={priorityVariant[item.priority]}>
            {getPriorityLabel(item.priority)}
          </Badge>
        </div>

        <div>
          <h3 className="line-clamp-2 text-lg font-black tracking-tight text-slate-950">
            {item.title}
          </h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-500">
            {item.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"
              key={tag}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="grid gap-2 border-t border-slate-100 pt-4 text-xs font-medium text-slate-500 sm:grid-cols-2">
          <span className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            {formatDate(item.updatedAt)}
          </span>
          <span className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            {item.readTime} min
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="truncate text-xs font-semibold text-slate-400">
            {item.owner}
          </p>

          <Button onClick={() => onOpen(item)} variant="secondary">
            <Eye className="h-4 w-4" />
            Ver detalhe
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
