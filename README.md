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

## Locales

The app now supports `ru`, `en`, and `pl`.

Any new screen, page, or route must support all project locales from the start: `ru`, `en`, and `pl`. Do not add locale-specific UI only for one language and postpone the other translations for later.

- `http://localhost:3000/ru` — Russian
- `http://localhost:3000/en` — English
- `http://localhost:3000/pl` — Polish

The root URL (`/`) is redirected by Proxy to the best matching locale based on the browser's `Accept-Language` header. If the header doesn't match supported locales, the app falls back to `ru`.

For local checks it's better to open the locale explicitly by URL prefix, so screenshots, E2E tests, and QA are deterministic.

## Development Test Data

Use this valid bot token example for the onboarding bot step:

```text
1234567890:ABCDefghijklmnopqrstuvwxyz123456789
```

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
