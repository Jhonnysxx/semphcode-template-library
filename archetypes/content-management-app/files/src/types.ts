export type ContentStatus = "draft" | "published" | "archived";

export type ContentPriority = "low" | "medium" | "high";

export type ContentItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  status: ContentStatus;
  priority: ContentPriority;
  tags: string[];
  owner: string;
  updatedAt: string;
  readTime: number;
  featured?: boolean;
  saved?: boolean;
};
