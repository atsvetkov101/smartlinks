import * as fs from 'fs/promises';
import * as path from 'path';

async function getFiles(relativePath: string): Promise<Record<string, string>> {
  const files: Record<string, string> = {};

  try {
    const entries = await fs.readdir(relativePath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(relativePath, entry.name);

      if (entry.isFile()) {
        const fileContent = await fs.readFile(fullPath, 'utf-8');
        files[entry.name] = fileContent;
      }
    }
  } catch (error) {
    console.error('Ошибка при чтении каталога:', error);
  }

  return Promise.resolve(files);
}

export default getFiles;
