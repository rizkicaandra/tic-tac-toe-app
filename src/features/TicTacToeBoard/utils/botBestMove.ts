import { BoardValue, PlayerMarkerState } from '@/app/page';
import { Board } from '../components/BoardScreen';

const isVersusCpu = (
  player: PlayerMarkerState,
  nextPlayer: BoardValue,
): boolean => {
  return (
    (player.X === 'cpu' && nextPlayer === 'X') ||
    (player.O === 'cpu' && nextPlayer === 'O')
  );
};

const getBestMove = (board: Board, player: PlayerMarkerState): number => {
  const opponent = player.X === 'p1' ? 'O' : 'X';
  const playerMarker = player.X === 'p1' ? 'X' : 'O';
  const emptySquares = board.reduce<number[]>((acc, value, index) => {
    if (value === null) acc.push(index);
    return acc;
  }, []);

  // Helper to find winning/blocking moves
  const findWinningMove = (p: BoardValue): number | null => {
    for (const line of [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]) {
      const [a, b, c] = line;
      if (board[a] === p && board[b] === p && board[c] === null) return c;
      if (board[a] === p && board[c] === p && board[b] === null) return b;
      if (board[b] === p && board[c] === p && board[a] === null) return a;
    }
    return null;
  };

  // 1. Check for a winning move
  const winningMove = findWinningMove(playerMarker);
  if (winningMove !== null) return winningMove;

  // 2. Check to block opponent's winning move
  const blockingMove = findWinningMove(opponent);
  if (blockingMove !== null) return blockingMove;

  // 3. Take the center
  if (board[4] === null) return 4;

  // 4. Take opposite corner
  const oppositeCorners: [number, number][] = [
    [0, 8],
    [2, 6],
    [6, 2],
    [8, 0],
  ];
  const oppositeCornerMove = emptySquares.find((square) => {
    return oppositeCorners.some(([corner1, corner2]) => {
      return square === corner2 && board[corner1] === opponent;
    });
  });
  if (oppositeCornerMove !== undefined) return oppositeCornerMove;

  // 5. Take an empty corner
  const corners = [0, 2, 6, 8];
  const emptyCornerMove = corners.find((corner) => board[corner] === null);
  if (emptyCornerMove !== undefined) return emptyCornerMove;

  // 6. Take an empty side
  const sides = [1, 3, 5, 7];
  const emptySideMove = sides.find((side) => board[side] === null);
  if (emptySideMove !== undefined) return emptySideMove;

  // Fallback to the first empty square (should not be reached)
  return emptySquares[0];
};

export const executeBot = async (
  board: Board,
  player: PlayerMarkerState,
  nextPlayer: BoardValue,
) => {
  const isCpu = isVersusCpu(player, nextPlayer);
  if (!isCpu) return 0;

  let move: number = 0;

  await new Promise((resolve) => setTimeout(() => resolve, 3000));

  return getBestMove(board, player);
};
