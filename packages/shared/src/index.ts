import { z } from 'zod';

export const PlayerSchema = z.object({
  id: z.string(),
  name: z.string()
});
export type Player = z.infer<typeof PlayerSchema>;

export const GameSchema = z.object({
  id: z.string(),
  players: z.array(PlayerSchema)
});
export type Game = z.infer<typeof GameSchema>;

export const CreateGameInputSchema = z.object({
  playerNames: z.array(z.string())
});
export type CreateGameInput = z.infer<typeof CreateGameInputSchema>;

