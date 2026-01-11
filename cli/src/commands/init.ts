import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import { ensureClaudeDir, claudeMdExists, writeClaudeMd } from "../utils/files.js";

const DEFAULT_CLAUDE_MD = `# Project

<!-- Add project-specific instructions here -->

## Installed from dotclaude

<!-- Import lines will be added below as you add components -->
`;

export const initCommand = new Command()
  .name("init")
  .description("Initialize dotclaude in your project")
  .option("-f, --force", "Overwrite existing CLAUDE.md")
  .action(async (options) => {
    const spinner = ora("Initializing dotclaude...").start();

    try {
      // Create .claude directory
      await ensureClaudeDir();
      spinner.text = "Created .claude directory";

      // Check for existing CLAUDE.md
      const exists = await claudeMdExists();

      if (exists && !options.force) {
        spinner.succeed("dotclaude initialized");
        console.log(
          chalk.yellow("\n  CLAUDE.md already exists. Use --force to overwrite.")
        );
        console.log(chalk.dim("  Run `dotclaude add` to add components.\n"));
        return;
      }

      if (!exists) {
        await writeClaudeMd(DEFAULT_CLAUDE_MD);
        spinner.text = "Created CLAUDE.md";
      }

      spinner.succeed("dotclaude initialized");

      console.log(chalk.green("\n  ✓ Created .claude/ directory"));
      if (!exists) {
        console.log(chalk.green("  ✓ Created CLAUDE.md"));
      }

      console.log(chalk.dim("\n  Next steps:"));
      console.log(chalk.dim("  1. Run `dotclaude add` to add components"));
      console.log(chalk.dim("  2. Edit CLAUDE.md with project-specific instructions\n"));
    } catch (error) {
      spinner.fail("Failed to initialize");
      console.error(chalk.red(`\n  ${error}`));
      process.exit(1);
    }
  });
