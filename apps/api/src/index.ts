import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GameSchema } from '@new-app/shared';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3000;

app.get('/health', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/ping', (_: Request, res: Response) => {
  res.send('pong');
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
