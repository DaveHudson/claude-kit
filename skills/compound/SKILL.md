---
name: compound
description: Compound engineering workflow for self-improvement. Auto-loads when completing features, doing reviews, or capturing learnings into CLAUDE.md and rules.
---

Each unit of work should make future work easier. Capture learnings so knowledge compounds over time.

---

## The Compound Loop

```
Plan (40%) → Work (20%) → Review (20%) → Compound (20%) → repeat
```

Traditional development accumulates debt. Compound engineering creates a learning loop.

---

## After Completing Work

Ask these questions:

1. **What patterns were used or discovered?**
2. **What decisions were made and why?**
3. **What failures occurred? How to prevent them?**
4. **What should be codified?**

---

## Where to Codify Learnings

| Learning Type | Location |
|--------------|----------|
| Project conventions | `CLAUDE.md` |
| Domain rules | `.claude/rules/<domain>.md` |
| Reusable workflows | `.claude/skills/` |
| Regression prevention | Test cases |
| Cross-project patterns | `~/.claude/CLAUDE.md` |

---

## What to Capture

### In CLAUDE.md
- Project structure and conventions
- Tech stack decisions and rationale
- Common commands and workflows
- Team preferences

### In Rules
- File-type specific patterns (e.g., `paths: ["**/*.tsx"]`)
- Framework conventions (React, Convex, etc.)
- Code style beyond linting

### In Skills
- Multi-step workflows
- Domain knowledge that auto-loads
- Reference materials

### In Tests
- Bug regressions (prevent recurrence)
- Edge cases discovered
- Integration scenarios

---

## Compound Prompts

After completing a feature or fix:

```
What did I learn that should be captured?
- [ ] New pattern → Add to CLAUDE.md or create rule
- [ ] Decision rationale → Document in CLAUDE.md
- [ ] Bug fix → Add regression test
- [ ] Workflow improvement → Update skill or create new one
```

---

## Success Indicators

You're compounding well when:
- Similar features require less effort over time
- Bugs become one-time events (prevented by tests/rules)
- Code reviews surface fewer issues
- New team members onboard faster via CLAUDE.md
- Claude's suggestions align better with your codebase

---

## Key Principles

1. **Document as you go** - Don't defer knowledge capture
2. **Quality compounds** - Good code enables good code
3. **Codify, don't memorize** - Put it in files, not your head
4. **Prefer specific over general** - Concrete examples > abstract rules
5. **Review periodically** - Prune outdated learnings
