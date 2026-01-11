#!/bin/bash
set -e

TARGET="${1:-.claude}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "Installing claude-kit to $TARGET..."

mkdir -p "$TARGET"

# Copy directories (use -n to not overwrite existing files, or remove -n to always overwrite)
for dir in agents commands rules skills; do
  if [ -d "$SCRIPT_DIR/$dir" ]; then
    cp -r "$SCRIPT_DIR/$dir" "$TARGET/"
    echo "  ✓ $dir"
  fi
done

echo "Done! Claude skills installed to $TARGET"
