import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { ensureClaudeDir } from "../utils/files.js";

export const initCommand = new Command()
  .name("init")
  .description("Initialize dotclaude in your project")
  .action(async () => {
    const spinner = ora("Initializing dotclaude...").start();

    try {
      await ensureClaudeDir();
      spinner.succeed("dotclaude initialized");

      console.log(chalk.green("\n  ✓ Created .claude/ directory"));
      console.log(chalk.dim("\n  Run `dotclaude add` to add components.\n"));
    } catch (error) {
      spinner.fail("Failed to initialize");
      console.error(chalk.red(`\n  ${error}`));
      process.exit(1);
    }
  });
