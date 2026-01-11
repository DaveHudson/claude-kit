import { Command } from "commander";
import * as p from "@clack/prompts";
import { ensureClaudeDir } from "../utils/files.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize dotclaude in your project")
  .action(async () => {
    p.intro("dotclaude");

    const s = p.spinner();
    s.start("Creating .claude directory");

    try {
      await ensureClaudeDir();
      s.stop("Created .claude directory");

      p.outro("Run `dotclaude add` to add components");
    } catch (error) {
      s.stop("Failed to initialize");
      p.log.error(String(error));
      process.exit(1);
    }
  });
