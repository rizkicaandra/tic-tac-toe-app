import { winner } from '../components/BoardScreen';

export function checkWinnerWithLine(board: ('X' | 'O' | null)[]): winner {
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
      return {
        player: board[a],
        line,
      };
    }
  }

  // Check for a tie
  if (board.every((square) => square !== null)) {
    return {
      player: 'TIE', // Using a special value like 'TIE' to indicate a tie
      line: [],
    };
  }

  // If no winner or tie, the game is ongoing
  return {
    player: null,
    line: [],
  };
}
