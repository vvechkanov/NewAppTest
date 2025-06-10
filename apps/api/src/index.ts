import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { CreateGameSchema } from '@new-app/shared';
import { listGames, createGame, disconnect } from './services/gameService';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/ping', (_: Request, res: Response) => {
  res.send('pong');
});

app.get('/games', async (_: Request, res: Response) => {
  const games = await listGames();
  res.json(games);
});

app.post('/games', async (req: Request, res: Response) => {
  try {
    const data = CreateGameSchema.parse(req.body);
    const game = await createGame(data);
    res.status(201).json(game);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});

process.on('SIGINT', async () => {
  await disconnect();
  process.exit(0);
});
