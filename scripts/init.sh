#!/bin/sh
set -e
cd "$(dirname "$0")/.."
pnpm install --no-frozen-lockfile
pnpm approve-builds
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 pnpm --filter @new-app/api exec prisma generate --schema ../../prisma/schema.prisma --dotenv ../../.env --skip-download || true
pnpm --filter @new-app/api exec prisma migrate deploy --schema ../../prisma/schema.prisma --dotenv ../../.env || true
pnpm build
