# claude-kit

Reusable Claude Code agents, skills, and rules.

## Structure

```
agents/       (8) - Specialized subagents (isolated context, tool execution)
  backend.md      - Convex, APIs, data layer
  frontend.md     - Next.js, React, TDD, Shadcn (uses: tdd, design-system)
  qa.md           - Testing, validation, pre-commit
  orchestrate.md  - Multi-agent coordination (ralph)
  debugger.md     - Error detective, troubleshooting
  security.md     - Vulnerability assessment, dependency audits (uses: security-checklist)
  performance.md  - Optimization, profiling, bundle analysis
  refactor.md     - Code modernization, cleanup

skills/       (7) - Auto-loaded knowledge (same context)
  compound/           - Self-improvement, capture learnings to CLAUDE.md
  graphite/           - Git stacking workflow
  review/             - Code review, simplification guidelines
  docs/               - Documentation patterns, JSDoc, README
  tdd/                - Test-driven development workflow
  design-system/      - UI design guidelines, anti-patterns
  security-checklist/ - OWASP Top 10, secure coding patterns

rules/        (5) - Best practices
  workflow.md             - Unified workflow (Clarify → Plan → Build → Validate → Submit → Compound)
  typescript.md           - TypeScript conventions
  react-useeffect.md      - useEffect patterns and anti-patterns
  convex.md               - Convex database patterns
  nextjs-api.md           - Next.js API route patterns
```

## Usage

Install to a project: `./install.sh <target-dir>`

## Memory Integration

Installed projects can use `@` imports in their CLAUDE.md:

```
@.claude/rules/typescript.md
@.claude/rules/workflow.md
```

For personal overrides, create `CLAUDE.local.md` (auto-gitignored by Claude Code).

## Development

When adding new agents/skills:
- Follow existing patterns in each directory
- Use markdown format with frontmatter
- Keep prompts focused and composable
- Make content generic (use CLAUDE.md for project-specific config)
