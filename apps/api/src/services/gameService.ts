import { CreateGame } from '@new-app/shared';
import { prisma } from '../db';

export async function listGames() {
  return prisma.game.findMany();
}

export async function createGame(data: CreateGame & { gmId: string; gmName: string }) {
  return prisma.game.create({ data });
}

export async function disconnect() {
  await prisma.$disconnect();
}
