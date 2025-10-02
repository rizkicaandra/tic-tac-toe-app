'use client';
import { Retangle } from '@/components/Retangle';
import { BoardHeader } from './BoardHeader';
import { InfoCard } from '@/components/InfoCard';
import { useEffect, useState } from 'react';
import { BoardValue, PlayerMarkerState } from '@/app/page';
import { handleCardInfo } from '../utils/handleCardInfo';
import { checkWinnerWithLine } from '../utils/checkWinnerWithLine';
import { setBoxHiglighted } from '../utils/setBoxHiglighted';
import { setFinalScore } from '../utils/setScore';
import { executeBot } from '../utils/botBestMove';
import { Modal } from '@/components/Modal';

export interface BoardScreenProps {
  playerMarkers: PlayerMarkerState;
}

export type GameResult = BoardValue | 'TIE' | null;

export type winner = {
  line: number[];
  player: GameResult;
  info: string;
};

export type FinalScore = {
  X: number;
  O: number;
  tie: number;
};

export type Board = BoardValue[];

export function BoardScreen({ playerMarkers }: Readonly<BoardScreenProps>) {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<BoardValue>('X');
  const [winner, setWinner] = useState<winner>({
    line: [],
    player: null,
    info: '',
  });
  const [score, setScore] = useState<FinalScore>({ X: 0, O: 0, tie: 0 });
  const [isCpuThinking, setIsCpuThinking] = useState(false);
  const [bot, setBot] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalRestart, setModalRestart] = useState<boolean>(false);
  const [modalClosing, setModalClosing] = useState<boolean>(false);

  useEffect(() => {
    handleBot(board, currentPlayer);
  }, [bot]);

  const handleBot = (board: Board, nextPlayer: BoardValue) => {
    const isCpuTurn =
      (playerMarkers.X === 'cpu' && nextPlayer === 'X') ||
      (playerMarkers.O === 'cpu' && nextPlayer === 'O');

    if (!isCpuTurn) return;

    setIsCpuThinking(true);

    // Execute CPU move with delay
    executeBot(board, playerMarkers, nextPlayer).then((cpuMove) => {
      handleUpdateBoard(cpuMove, board, nextPlayer);

      setCurrentPlayer(nextPlayer === 'X' ? 'O' : 'X');
      setIsCpuThinking(false);
    });

    return;
  };

  const handleUpdateBoard = (
    index: number,
    defaultBoard: Board,
    playerTurn: BoardValue,
  ) => {
    const newBoard = [...defaultBoard];
    newBoard[index] = playerTurn;
    setBoard(newBoard);

    // Check for winner after player's move
    const playerWinner = checkWinnerWithLine(newBoard, playerMarkers);
    if (playerWinner.player) {
      setWinner(playerWinner);
      setFinalScore(playerWinner.player, score, setScore);
      setModalVisible(true);
      setModalClosing(true);
      return {
        newBoard,
        playerWinner,
      };
    }

    // Check for tie
    if (!newBoard.includes(null)) {
      setWinner({ line: [], player: 'TIE', info: '' });
      setFinalScore('TIE', score, setScore);
      setModalVisible(true);
      setModalClosing(true);
      return {
        newBoard,
        playerWinner,
      };
    }

    return {
      newBoard,
      playerWinner,
    };
  };

  const handleClick = (index: number) => {
    // Don't allow moves if game is over, CPU is thinking, or modal is showing
    if (winner.player || isCpuThinking) return;

    const { newBoard, playerWinner } = handleUpdateBoard(
      index,
      board,
      currentPlayer,
    );

    const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';

    if (playerWinner.player) {
      setCurrentPlayer(nextPlayer);
      return;
    }

    // handle vs cpu
    handleBot(newBoard, nextPlayer);

    // handle player vs player
    setCurrentPlayer(nextPlayer);
    return;
  };

  const handleNextRound = () => {
    setIsCpuThinking(false);
    setBoard(Array(9).fill(null));

    let nextPlayer = winner.player !== 'TIE' ? winner.player : currentPlayer;

    setCurrentPlayer(nextPlayer);

    if (
      (playerMarkers.X === 'cpu' && nextPlayer === 'X') ||
      (playerMarkers.O === 'cpu' && nextPlayer === 'O')
    ) {
      setBot(!bot);
    }

    setModalClosing(false);
    setTimeout(() => {
      setModalVisible(false);
      setModalRestart(false);
      setWinner({ line: [], player: null, info: '' });
    }, 500);
  };

  const handleRestartGame = () => {
    setCurrentPlayer('X');
    setIsCpuThinking(false);
    setBoard(Array(9).fill(null));
    setScore({ X: 0, O: 0, tie: 0 });

    if (playerMarkers.X === 'cpu') {
      setBot(!bot);
    }

    setModalClosing(false);
    setTimeout(() => {
      setModalVisible(false);
      setModalRestart(false);
      setWinner({ line: [], player: null, info: '' });
    }, 500);
  };

  return (
    <main className='bg-dark-navy h-full min-h-screen md:flex md:flex-col md:items-center md:justify-center'>
      <div className='animate-slide-up px-6 pt-6 md:max-w-115 md:px-0 md:pt-0'>
        {/* board header */}
        <BoardHeader
          currentPlayer={currentPlayer}
          handleRestart={() => {
            setModalRestart(true);
            setModalClosing(true);
          }}
        />

        <div className='grid grid-cols-3 gap-5'>
          {board.map((cell, i) => (
            <Retangle
              key={`${cell}-${i}`}
              currentPlayer={currentPlayer}
              boardIndex={i}
              boardValue={cell}
              handleClick={handleClick}
              winner={setBoxHiglighted(winner.player, winner.line.includes(i))}
              disabled={isCpuThinking || winner.player !== null}
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
        {isCpuThinking && (
          <div className='absolute mt-5 w-81.75 text-center md:w-115'>
            <p className='text-silver text-body'>Opponent is thinking...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {(modalVisible || modalRestart) && (
        <Modal
          winner={winner.player}
          info={winner.info}
          handleNextRound={handleNextRound}
          isRestart={modalRestart}
          isClosing={modalClosing}
          handleRestartGame={handleRestartGame}
          handleCloseModalRestart={() => {
            setModalClosing(false);
            setTimeout(() => {
              setModalVisible(false);
              setModalRestart(false);
            }, 500);
          }}
        />
      )}
    </main>
  );
}
