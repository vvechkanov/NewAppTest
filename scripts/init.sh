#!/bin/sh
set -e
pnpm install
pnpm approve-builds
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 pnpm --filter @new-app/api exec prisma generate --skip-download || true
pnpm --filter @new-app/api exec prisma migrate deploy || true
pnpm build
