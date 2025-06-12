import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import passport from 'passport';
import { Strategy as DiscordStrategy } from 'passport-discord';
import { CreateGameSchema, User } from '@new-app/shared';
import { listGames, createGame, disconnect } from './services/gameService';
import { prisma } from './db';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true })
);
app.use(morgan('dev'));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'change-me',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: User, done) => done(null, user.id));
passport.deserializeUser(async (id: string, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID || '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
      callbackURL: process.env.DISCORD_CALLBACK_URL || '',
      scope: ['identify', 'email'],
    },
    async (_access, _refresh, profile, done) => {
      try {
        const avatarUrl = profile.avatar
          ? `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.png`
          : '';
        const data = {
          discordId: profile.id,
          name: profile.username,
          avatarUrl,
          email: profile.email as string | undefined,
        };
        let user = await prisma.user.findUnique({ where: { discordId: data.discordId } });
        if (!user) {
          user = await prisma.user.create({ data });
        } else {
          user = await prisma.user.update({ where: { id: user.id }, data });
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

function requireGM(req: Request, res: Response, next: NextFunction) {
  const user = req.user as User | undefined;
  if (req.isAuthenticated() && user?.role === 'GM') return next();
  res.status(403).json({ error: 'Forbidden' });
}

app.get('/health', (_: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.get('/ping', (_: Request, res: Response) => {
  res.send('pong');
});

app.get('/auth/discord', passport.authenticate('discord'));
app.get(
  '/auth/discord/callback',
  passport.authenticate('discord', { failureRedirect: '/' }),
  (_req, res) => {
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:3000');
  }
);

app.get('/me', (req: Request, res: Response) => {
  res.json(req.user || null);
});

app.get('/games', requireAuth, async (_: Request, res: Response) => {
  const games = await listGames();
  res.json(games);
});

app.post('/games', requireGM, async (req: Request, res: Response) => {
  try {
    const data = CreateGameSchema.parse(req.body);
    const user = req.user as User;
    const game = await createGame({ ...data, gmId: user.id, gmName: user.name });
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
