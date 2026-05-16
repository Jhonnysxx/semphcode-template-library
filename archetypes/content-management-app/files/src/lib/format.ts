import type { ContentPriority, ContentStatus } from "../types";

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  }).format(new Date(date));
}

export function getStatusLabel(status: ContentStatus): string {
  const labels: Record<ContentStatus, string> = {
    draft: "Rascunho",
    published: "Publicado",
    archived: "Arquivado"
  };

  return labels[status];
}

export function getPriorityLabel(priority: ContentPriority): string {
  const labels: Record<ContentPriority, string> = {
    low: "Baixa",
    medium: "Média",
    high: "Alta"
  };

  return labels[priority];
}

export function getPriorityWeight(priority: ContentPriority): number {
  const weights: Record<ContentPriority, number> = {
    low: 1,
    medium: 2,
    high: 3
  };

  return weights[priority];
}
