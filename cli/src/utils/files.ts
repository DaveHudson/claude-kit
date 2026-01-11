import fs from "fs/promises";
import path from "path";

const CLAUDE_DIR = ".claude";

export async function ensureClaudeDir(): Promise<void> {
  const claudePath = path.join(process.cwd(), CLAUDE_DIR);
  await fs.mkdir(claudePath, { recursive: true });
}

export async function writeContentFile(
  relativePath: string,
  content: string
): Promise<string> {
  const fullPath = path.join(process.cwd(), CLAUDE_DIR, relativePath);
  const dir = path.dirname(fullPath);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(fullPath, content, "utf-8");

  return fullPath;
}

export async function fileExists(relativePath: string): Promise<boolean> {
  const fullPath = path.join(process.cwd(), CLAUDE_DIR, relativePath);
  try {
    await fs.access(fullPath);
    return true;
  } catch {
    return false;
  }
}

export async function claudeMdExists(): Promise<boolean> {
  const claudeMdPath = path.join(process.cwd(), "CLAUDE.md");
  try {
    await fs.access(claudeMdPath);
    return true;
  } catch {
    return false;
  }
}

export async function readClaudeMd(): Promise<string> {
  const claudeMdPath = path.join(process.cwd(), "CLAUDE.md");
  try {
    return await fs.readFile(claudeMdPath, "utf-8");
  } catch {
    return "";
  }
}

export async function writeClaudeMd(content: string): Promise<void> {
  const claudeMdPath = path.join(process.cwd(), "CLAUDE.md");
  await fs.writeFile(claudeMdPath, content, "utf-8");
}

export async function appendToClaudeMd(line: string): Promise<void> {
  const existing = await readClaudeMd();
  if (!existing.includes(line)) {
    const newContent = existing ? `${existing}\n${line}` : line;
    await writeClaudeMd(newContent);
  }
}

export function getImportLine(relativePath: string): string {
  return `@.claude/${relativePath}`;
}
