<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# 🤖 Agent Fast-Start Guide

Welcome to the **Hindi Wedding Invitation** codebase. Review this summary first before writing or modifying code.

## 📚 Essential Documentation
- **[`folder.md`](file:///d:/wedding/folder.md)**: Complete file & directory structure, component inventory, and import dependency graph.
- **[`ARCHITECTURE.md`](file:///d:/wedding/ARCHITECTURE.md)**: Architectural design decisions, animation engine, responsive layout frame, and font pairing.
- **[`QUICK_START.md`](file:///d:/wedding/QUICK_START.md)**: Commands, recipes (updating events/names/photos), and troubleshooting pitfalls.
- **[`README.md`](file:///d:/wedding/README.md)**: Full project overview and mobile-first storytelling design details.

## 🔑 Critical Codebase Rules
1. **Motion Library**: Always import from `"motion/react"`, never from `"framer-motion"`.
2. **Tailwind CSS v4**: Uses `@import "tailwindcss";` in `app/globals.css`. Do not add a `tailwind.config.js`.
3. **Single Source of Truth**: All wedding text, dates, names, venues, and image paths reside in `data/wedding.ts`. Do not hardcode strings in component JSX.
4. **Mobile Framing**: Keep parent containers with `overflow-x-hidden` so side-sliding animations (`x: 85 -> 0`) do not cause horizontal scrolling on mobile devices.
5. **Architectural Frame**: The outer viewport frame in `app/page.tsx` uses custom corner gradient classes (`.corner-tl`, `.corner-tr`, `.corner-bl`, `.corner-br`) defined in `app/globals.css`.

