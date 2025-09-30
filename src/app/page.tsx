'use client';
import { HomeScreen } from '@/features/HomeScreen/components/HomeScreen';
import { BoardScreen } from '@/features/TicTacToeBoard/components/BoardScreen';
import { useState } from 'react';

// --- New Type Definitions for Player Markers ---
export type PlayerId = 'p1' | 'p2' | 'cpu' | null;
export type PlayerMarkerState = {
  X: PlayerId;
  O: PlayerId;
};
// --- End New Type Definitions ---

// --- New Type Definitions for Board Values ---
export type BoardValue = 'X' | 'O' | null;
// --- End New Type Definitions ---

export default function Home() {
  let [playerMarkers, setPlayerMarkers] = useState<PlayerMarkerState>({
    X: null,
    O: null,
  });

  return (
    <>
      {playerMarkers.X === null ? (
        <HomeScreen
          playerMarkers={playerMarkers}
          setPlayerMarkers={setPlayerMarkers}
        />
      ) : (
        <BoardScreen
          playerMarkers={playerMarkers}
          setPlayerMarkers={setPlayerMarkers}
        />
      )}
    </>
  );
}
