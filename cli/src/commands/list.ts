import { Command } from "commander";
import * as p from "@clack/prompts";
import { CONTENT_REGISTRY, ItemType, getItemsByType } from "../constants.js";

export const listCommand = new Command()
  .name("list")
  .description("List available agents, skills, and rules")
  .option("-t, --type <type>", "Filter by type (agents, skills, rules)")
  .action(async (options) => {
    p.intro("dotclaude");

    const types: ItemType[] = options.type
      ? [options.type as ItemType]
      : ["agents", "skills", "rules"];

    for (const type of types) {
      const items = getItemsByType(type);
      if (items.length === 0) continue;

      const formatted = items
        .map((item) => `${item.name.padEnd(20)} ${item.description}`)
        .join("\n");

      p.note(formatted, type.toUpperCase());
    }

    p.outro(`${CONTENT_REGISTRY.length} items available`);
  });
