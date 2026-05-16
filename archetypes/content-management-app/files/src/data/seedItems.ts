import type { ContentItem } from "../types";

export const seedItems: ContentItem[] = [
  {
    id: "item-001",
    title: "Strategic Launch Plan",
    description:
      "A structured plan for launching a new initiative with milestones, ownership and validation checkpoints.",
    category: "Strategy",
    status: "published",
    priority: "high",
    tags: ["planning", "launch", "operations"],
    owner: "Product Team",
    updatedAt: "2026-01-12",
    readTime: 8,
    featured: true,
    saved: true
  },
  {
    id: "item-002",
    title: "Customer Insights Report",
    description:
      "A consolidated overview of customer feedback, recurring needs and product improvement opportunities.",
    category: "Research",
    status: "published",
    priority: "medium",
    tags: ["research", "customers", "insights"],
    owner: "Research Team",
    updatedAt: "2026-01-10",
    readTime: 6,
    featured: true,
    saved: false
  },
  {
    id: "item-003",
    title: "Operations Checklist",
    description:
      "A reusable checklist for keeping recurring processes consistent, auditable and easy to maintain.",
    category: "Operations",
    status: "draft",
    priority: "medium",
    tags: ["process", "checklist", "quality"],
    owner: "Operations Team",
    updatedAt: "2026-01-08",
    readTime: 5,
    featured: false,
    saved: false
  },
  {
    id: "item-004",
    title: "Performance Review Notes",
    description:
      "A focused document for tracking performance indicators, risks, blockers and improvement actions.",
    category: "Analytics",
    status: "published",
    priority: "high",
    tags: ["metrics", "review", "dashboard"],
    owner: "Analytics Team",
    updatedAt: "2026-01-06",
    readTime: 7,
    featured: false,
    saved: true
  },
  {
    id: "item-005",
    title: "Knowledge Base Article",
    description:
      "A polished content entry designed to help users understand a workflow, feature or internal process.",
    category: "Knowledge",
    status: "published",
    priority: "low",
    tags: ["docs", "knowledge", "support"],
    owner: "Content Team",
    updatedAt: "2026-01-04",
    readTime: 4,
    featured: false,
    saved: false
  },
  {
    id: "item-006",
    title: "Partner Onboarding Guide",
    description:
      "A complete onboarding resource with expectations, requirements, timelines and support materials.",
    category: "Partnerships",
    status: "archived",
    priority: "medium",
    tags: ["onboarding", "partners", "guide"],
    owner: "Growth Team",
    updatedAt: "2025-12-28",
    readTime: 9,
    featured: false,
    saved: false
  },
  {
    id: "item-007",
    title: "Product Requirements Brief",
    description:
      "A concise requirements document outlining goals, constraints, core flows and acceptance criteria.",
    category: "Product",
    status: "draft",
    priority: "high",
    tags: ["requirements", "product", "scope"],
    owner: "Product Team",
    updatedAt: "2025-12-22",
    readTime: 10,
    featured: true,
    saved: false
  },
  {
    id: "item-008",
    title: "Editorial Calendar",
    description:
      "A planning board for upcoming content, responsible teams, publication status and delivery windows.",
    category: "Content",
    status: "published",
    priority: "medium",
    tags: ["calendar", "publishing", "content"],
    owner: "Marketing Team",
    updatedAt: "2025-12-18",
    readTime: 5,
    featured: false,
    saved: true
  },
  {
    id: "item-009",
    title: "Risk Assessment Summary",
    description:
      "A structured assessment of potential risks, mitigation strategies and ownership responsibilities.",
    category: "Governance",
    status: "published",
    priority: "high",
    tags: ["risk", "governance", "compliance"],
    owner: "Leadership Team",
    updatedAt: "2025-12-14",
    readTime: 6,
    featured: false,
    saved: false
  },
  {
    id: "item-010",
    title: "Implementation Roadmap",
    description:
      "A practical roadmap that breaks a complex initiative into phases, deliverables and success metrics.",
    category: "Planning",
    status: "published",
    priority: "high",
    tags: ["roadmap", "implementation", "milestones"],
    owner: "Delivery Team",
    updatedAt: "2025-12-10",
    readTime: 8,
    featured: true,
    saved: true
  },
  {
    id: "item-011",
    title: "Support Playbook",
    description:
      "A reusable playbook for handling common support scenarios, escalation rules and response quality.",
    category: "Support",
    status: "published",
    priority: "medium",
    tags: ["support", "playbook", "service"],
    owner: "Support Team",
    updatedAt: "2025-12-05",
    readTime: 7,
    featured: false,
    saved: false
  },
  {
    id: "item-012",
    title: "Team Operating Principles",
    description:
      "A concise reference for collaboration standards, decision-making norms and team expectations.",
    category: "Culture",
    status: "draft",
    priority: "low",
    tags: ["team", "culture", "principles"],
    owner: "People Team",
    updatedAt: "2025-12-01",
    readTime: 4,
    featured: false,
    saved: false
  }
];

export const categories = Array.from(
  new Set(seedItems.map((item) => item.category))
).sort();
