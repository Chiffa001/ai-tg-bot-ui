<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Architecture

This project uses a modular feature-based architecture.

Prefer organizing feature code inside `src/modules/<feature>`.

If some code is reused across multiple modules, prefer placing it in `src/shared`.
Use no more than one component per file. If a file starts to contain multiple components, split them into separate component folders/files.

Typical module structure:
- `api/` — feature-specific API clients, request helpers, and temporary/mock API integrations
- `components/`
- `constants/`
- `guards/` — route guards, access checks, and middleware/proxy helper logic owned by the feature
- `hooks/`
- `lib/`
- `schemas/` — validation schemas and inferred form/data types
- `types/`

Prefer specific folders such as `api/`, `guards/`, and `schemas/` over putting unrelated code into `lib/`. Use `lib/` only for feature-specific helpers that do not fit a clearer category.
When adding or changing route guards in `guards/` or pure/helper functions in `lib/`, add or update tests in a nearby `__tests__/` folder.

Do not place feature-specific code into shared top-level folders unless it is genuinely reused across multiple modules.
Shared reusable code should live in `src/shared`.
Do not keep multiple components in the same file unless there is a very strong reason and it has been explicitly discussed.

# UI Primitives

Use Radix UI primitives (`@radix-ui/react-*`) selectively and only when needed for complex interactive elements (e.g. Switch, Select, Dialog). Do not install full UI kits like shadcn. Radix primitives are unstyled — always wrap them in custom components following the project's design system.
