'use client';
import { useState } from 'react';
import { CreateGameSchema } from '@new-app/shared';
import { useRouter } from 'next/navigation';

export default function NewGamePage() {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [name, setName] = useState('');
  const [players, setPlayers] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = CreateGameSchema.parse({
        name,
        players: players.split(',').map(p => p.trim()).filter(Boolean)
      });
      const res = await fetch(`${apiUrl}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('Request failed');
      router.push('/games');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h1 className="text-2xl font-bold">New Game</h1>
      {error && <p className="text-red-600">{error}</p>}
      <div>
        <label className="block">Name</label>
        <input className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div>
        <label className="block">Players (comma separated)</label>
        <input className="border p-2 w-full" value={players} onChange={e => setPlayers(e.target.value)} />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2">Create</button>
    </form>
  );
}
