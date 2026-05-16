import type { ContentItem } from "../types";
import { seedItems } from "../data/seedItems";

const STORAGE_KEY = "semphcode-content-management-items";

export function loadItems(): ContentItem[] {
  if (typeof window === "undefined") {
    return seedItems;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
      return seedItems;
    }

    const parsed = JSON.parse(stored) as ContentItem[];

    if (!Array.isArray(parsed)) {
      return seedItems;
    }

    return parsed;
  } catch {
    return seedItems;
  }
}

export function saveItems(items: ContentItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function resetItems(): ContentItem[] {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seedItems));
  }

  return seedItems;
}
