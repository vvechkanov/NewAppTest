// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');
import { CreateGame } from '@new-app/shared';

const prisma = new PrismaClient();

export async function listGames() {
  return prisma.game.findMany();
}

export async function createGame(data: CreateGame) {
  return prisma.game.create({ data });
}

export async function disconnect() {
  await prisma.$disconnect();
}
