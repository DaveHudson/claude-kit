export const GITHUB_RAW_BASE =
  "https://raw.githubusercontent.com/davehudson/claude-kit/main";

export const GITHUB_API_BASE =
  "https://api.github.com/repos/davehudson/claude-kit";

export type ItemType = "agents" | "skills" | "rules";

export interface ContentItem {
  name: string;
  type: ItemType;
  path: string;
  description: string;
}

export const CONTENT_REGISTRY: ContentItem[] = [
  // Agents
  {
    name: "backend",
    type: "agents",
    path: "agents/backend.md",
    description: "Convex, APIs, data layer",
  },
  {
    name: "frontend",
    type: "agents",
    path: "agents/frontend.md",
    description: "Next.js, React, TDD, Shadcn",
  },
  {
    name: "qa",
    type: "agents",
    path: "agents/qa.md",
    description: "Testing, validation, pre-commit",
  },
  {
    name: "orchestrate",
    type: "agents",
    path: "agents/orchestrate.md",
    description: "Multi-agent coordination",
  },
  {
    name: "debugger",
    type: "agents",
    path: "agents/debugger.md",
    description: "Error detective, troubleshooting",
  },
  {
    name: "security",
    type: "agents",
    path: "agents/security.md",
    description: "Vulnerability assessment, audits",
  },
  {
    name: "performance",
    type: "agents",
    path: "agents/performance.md",
    description: "Optimization, profiling, bundle analysis",
  },
  {
    name: "refactor",
    type: "agents",
    path: "agents/refactor.md",
    description: "Code modernization, cleanup",
  },

  // Skills
  {
    name: "compound",
    type: "skills",
    path: "skills/compound",
    description: "Self-improvement, capture learnings",
  },
  {
    name: "graphite",
    type: "skills",
    path: "skills/graphite",
    description: "Git stacking workflow",
  },
  {
    name: "review",
    type: "skills",
    path: "skills/review",
    description: "Code review, simplification guidelines",
  },
  {
    name: "docs",
    type: "skills",
    path: "skills/docs",
    description: "Documentation patterns, JSDoc, README",
  },
  {
    name: "tdd",
    type: "skills",
    path: "skills/tdd",
    description: "Test-driven development workflow",
  },
  {
    name: "design-system",
    type: "skills",
    path: "skills/design-system",
    description: "UI design guidelines, anti-patterns",
  },
  {
    name: "security-checklist",
    type: "skills",
    path: "skills/security-checklist",
    description: "OWASP Top 10, secure coding patterns",
  },

  // Rules
  {
    name: "workflow",
    type: "rules",
    path: "rules/workflow.md",
    description: "Unified workflow phases",
  },
  {
    name: "typescript",
    type: "rules",
    path: "rules/typescript.md",
    description: "TypeScript conventions",
  },
  {
    name: "react-useeffect",
    type: "rules",
    path: "rules/react-useeffect.md",
    description: "useEffect patterns and anti-patterns",
  },
  {
    name: "convex",
    type: "rules",
    path: "rules/convex.md",
    description: "Convex database patterns",
  },
  {
    name: "nextjs-api",
    type: "rules",
    path: "rules/nextjs-api.md",
    description: "Next.js API route patterns",
  },
];

export function getItemsByType(type: ItemType): ContentItem[] {
  return CONTENT_REGISTRY.filter((item) => item.type === type);
}

export function getItemByName(name: string): ContentItem | undefined {
  return CONTENT_REGISTRY.find((item) => item.name === name);
}
