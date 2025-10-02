import { PlayerMarkerState } from '@/app/page';
import { winner } from '../components/BoardScreen';

export function checkWinnerWithLine(
  board: ('X' | 'O' | null)[],
  playerMarkers: PlayerMarkerState,
): winner {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Check for a winner first
  for (const line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      let info = '';

      const isVersusCpu =
        playerMarkers.X === 'cpu' || playerMarkers.O === 'cpu';

      if (playerMarkers.X === 'cpu' && board[a] === 'X') {
        info = 'OH NO, YOU LOST...';
      }

      if (playerMarkers.O === 'cpu' && board[a] === 'O') {
        info = 'OH NO, YOU LOST...';
      }

      if (playerMarkers.X === 'p1' && board[a] === 'X') {
        info = isVersusCpu ? 'YOU WON!' : 'PLAYER 1 WON!';
      }

      if (playerMarkers.O === 'p1' && board[a] === 'O') {
        info = isVersusCpu ? 'YOU WON!' : 'PLAYER 1 WON!';
      }

      if (playerMarkers.X === 'p2' && board[a] === 'X') {
        info = 'PLAYER 2 WON!';
      }

      if (playerMarkers.O === 'p2' && board[a] === 'O') {
        info = 'PLAYER 2 WON!';
      }

      return {
        player: board[a],
        line,
        info,
      };
    }
  }

  // Check for a tie
  if (board.every((square) => square !== null)) {
    return {
      player: 'TIE', // Using a special value like 'TIE' to indicate a tie
      line: [],
      info: '',
    };
  }

  // If no winner or tie, the game is ongoing
  return {
    player: null,
    line: [],
    info: '',
  };
}
