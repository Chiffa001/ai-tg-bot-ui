# AI TG Bot Landing

Landing page for the AI Telegram Business Manager product, built with Next.js App Router and Tailwind CSS.

## Architecture

The project uses a modular feature-based architecture.

Feature-specific code should live inside `src/modules/<feature>`.
If code is reused across multiple modules, it should live in `src/shared`.
Components should follow a one-component-per-file rule.

## Getting Started

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Structure

```text
src/
  app/
  modules/
    welcome/
      components/
      constants/
  shared/
```

## Notes

This repository uses Next.js 16. Before making framework-level changes, read the relevant docs from `node_modules/next/dist/docs/`.
