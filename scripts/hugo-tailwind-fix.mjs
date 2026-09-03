import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

if (process.platform === 'win32') {
  const projectRoot = resolve(fileURLToPath(new URL('..', import.meta.url)));
  const launcherPath = resolve(projectRoot, 'node_modules/.bin/tailwindcss.cmd');
  const cliPath = resolve(projectRoot, 'node_modules/@tailwindcss/cli/dist/index.mjs');

  if (!existsSync(launcherPath) || !existsSync(cliPath)) {
    throw new Error('Tailwind CSS CLI is not installed. Run pnpm install first.');
  }

  const launcher = `@echo off
node "%~dp0\\..\\@tailwindcss\\cli\\dist\\index.mjs" %*
`;

  if (readFileSync(launcherPath, 'utf8') !== launcher) {
    writeFileSync(launcherPath, launcher, 'utf8');
  }
}
