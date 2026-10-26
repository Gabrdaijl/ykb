const fs = require("node:fs");
const path = require("node:path");
const ts = require(process.env.TYPESCRIPT_MODULE || "typescript");
const root = process.cwd();
const out = path.join(root, "dist");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "lib"), { recursive: true });
const modules = [
  ["app/question-media.tsx", "question-media.js"],
  ["app/learning-tools.tsx", "learning-tools.js"],
  ["app/advanced-learning.tsx", "advanced-learning.js"],
  ["lib/imported-learning.ts", "lib/imported-learning.js"],
  ["lib/learning-profile.ts", "lib/learning-profile.js"],
  ["lib/study-tools.ts", "lib/study-tools.js"],
  ["app/game-sounds.tsx", "game-sounds.js"],
  ["app/playful-scene.tsx", "playful-scene.js"],
  ["app/nilo-companion.tsx", "nilo-companion.js"],
  ["app/imported-bank.tsx", "imported-bank.js"],
  ["app/learning-visuals.tsx", "learning-visuals.js"],
  ["app/academy.tsx", "academy.js"],
  ["app/adam-speech.ts", "adam-speech.js"],
  ["lib/course.ts", "lib/course.js"],
  ["lib/validation.ts", "lib/validation.js"],
  ["app/language-coach.tsx", "language-coach.js"],
  ["lib/language-course.ts", "lib/language-course.js"],
  ["lib/motivation.ts", "lib/motivation.js"],
  ["lib/expanded-ykb.ts", "lib/expanded-ykb.js"],
  ["lib/arabic-support.ts", "lib/arabic-support.js"],
  ["lib/memory.ts", "lib/memory.js"],
];
for (const [source, target] of modules) {
  let code = ts.transpileModule(fs.readFileSync(path.join(root, source), "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.ESNext, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const replacements = [
    ['"./question-media"', '"./question-media.js"'], ['"./learning-tools"', '"./learning-tools.js"'],
    ['"../lib/imported-learning"', '"./lib/imported-learning.js"'], ['"../lib/learning-profile"', '"./lib/learning-profile.js"'], ['"../lib/study-tools"', '"./lib/study-tools.js"'],
    ['"./game-sounds"', '"./game-sounds.js"'], ['"./adam-speech"', '"./adam-speech.js"'], ['"./playful-scene"', '"./playful-scene.js"'], ['"./nilo-companion"', '"./nilo-companion.js"'],
    ['"./imported-bank"', '"./imported-bank.js"'], ['"./advanced-learning"', '"./advanced-learning.js"'], ['"./learning-visuals"', '"./learning-visuals.js"'],
    ['"../lib/course"', '"./lib/course.js"'], ['"../lib/validation"', '"./lib/validation.js"'], ['"./language-coach"', '"./language-coach.js"'],
    ['"../lib/language-course"', '"./lib/language-course.js"'], ['"../lib/motivation"', '"./lib/motivation.js"'], ['"./language-course.ts"', '"./language-course.js"'],
    ['"./expanded-ykb.ts"', '"./expanded-ykb.js"'], ['"./arabic-support.ts"', '"./arabic-support.js"'], ['"../lib/memory"', '"./lib/memory.js"'],
  ];
  for (const [from, to] of replacements) code = code.replaceAll(from, to);
  fs.writeFileSync(path.join(out, target), code);
}
fs.copyFileSync(path.join(root, "app/globals.css"), path.join(out, "style.css"));
fs.copyFileSync(path.join(root, "app/ui-polish.css"), path.join(out, "ui-polish.css"));
const html = `<!doctype html><html lang="sv"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#123f46"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-title" content="TR-os"><meta name="apple-mobile-web-app-status-bar-style" content="default"><link rel="manifest" href="/manifest.webmanifest"><link rel="apple-touch-icon" href="/apple-touch-icon.png"><link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png"><meta name="description" content="Träna YKB steg för steg med svenska frågor, arabiskt språkstöd och körsituationer."><title>TR-os — YKB Akademi</title><link rel="stylesheet" href="/style.css"><script type="importmap">{"imports":{"react":"https://esm.sh/react@19.2.0","react/jsx-runtime":"https://esm.sh/react@19.2.0/jsx-runtime","react-dom/client":"https://esm.sh/react-dom@19.2.0/client?external=react","lucide-react":"https://esm.sh/lucide-react@0.468.0?external=react","zod":"https://esm.sh/zod@3.25.76"}}</script></head><body><div id="root"></div><script type="module">import React from "react";import{createRoot}from"react-dom/client";import Academy from"./academy.js";createRoot(document.getElementById("root")).render(React.createElement(Academy,{name:"din framtid",signedIn:false,storageKey:"ykb-preview-guest"}));</script></body></html>`;
fs.writeFileSync(path.join(out, "index.html"), html);
fs.copyFileSync(path.join(root, "public/favicon.svg"), path.join(out, "favicon.svg"));
fs.cpSync(path.join(root, "public"), out, { recursive: true });
console.log(`Built static Vercel site in ${out}`);

