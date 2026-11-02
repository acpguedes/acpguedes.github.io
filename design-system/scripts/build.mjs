// Bundles the components and copies the site's stylesheet, so the library and the Jekyll site share one source of CSS.
import { build } from "esbuild";
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

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

// The site loads its fonts with a <link>; designs only receive the stylesheet, so it carries them here.
const fonts = '@import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500&display=swap");\n';
writeFileSync("dist/style.css", fonts + readFileSync("../assets/css/style.css", "utf8"));
execFileSync("npx", ["tsc", "-p", "tsconfig.json"], { stdio: "inherit" });
