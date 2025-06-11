import { z } from 'zod';

export const RoleEnum = z.enum(['PLAYER', 'GM']);
export type Role = z.infer<typeof RoleEnum>;

export const UserSchema = z.object({
  id: z.string(),
  discordId: z.string(),
  name: z.string(),
  avatarUrl: z.string(),
  email: z.string().nullish(),
  role: RoleEnum,
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type User = z.infer<typeof UserSchema>;

export const GameSchema = z.object({
  id: z.string(),
  name: z.string(),
  gmId: z.string().nullish(),
  gmName: z.string(),
  players: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Game = z.infer<typeof GameSchema>;

export const CreateGameSchema = z.object({
  name: z.string(),
  players: z.array(z.string()),
});
export type CreateGame = z.infer<typeof CreateGameSchema>;

