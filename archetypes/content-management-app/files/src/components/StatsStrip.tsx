import { Archive, Bookmark, CheckCircle2, Clock3 } from "lucide-react";
import type { ContentItem } from "../types";
import { Card, CardContent } from "./ui/Card";

type StatsStripProps = {
  items: ContentItem[];
};

export function StatsStrip({ items }: StatsStripProps) {
  const published = items.filter((item) => item.status === "published").length;
  const drafts = items.filter((item) => item.status === "draft").length;
  const archived = items.filter((item) => item.status === "archived").length;
  const saved = items.filter((item) => item.saved).length;

  const stats = [
    {
      label: "Publicados",
      value: published,
      icon: CheckCircle2,
      helper: "Conteúdos ativos"
    },
    {
      label: "Rascunhos",
      value: drafts,
      icon: Clock3,
      helper: "Em preparação"
    },
    {
      label: "Arquivados",
      value: archived,
      icon: Archive,
      helper: "Fora do fluxo"
    },
    {
      label: "Salvos",
      value: saved,
      icon: Bookmark,
      helper: "Itens favoritos"
    }
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>
                <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-400">
                  {stat.helper}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
                <Icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
