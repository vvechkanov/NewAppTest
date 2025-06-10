FROM node:18-alpine
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ./
COPY ../../packages ./packages
COPY ./package.json ./
COPY . .
COPY ../../prisma ./prisma
RUN npm i -g pnpm && pnpm install --prod
RUN npx prisma generate
RUN pnpm build
CMD pnpm prisma migrate deploy && pnpm start
