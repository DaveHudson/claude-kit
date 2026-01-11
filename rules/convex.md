---
paths: "**/convex/**/*.ts"
---

## Convex Architecture

### File Structure

```
convex/
├── schema.ts           # Database schema definitions
├── _generated/         # Auto-generated types (DO NOT EDIT)
├── queries/            # Read operations
├── mutations/          # Write operations
└── actions/            # External API calls, AI operations
```

### Schema Design

```typescript
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  items: defineTable({
    title: v.string(),
    description: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_created", ["createdAt"]),
});
```

### Query Pattern

```typescript
import { query } from "../_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { userId: v.string(), limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    return ctx.db
      .query("items")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(args.limit ?? 20);
  },
});
```

### Mutation Pattern

```typescript
import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: { title: v.string(), description: v.string(), userId: v.string() },
  handler: async (ctx, args) => {
    return ctx.db.insert("items", { ...args, createdAt: Date.now() });
  },
});
```

### Action Pattern

Actions are for external API calls (AI, third-party services):

```typescript
import { action } from "../_generated/server";
import { v } from "convex/values";

export const callExternalApi = action({
  args: { prompt: v.string() },
  handler: async (ctx, args) => {
    // Actions can call external APIs
    return { result: null };
  },
});
```

### Best Practices

- Index tables for common access patterns
- Use `withIndex()` in queries for performance
- Mutations should validate input
- Actions handle external integrations (AI, HTTP)
- Types are auto-generated - no manual `any`
- Use `v.optional()` for nullable fields
