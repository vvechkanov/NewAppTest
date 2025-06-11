'use client';
import { useEffect, useState } from 'react';
import { User } from '@new-app/shared';

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetch(`${apiUrl}/me`, { credentials: 'include' })
      .then(res => (res.ok ? res.json() : null))
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  const loginUrl = `${apiUrl}/auth/discord`;

  return (
    <header className="flex justify-between items-center mb-4">
      <a href="/" className="text-xl font-bold">Game App</a>
      {user ? (
        <div className="flex items-center space-x-2">
          <img src={user.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
          <span>{user.name}</span>
          {user.role === 'GM' && (
            <a href="/games/new" className="ml-4 underline text-blue-600">Create New Game</a>
          )}
        </div>
      ) : (
        <a href={loginUrl} className="bg-[#5865F2] text-white px-4 py-2 rounded">
          Login with Discord
        </a>
      )}
    </header>
  );
}
