# NewAppTest

This repository demonstrates a simple monorepo using **pnpm workspaces** and **Turborepo**.

## Structure

- `apps/web` – minimal Express based frontend
- `apps/api` – Express API server
- `packages/shared` – shared TypeScript types and Zod schemas

## Scripts

- `pnpm dev` – run `dev` scripts in all packages with Turbo
- `pnpm build` – build all packages
- `pnpm start` – start compiled applications

Environment variables are loaded from the root `.env` file in all packages.
