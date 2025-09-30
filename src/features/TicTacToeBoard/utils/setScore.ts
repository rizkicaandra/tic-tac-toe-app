import { FinalScore, GameResult } from '../components/BoardScreen';

export const setFinalScore = (
  winner: GameResult,
  score: FinalScore,
  setScore: (score: FinalScore) => void,
) => {
  if (winner === 'X') return setScore({ ...score, X: score.X + 1 });
  if (winner === 'O') return setScore({ ...score, O: score.O + 1 });
  if (winner === 'TIE') return setScore({ ...score, tie: score.tie + 1 });
  else return score;
};
