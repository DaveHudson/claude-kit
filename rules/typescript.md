---
paths: "**/*.{ts,tsx}"
---

## TypeScript Rules

### Naming Conventions
- PascalCase for interfaces, types, classes, components
- camelCase for functions, variables, methods
- SCREAMING_SNAKE_CASE for constants
- kebab-case for file names

### Type Safety
- NO `any` without explicit justification comment
- NO `@ts-ignore` or `@ts-expect-error` without explanation
- Prefer `unknown` over `any` when type is truly unknown
- Use explicit return types on exported functions

### Imports
- Group imports: external → internal → relative
- Use named exports over default exports
- No circular dependencies

### Async/Await
- Always handle promise rejections
- Use try/catch for async operations
- Avoid floating promises (unhandled)

### Type-Only Imports
- Use `import type` for type-only imports (Biome enforces)

### Component Props
- Compose props with `ComponentProps<T> & { ... }`
- Use `Omit<Props, "key">` for prop exclusion
- Define `children: ReactNode` explicitly

### Type Assertions
- Prefer `satisfies Type` over `as Type`
- Use `as const` for config objects and literal results
- Use branded types for Convex IDs

### Type Guards
- Use `is` keyword for guard functions
- Use `never` to exclude properties in discriminated unions

### Zod Integration
- Derive types with `z.infer<typeof schema>`
- Export both schema constant and inferred type

### Context Typing
- Initialize as `createContext<Type | null>(null)`
- Guard hooks must throw if context is null

### Records & Validators
- Use `Record<K, V>` for string-to-value mappings
- Extract validators to module level for reuse

### Error Handling
- Extract messages: `error instanceof Error ? error.message : "Unknown error"`
- Use `invariant()` for impossible conditions

### CVA Variants
- Use `VariantProps<typeof variants>` for variant props
