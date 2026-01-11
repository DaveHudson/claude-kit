import { Command } from "commander";
import chalk from "chalk";
import { CONTENT_REGISTRY, ItemType, getItemsByType } from "../constants.js";

export const listCommand = new Command()
  .name("list")
  .description("List available agents, skills, and rules")
  .option("-t, --type <type>", "Filter by type (agents, skills, rules)")
  .action(async (options) => {
    const types: ItemType[] = options.type
      ? [options.type as ItemType]
      : ["agents", "skills", "rules"];

    for (const type of types) {
      const items = getItemsByType(type);
      if (items.length === 0) continue;

      console.log(chalk.bold.cyan(`\n${type.toUpperCase()}`));
      console.log(chalk.dim("─".repeat(40)));

      for (const item of items) {
        console.log(
          `  ${chalk.green(item.name.padEnd(20))} ${chalk.dim(item.description)}`
        );
      }
    }

    console.log(
      chalk.dim(`\nTotal: ${CONTENT_REGISTRY.length} items available`)
    );
  });
