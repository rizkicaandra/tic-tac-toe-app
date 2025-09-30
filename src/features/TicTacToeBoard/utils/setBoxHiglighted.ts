import { GameResult } from '../components/BoardScreen';

export const setBoxHiglighted = (result: GameResult, isWinner: boolean) => {
  if (result === 'X' && isWinner) return 'X';
  if (result === 'O' && isWinner) return 'O';
  return 'default';
};
