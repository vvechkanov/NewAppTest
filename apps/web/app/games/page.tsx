'use client';
import { useEffect, useState } from 'react';
import { Game } from '@new-app/shared';

export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(res => res.json())
      .then(setGames)
      .catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Games</h1>
      <a href="/games/new" className="underline text-blue-600">Create new game</a>
      <ul className="mt-4 space-y-2">
        {games.map(g => (
          <li key={g.id} className="p-2 border rounded">
            <strong>{g.name}</strong> - GM: {g.gmName}
          </li>
        ))}
      </ul>
    </div>
  );
}
