// Bundles the components and copies the site's stylesheet, so the library and the Jekyll site share one source of CSS.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist");

await build({
  entryPoints: ["src/index.ts"],
  outfile: "dist/index.js",
  bundle: true,
  format: "esm",
  jsx: "automatic",
  target: "es2020",
  external: ["react", "react-dom", "react/jsx-runtime"],
  loader: { ".svg": "dataurl", ".jpeg": "dataurl" },
});

copyFileSync("../assets/css/style.css", "dist/style.css");
execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { stdio: "inherit" });
