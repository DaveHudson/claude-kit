---
paths: "**/app/api/**/*.ts"
---

## Next.js API Routes

### Basic Route Handler

```typescript
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  return Response.json({ data: null });
}

export async function POST(req: Request) {
  const body = await req.json();

  return Response.json({ success: true });
}
```

### With AI SDK Streaming

```typescript
import { streamText } from "ai";
import { gateway } from "@ai-sdk/gateway";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: gateway("anthropic/claude-sonnet"),
    messages,
    system: `You are a helpful assistant.`,
  });

  return result.toDataStreamResponse();
}
```

### Error Handling

```typescript
export async function POST(req: Request) {
  try {
    const body = await req.json();
    // ... handle request
    return Response.json({ success: true });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
```

### Validation with Zod

```typescript
import { z } from "zod";

const InputSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
});

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = InputSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json({ error: parsed.error.issues }, { status: 400 });
  }

  // Use parsed.data with full type safety
  return Response.json({ success: true });
}
```
