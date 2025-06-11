# NewAppTest

This repository demonstrates a simple monorepo using **pnpm workspaces** and **Turborepo**.

## Structure

- `apps/web` – Next.js frontend
- `apps/api` – Express API server
- `packages/shared` – shared TypeScript types and Zod schemas

## Scripts

- `pnpm dev` – run `dev` scripts in all packages with Turbo
- `pnpm build` – build all packages
- `pnpm start` – start compiled applications
- `pnpm lint` – run ESLint across the repo
- `pnpm test` – run unit tests using Vitest

Environment variables are loaded from the root `.env` file in all packages.
Set `NEXT_PUBLIC_API_URL` to the API base URL (default `http://localhost:3001`).
Provide Discord OAuth credentials in `DISCORD_CLIENT_ID`, `DISCORD_CLIENT_SECRET` and set `DISCORD_CALLBACK_URL`.
Use `SESSION_SECRET` to configure cookie sessions.

## Минимальные требования к серверу

- 1 CPU
- 512 МБ RAM
- 2 ГБ свободного диска
- Ubuntu Server 22.04 LTS

## Подготовка и запуск

1. Установите Node.js 20 и `pnpm` (можно через `corepack enable`).
2. Клонируйте репозиторий и перейдите в каталог проекта.
3. Выполните `./scripts/init.sh` для установки зависимостей, одобрения скриптов, генерации Prisma client и применения миграций.
4. Запустите сервер командой `./scripts/start.sh`.
5. Проверить работу можно запросом `GET /ping` на порт `3001`.
6. Остановить приложения можно через `./scripts/stop.sh`.

Все скрипты находятся в каталоге `scripts`.

Для запуска инструмента **OpenAI Local Shell** выполните:

```bash
./scripts/local-shell.sh
```
Это позволит использовать возможности ChatGPT для работы в локальной оболочке.

Перед первым запуском выполните миграцию базы данных:

```bash
pnpm prisma migrate dev --name init
```

## Web pages

- `/games` – список игр
- `/games/new` – форма создания игры

## API routes

- `GET /games` – return list of games
- `POST /games` – create a new game (GM only). Body example:

```json
{
  "name": "D&D",
  "players": ["Bob", "Charlie"]
}
```

- `GET /me` – current authenticated user
- `GET /auth/discord` – start Discord OAuth flow
- `GET /auth/discord/callback` – OAuth callback

### Docker

To build and run the API:

```bash
docker build -t new-app-api apps/api
docker run -p 3001:3001 new-app-api
```

## Troubleshooting

If `prisma generate` fails with a `403 Forbidden` error while downloading engines (common in restricted networks), add `PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1` and run:

```bash
PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1 pnpm --filter @new-app/api exec prisma generate --skip-download
```

You may also need to configure `no_proxy` or a mirror for `binaries.prisma.sh`.

## CI

All pushes and pull requests trigger GitHub Actions defined in
`.github/workflows/ci.yml`. The workflow installs dependencies,
runs `pnpm lint`, `pnpm test` and `pnpm build`.

## License


This project is distributed under the terms of the [GNU General Public License v3](LICENSE).
