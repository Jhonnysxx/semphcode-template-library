export type ContentStatus = 'Active' | 'Review' | 'Archived';
export type ContentPriority = 'Low' | 'Medium' | 'High';

export type ContentItem = {
  id: string;
  title: string;
  summary: string;
  category: string;
  status: ContentStatus;
  priority: ContentPriority;
  owner: string;
  tags: string[];
  updatedAt: string;
  details: string;
};

export type ContentItemDraft = Omit<ContentItem, 'id' | 'updatedAt'>;
