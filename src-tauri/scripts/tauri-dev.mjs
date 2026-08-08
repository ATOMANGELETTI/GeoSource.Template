import { spawn } from "node:child_process";
import path from "node:path";
import os from "node:os";

const homeDir = os.homedir();
const cargoBinDir = path.join(homeDir, ".cargo", "bin");
const scoopBinDir = path.join(homeDir, "scoop", "apps", "mingw", "current", "bin");
const scoopShimsDir = path.join(homeDir, "scoop", "shims");

const env = {
  ...process.env,
  PATH: `${cargoBinDir}${path.delimiter}${scoopBinDir}${path.delimiter}${scoopShimsDir}${path.delimiter}${process.env.PATH || ""}`,
};

const args = process.argv.slice(2);
const isWin = process.platform === "win32";
const cmd = isWin ? "cmd.exe" : "npx";
const fullArgs = isWin ? ["/c", "npx", "tauri", ...args] : ["tauri", ...args];

const child = spawn(cmd, fullArgs, { stdio: "inherit", env });

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
