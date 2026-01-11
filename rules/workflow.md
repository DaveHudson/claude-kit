# Workflow

Every unit of work follows this workflow, scaled to task size.

```
1. Clarify   → Understand scope
2. Plan      → Design approach
3. Build     → TDD, incremental commits
4. Validate  → QA checks
5. Submit    → graphite submit
6. Compound  → Capture learnings (suggested)
```

---

## Scaling by Task Size

| Size | Clarify | Plan | Build | Validate | Compound |
|------|---------|------|-------|----------|----------|
| Quick fix | Mental note | Skip | Direct fix | Quick check | Skip |
| Standard | Questions + criteria | TodoWrite | TDD + graphite | Full QA | Suggested |
| Feature | Formal PRD | Plan mode | Multi-stack | Full QA | Suggested |

---

## Step 1: Clarify

Understand what you're building before writing code.

### Lightweight (Manual/Quick)

Ask clarifying questions:
- What problem does this solve?
- What are the acceptance criteria?
- What should this NOT do?

### Formal (Features/Ralph)

Create a PRD with:

```markdown
# Feature: [Name]

## Problem
[What problem this solves, who experiences it]

## Goals
- Goal 1
- Goal 2

## User Stories

### US-1: [Title]
**As a** [user], **I want** [feature] **so that** [benefit].
**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Type check passes
- [ ] Tests pass

## Non-Goals
[What we're NOT building]

## Technical Approach
[Architecture, key decisions]
```

Save to: `tasks/prd-[feature-name].md`

### Story Sizing (for multi-story work)

Each story must complete in one context window. Split large work:

| Too Big | Split Into |
|---------|------------|
| "Build dashboard" | Schema → Queries → UI → Filters |
| "Add auth" | Schema → API → Login UI → Session |

---

## Step 2: Plan

### Research Phase

Before implementing:
1. **Explore codebase** - Find similar patterns
2. **Check git log** - Related changes
3. **Read CLAUDE.md** - Project conventions
4. **WebSearch** - Best practices if needed

### When to Use Plan Mode

| Scope | Planning |
|-------|----------|
| Quick fix (< 1 hour) | Skip - just do it |
| Standard (1-2 days) | TodoWrite with phases |
| Major feature | Plan mode + document |

### Plan Structure

```markdown
## Context
[Why this, what problem]

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2

## Technical Approach
[How to implement, files to modify]

## Testing Strategy
[What tests, edge cases]
```

---

## Step 3: Build

### Execution

1. **Create branch** - `gt create feature/name --all --message "feat: description"`
2. **Track tasks** - Use TodoWrite
3. **TDD** - Write tests before implementation
4. **Commit incrementally** - Small, focused commits via graphite
5. **Stack if needed** - Multiple stacked branches for large work

### Principles

- Follow existing codebase patterns
- Run tests after every change: `bun run test`
- Understand failures before retrying
- One concern per commit

---

## Step 4: Validate

Run QA checks before submission:

```bash
bun run lint
bun run type-check
bun run test --run
bun run test:coverage  # Target: 80%+
```

### Checklist

- [ ] All tests pass
- [ ] Coverage ≥ 80%
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Storybook stories (for UI)

### Browser Verification (for UI changes)

Enable Chrome (`/chrome`) and verify:

1. Start dev server: `bun run dev`
2. Navigate: "Go to localhost:3000"
3. Screenshot: "Take a screenshot"
4. Test interactions: "Click [button], type [text]"
5. Check for errors: "Check the console for errors"

---

## Step 5: Submit

Use graphite to submit:

```bash
gt submit --stack --publish
```

Or use `/graphite submit` which runs QA checks first.

---

## Step 6: Compound (Suggested)

After completing work, capture learnings so future work is easier.

### Questions to Ask

- What patterns were used or created?
- What decisions were made and why?
- What mistakes occurred and how to prevent them?
- What should be added to CLAUDE.md or rules?

### Where to Codify

| Learning Type | Location |
|--------------|----------|
| Project patterns | `CLAUDE.md` |
| Domain rules | `.claude/rules/<domain>.md` |
| Reusable workflows | `.claude/agents/` or `.claude/skills/` |
| Regression prevention | Test cases |

---

## Key Principles

1. **Prefer duplication over wrong abstraction** - Simple > clever
2. **Document as you go** - Don't defer knowledge capture
3. **Quality compounds** - Good code enables good code
4. **Systematic beats heroic** - Process > individual effort
