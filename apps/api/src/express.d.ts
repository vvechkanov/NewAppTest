import type { User as AppUser } from '@new-app/shared';

declare global {
  namespace Express {
    interface User extends AppUser {}
    interface Request {
      user?: AppUser;
      isAuthenticated(): boolean;
    }
  }
}

export {};
