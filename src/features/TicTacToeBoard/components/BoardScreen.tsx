'use client';
import { Retangle } from '@/components/Retangle';
import { BoardHeader } from './BoardHeader';
import { InfoCard } from '@/components/InfoCard';
import { useState } from 'react';
import { BoardValue, PlayerMarkerState } from '@/app/page';
import { handleCardInfo } from '../utils/handleCardInfo';
import { checkWinnerWithLine } from '../utils/checkWinnerWithLine';
import { setBoxHiglighted } from '../utils/setBoxHiglighted';
import { setFinalScore } from '../utils/setScore';
import { executeBot } from '../utils/botBestMove';

export interface BoardScreenProps {
  playerMarkers: PlayerMarkerState;
  setPlayerMarkers: (markers: PlayerMarkerState) => void;
}

export type GameResult = BoardValue | 'TIE' | null;

export type winner = {
  line: number[];
  player: GameResult;
};

export type FinalScore = {
  X: number;
  O: number;
  tie: number;
};

export type Board = BoardValue[];

export function BoardScreen({ playerMarkers }: Readonly<BoardScreenProps>) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<BoardValue>(
    playerMarkers.X === 'p1' ? 'X' : 'O',
  );
  const [winner, setWinner] = useState<winner>({
    line: [],
    player: null,
  });
  const [score, setScore] = useState<FinalScore>({ X: 0, O: 0, tie: 0 });

  const handleClick = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
    setCurrentPlayer(nextPlayer);

    const move = executeBot(newBoard, playerMarkers, nextPlayer);
    console.log('move :>> ', move);

    const winner = checkWinnerWithLine(newBoard);
    setWinner(winner);
    setFinalScore(winner.player, score, setScore);
  };

  return (
    <main className='bg-dark-navy h-full min-h-screen'>
      <div className='px-6 pt-6'>
        {/* board header */}
        <BoardHeader currentPlayer={currentPlayer} />

        <div className='grid grid-cols-3 gap-5'>
          {board.map((cell, i) => (
            <Retangle
              key={`${cell}-${i}`}
              boardIndex={i}
              boardValue={cell}
              handleClick={handleClick}
              winner={setBoxHiglighted(winner.player, winner.line.includes(i))}
            />
          ))}

          <InfoCard
            title={handleCardInfo(playerMarkers).X}
            bgColor='blue'
            score={score.X}
            key={0}
          />

          <InfoCard title='TIES' bgColor='silver' score={score.tie} key={1} />

          <InfoCard
            title={handleCardInfo(playerMarkers).O}
            bgColor='yellow'
            score={score.O}
            key={2}
          />
        </div>
      </div>
    </main>
  );
}
