import { existsSync } from "node:fs";
import { spawn } from "node:child_process";
import { delimiter, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const toolDirectories = [
  resolve(projectRoot, ".tools", "hugo"),
  resolve(projectRoot, ".tools", "go", "go", "bin"),
  resolve(projectRoot, ".tools", "go", "bin"),
  resolve(projectRoot, ".tools", "bin"),
].filter((directory) => existsSync(directory));

const [command, ...args] = process.argv.slice(2);

if (!command) {
  console.error("Usage: node scripts/run-with-tools.mjs <command> [args...]");
  process.exit(1);
}

const environment = {
  ...process.env,
  PATH: [...toolDirectories, process.env.PATH].filter(Boolean).join(delimiter),
};

const child = spawn(command, args, {
  cwd: projectRoot,
  env: environment,
  stdio: "inherit",
});

child.on("error", (error) => {
  console.error(error.message);
  process.exit(1);
});

child.on("close", (code) => {
  process.exit(code ?? 1);
});
