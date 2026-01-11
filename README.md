# claude-kit

Reusable Claude Code skills, agents, and commands.

## Install

```bash
# Clone and install to current project
git clone https://github.com/davehudson/claude-kit /tmp/claude-kit
/tmp/claude-kit/install.sh .claude

# Or from a local path
~/Apps/claude-kit/install.sh .claude
```

## Contents

- **agents/** - Specialized agents (frontend, backend, QA, etc.)
- **commands/** - Custom slash commands
- **rules/** - Code style rules
- **skills/** - Reusable skills (`/component`, `/tdd`, `/validate`, etc.)
- **templates/** - File templates

## Customization

After install, each project has its own copy. Modify per-project as needed.

## Update

Re-run install script to pull latest (will overwrite).
