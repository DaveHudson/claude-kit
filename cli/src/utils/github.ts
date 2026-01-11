import { GITHUB_RAW_BASE, GITHUB_API_BASE, ContentItem } from "../constants.js";

export async function fetchFile(path: string): Promise<string> {
  const url = `${GITHUB_RAW_BASE}/${path}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.statusText}`);
  }

  return response.text();
}

export async function fetchDirectory(path: string): Promise<string[]> {
  const url = `${GITHUB_API_BASE}/contents/${path}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to list ${path}: ${response.statusText}`);
  }

  const contents = (await response.json()) as Array<{ name: string; type: string; path: string }>;
  return contents.map((item) => item.path);
}

export async function fetchItem(item: ContentItem): Promise<Map<string, string>> {
  const files = new Map<string, string>();

  if (item.path.endsWith(".md")) {
    // Single file
    const content = await fetchFile(item.path);
    files.set(item.path, content);
  } else {
    // Directory - fetch all files
    const paths = await fetchDirectory(item.path);
    for (const filePath of paths) {
      const content = await fetchFile(filePath);
      files.set(filePath, content);
    }
  }

  return files;
}
