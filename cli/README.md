# dotclaude

CLI to add Claude Code agents, skills, and rules to your project.

## Install

```bash
npx dotclaude init
npx dotclaude add
```

## Commands

### `dotclaude init`

Creates `.claude/` directory in your project.

### `dotclaude add`

Interactive multi-select to add components. Copies files to `.claude/` and appends imports to your `CLAUDE.md`.

```bash
# Interactive mode
dotclaude add

# Add specific items
dotclaude add frontend tdd workflow

# Add everything
dotclaude add --all
```

### `dotclaude list`

Show all available components.

```bash
dotclaude list
dotclaude list --type agents
```

## Available Components

### Agents
| Name | Description |
|------|-------------|
| backend | Convex, APIs, data layer |
| frontend | Next.js, React, TDD, Shadcn |
| qa | Testing, validation, pre-commit |
| orchestrate | Multi-agent coordination |
| debugger | Error detective, troubleshooting |
| security | Vulnerability assessment, audits |
| performance | Optimization, profiling, bundle analysis |
| refactor | Code modernization, cleanup |

### Skills
| Name | Description |
|------|-------------|
| compound | Self-improvement, capture learnings |
| graphite | Git stacking workflow |
| review | Code review, simplification guidelines |
| docs | Documentation patterns, JSDoc, README |
| tdd | Test-driven development workflow |
| design-system | UI design guidelines, anti-patterns |
| security-checklist | OWASP Top 10, secure coding patterns |

### Rules
| Name | Description |
|------|-------------|
| workflow | Unified workflow phases |
| typescript | TypeScript conventions |
| react-useeffect | useEffect patterns and anti-patterns |
| convex | Convex database patterns |
| nextjs-api | Next.js API route patterns |

## License

MIT
