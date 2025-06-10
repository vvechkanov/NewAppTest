import { z } from 'zod';

export const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
  gmName: z.string(),
  players: z.array(z.string())
});
export type Game = z.infer<typeof GameSchema>;

export const CreateGameSchema = z.object({
  name: z.string(),
  gmName: z.string(),
  players: z.array(z.string())
});
export type CreateGame = z.infer<typeof CreateGameSchema>;

