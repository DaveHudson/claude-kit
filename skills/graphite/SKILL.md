---
name: graphite
description: Manage Graphite stacked diffs. Usage: `/graphite` (status), `/graphite submit` (run checks + submit), `/graphite sync` (sync with trunk), `/graphite modify`
---

You are a Graphite stacked diffs workflow manager using the `gt` CLI.

## How Stacking Works

Each branch stacks on the previous (not all off main):

```
main → Branch A → Branch B → Branch C
```

PRs target their parent:
- PR A → main
- PR B → PR A
- PR C → PR B

**CRITICAL**: `gt create` branches off your CURRENT branch. To build a proper stack:
- Stay on your current branch after each commit
- Never checkout main between branches
- Each new `gt create` stacks on top of the previous

Graphite handles rebasing, restacking, and retargeting automatically as diffs merge.

## Branch Naming

Use a consistent format for your project. Common patterns:

```bash
# Simple feature branch
gt create feature/add-user-model --all --message "feat: add user model"

# With issue tracking (Linear, GitHub Issues, Jira)
gt create feature/123-add-user-model --all --message "feat: add user model [#123]"

# Username prefix (for team disambiguation)
gt create username/feature-name --all --message "feat: feature name"
```

Configure your preferred pattern in your project's CLAUDE.md.

## Commands

### `/graphite` or `/graphite status`

Show current stack:

```bash
gt log short
```

### `/graphite modify`

Amend the current commit:

```bash
gt modify --all
```

Graphite auto-restacks all dependent branches.

To add a new commit instead:
```bash
gt modify --all --commit --message "fix: address review feedback"
```

### `/graphite submit`

Submit stack for review. **Runs quality checks first**.

1. **Run pre-commit checks** (lint, type-check, tests)

2. **If checks fail**, stop and report errors.

3. **Generate PR description** from diff and commits.

4. **Submit to Graphite**:
```bash
gt submit --stack --publish --no-edit --no-verify --no-interactive
```

5. **Update PR description** via `gh pr edit --body`.

### `/graphite sync`

Sync stack with trunk:

```bash
gt sync
```

Fetches latest main, rebases entire stack, prompts to delete merged branches.

**If conflicts**: resolve them, then `gt restack`.

## Workflow Example

```bash
# Start on main
gt checkout main

# Create first diff (Branch A off main)
# ... make changes ...
gt create feature/add-user-model --all --message "feat: add user model"

# Stack second diff (Branch B off Branch A)
# ... make changes ...
gt create feature/add-user-api --all --message "feat: add user API"

# Stack third diff (Branch C off Branch B)
# ... make changes ...
gt create feature/add-user-ui --all --message "feat: add user UI"

# Submit entire stack
# Creates: PR A→main, PR B→PR A, PR C→PR B
gt submit --stack

# Address feedback on Branch A
gt checkout branch-a
# ... make edits ...
gt modify --all    # Auto-restacks B and C
gt submit

# Keep in sync
gt sync
```

## Key Commands

| Command | Purpose |
|---------|---------|
| `gt create <branch> --all --message "msg"` | Create stacked branch with commit |
| `gt modify --all` | Amend current commit, restack dependents |
| `gt submit` | Submit current PR |
| `gt submit --stack` | Submit entire stack |
| `gt sync` | Update from trunk, rebase stack |
| `gt checkout [branch]` | Switch branch (interactive if no arg) |
| `gt restack` | Manually rebase dependent branches |
| `gt log short` / `gt ls` | Visualize stack |
| `gt top` / `gt bottom` | Navigate stack |
| `gt pr` | Open PR in browser |
