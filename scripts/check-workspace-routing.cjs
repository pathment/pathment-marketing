/* eslint-disable @typescript-eslint/no-require-imports -- This standalone check intentionally loads CommonJS modules. */
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const code = ts.transpileModule(
  fs.readFileSync(path.join(__dirname, "../lib/workspace.ts"), "utf8"),
  {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  },
).outputText;
const compiled = { exports: {} };
new Function("exports", "require", "module", code)(
  compiled.exports,
  require,
  compiled,
);
const { workspaceSlug, workspaceLoginUrl } = compiled.exports;
const valid = [
  "devweekends",
  " DEVWEEKENDS ",
  "devweekends.pathment.me",
  "https://devweekends.pathment.me/login",
  "https://app.pathment.me/w/devweekends/login",
];
for (const value of valid)
  assert.equal(workspaceSlug(value), "devweekends", value);
const invalid = [
  "",
  "app",
  "https://evil.example/w/acme",
  "https://app.pathment.me.evil.example/w/acme",
  "https://app.pathment.me/login",
  "foo bar",
  "a/b",
  "-bad",
  "https://user@acme.pathment.me",
  "foo.pathmentXme",
];
for (const value of invalid) assert.equal(workspaceSlug(value), "", value);
assert.equal(
  workspaceLoginUrl("devweekends"),
  "https://app.pathment.me/w/devweekends/login",
);
console.log("16 workspace routing assertions passed");
