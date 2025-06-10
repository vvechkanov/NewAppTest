#!/bin/sh
set -e
pnpm install
pnpm approve-builds
pnpm --filter @new-app/api exec prisma generate
pnpm --filter @new-app/api exec prisma migrate deploy || true
pnpm build
