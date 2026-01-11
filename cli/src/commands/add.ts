import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import prompts from "prompts";
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
  const choices: prompts.Choice[] = [];

  for (const type of types) {
    // Add group header
    choices.push({
      title: chalk.bold.cyan(`── ${type.toUpperCase()} ──`),
      value: `__header_${type}`,
      disabled: true,
    });

    const items = getItemsByType(type);
    for (const item of items) {
      const exists = await fileExists(item.path);
      choices.push({
        title: exists
          ? `${item.name} ${chalk.yellow("(installed)")}`
          : item.name,
        value: item.name,
        description: item.description,
      });
    }
  }

  const response = await prompts({
    type: "multiselect",
    name: "items",
    message: "Select components to add",
    choices,
    hint: "- Space to select, Enter to confirm",
    instructions: false,
  });

  if (!response.items || response.items.length === 0) {
    return [];
  }

  return response.items
    .filter((name: string) => !name.startsWith("__header_"))
    .map((name: string) => getItemByName(name)!)
    .filter(Boolean);
}

async function installItem(item: ContentItem): Promise<void> {
  const files = await fetchItem(item);

  for (const [filePath, content] of files) {
    await writeContentFile(filePath, content);
  }

  // Add import to CLAUDE.md
  const importLine = getImportLine(item.path);
  await appendToClaudeMd(importLine);
}

export const addCommand = new Command()
  .name("add")
  .description("Add agents, skills, or rules to your project")
  .argument("[items...]", "Items to add (e.g., frontend tdd workflow)")
  .option("-a, --all", "Add all available items")
  .action(async (itemNames: string[], options) => {
    await ensureClaudeDir();

    let items: ContentItem[] = [];

    if (options.all) {
      items = [...CONTENT_REGISTRY];
    } else if (itemNames.length > 0) {
      // Direct item names provided
      for (const name of itemNames) {
        const item = getItemByName(name);
        if (!item) {
          console.error(chalk.red(`Unknown item: ${name}`));
          console.log(chalk.dim("Run `dotclaude list` to see available items."));
          process.exit(1);
        }
        items.push(item);
      }
    } else {
      // Interactive mode
      items = await selectItems();
    }

    if (items.length === 0) {
      console.log(chalk.yellow("No items selected."));
      return;
    }

    console.log();
    const spinner = ora("Installing components...").start();

    let installed = 0;
    const errors: string[] = [];

    for (const item of items) {
      spinner.text = `Installing ${item.name}...`;

      try {
        await installItem(item);
        installed++;
      } catch (error) {
        errors.push(`${item.name}: ${error}`);
      }
    }

    if (errors.length > 0) {
      spinner.warn(`Installed ${installed}/${items.length} components`);
      console.log(chalk.red("\nErrors:"));
      for (const error of errors) {
        console.log(chalk.red(`  • ${error}`));
      }
    } else {
      spinner.succeed(`Installed ${installed} component${installed === 1 ? "" : "s"}`);
    }

    console.log(chalk.dim("\nComponents added to .claude/ and imported in CLAUDE.md"));
  });
