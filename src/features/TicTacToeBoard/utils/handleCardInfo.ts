import { PlayerMarkerState } from '@/app/page';

export const handleCardInfo = (playerMarkers: PlayerMarkerState) => {
  const { X, O } = playerMarkers;

  if (X === 'p1' && O === 'cpu') {
    return {
      X: 'X (You)',
      O: 'O (CPU)',
    };
  }

  if (X === 'cpu' && O === 'p1') {
    return {
      X: 'X (CPU)',
      O: 'O (You)',
    };
  }

  // Handle Player vs. Player cases
  return {
    X: X === 'p1' ? 'X (P1)' : 'X (P2)',
    O: O === 'p1' ? 'O (P1)' : 'O (P2)',
  };
};
