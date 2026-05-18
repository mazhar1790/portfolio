#!/usr/bin/env node
/**
 * Smoke test — spawn the MCP server over stdio, list tools, call get_profile.
 * Used to verify the server is wired correctly before publishing.
 */

import { spawn } from "node:child_process";

const child = spawn("node", ["server.mjs"], { stdio: ["pipe", "pipe", "inherit"] });

let id = 1;
const requests = [
  { method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "0" } } },
  { method: "tools/list" },
  { method: "tools/call", params: { name: "get_profile", arguments: {} } },
  { method: "tools/call", params: { name: "search_cv", arguments: { query: "Pinecone" } } },
];

let buffer = "";
child.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  let idx;
  while ((idx = buffer.indexOf("\n")) !== -1) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    try {
      const msg = JSON.parse(line);
      console.log(`◆ Response #${msg.id}:`, JSON.stringify(msg.result, null, 2).slice(0, 600));
    } catch {
      console.log("raw:", line);
    }
  }
});

for (const req of requests) {
  child.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: id++, ...req }) + "\n");
}

setTimeout(() => {
  child.kill();
  process.exit(0);
}, 1500);
