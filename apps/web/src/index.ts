import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { GameSchema } from '@new-app/shared';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.WEB_PORT || 3001;

app.get('/', (_: Request, res: Response) => {
  res.send('Web app running');
});

app.listen(port, () => {
  console.log(`Web app listening on port ${port}`);
});
