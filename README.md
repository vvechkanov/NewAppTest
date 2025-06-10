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

Environment variables are loaded from the root `.env` file in all packages.

## Минимальные требования к серверу

- 1 CPU
- 512 МБ RAM
- 2 ГБ свободного диска
- Ubuntu Server 22.04 LTS

## Подготовка и запуск

1. Установите Node.js 18 и `pnpm` (можно через `corepack enable`).
2. Клонируйте репозиторий и перейдите в каталог проекта.
3. Выполните `./scripts/init.sh` для установки зависимостей и сборки.
4. Запустите сервер командой `./scripts/start.sh`.
5. Проверить работу можно запросом `GET /ping` на порт `3000`.
6. Остановить приложения можно через `./scripts/stop.sh`.

Все скрипты находятся в каталоге `scripts`.

Перед первым запуском выполните миграцию базы данных:

```bash
pnpm prisma migrate dev --name init
```

## Web pages

- `/games` – список игр
- `/games/new` – форма создания игры

## API routes

- `GET /games` – return list of games
- `POST /games` – create a new game. Body example:

```json
{
  "name": "D&D",
  "gmName": "Alice",
  "players": ["Bob", "Charlie"]
}
```

### Docker

To build and run the API:

```bash
docker build -t new-app-api apps/api
docker run -p 3000:3000 new-app-api
```
