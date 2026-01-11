import { Command } from "commander";
import * as p from "@clack/prompts";
import {
  CONTENT_REGISTRY,
  ContentItem,
  ItemType,
  getItemByName,
  getItemsByType,
} from "../constants.js";
import { fetchItem } from "../utils/github.js";
import {
  ensureClaudeDir,
  writeContentFile,
  fileExists,
  appendToClaudeMd,
  getImportLine,
} from "../utils/files.js";

async function selectItems(): Promise<ContentItem[]> {
  const types: ItemType[] = ["agents", "skills", "rules"];
  const options: { value: string; label: string; hint?: string }[] = [];

  for (const type of types) {
    const items = getItemsByType(type);
    const typeLabel = `[${type.slice(0, -1)}]`;

    for (const item of items) {
      const exists = await fileExists(item.path);
      const installedBadge = exists ? " (installed)" : "";

      options.push({
        value: item.name,
        label: `${typeLabel} ${item.name}${installedBadge}`,
        hint: item.description,
      });
    }
  }

  const selected = await p.multiselect({
    message: "Select components to add",
    options,
    required: false,
  });

  if (p.isCancel(selected)) {
    p.cancel("Cancelled");
    process.exit(0);
  }

  if (!selected || selected.length === 0) {
    return [];
  }

  return (selected as string[])
    .map((name) => getItemByName(name)!)
    .filter(Boolean);
}

async function installItem(item: ContentItem): Promise<void> {
  const files = await fetchItem(item);

  for (const [filePath, content] of files) {
    await writeContentFile(filePath, content);
  }

  const importLine = getImportLine(item.path);
  await appendToClaudeMd(importLine);
}

export const addCommand = new Command()
  .name("add")
  .description("Add agents, skills, or rules to your project")
  .argument("[items...]", "Items to add (e.g., frontend tdd workflow)")
  .option("-a, --all", "Add all available items")
  .action(async (itemNames: string[], options) => {
    p.intro("dotclaude");

    await ensureClaudeDir();

    let items: ContentItem[] = [];

    if (options.all) {
      items = [...CONTENT_REGISTRY];
    } else if (itemNames.length > 0) {
      for (const name of itemNames) {
        const item = getItemByName(name);
        if (!item) {
          p.log.error(`Unknown item: ${name}`);
          p.log.info("Run `dotclaude list` to see available items.");
          process.exit(1);
        }
        items.push(item);
      }
    } else {
      items = await selectItems();
    }

    if (items.length === 0) {
      p.log.warn("No items selected.");
      p.outro("");
      return;
    }

    const s = p.spinner();
    s.start("Installing components");

    let installed = 0;
    const errors: string[] = [];
    const installedNames: string[] = [];

    for (const item of items) {
      s.message(`Installing ${item.name}...`);

      try {
        await installItem(item);
        installed++;
        installedNames.push(item.name);
      } catch (error) {
        errors.push(`${item.name}: ${error}`);
      }
    }

    if (errors.length > 0) {
      s.stop(`Installed ${installed}/${items.length} components`);
      for (const error of errors) {
        p.log.error(error);
      }
    } else {
      s.stop(`Installed ${installed} component${installed === 1 ? "" : "s"}`);
    }

    p.note(installedNames.join("\n"), "Added to .claude/");
    p.outro("Imports added to CLAUDE.md");
  });
