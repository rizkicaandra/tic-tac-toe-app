import Image from 'next/image';
import { Button } from './Button';

interface Modal {
  info: string;
  winner: 'X' | 'O' | 'TIE' | null;
  isRestart: boolean;
  isClosing: boolean;
  handleNextRound: () => void;
  handleRestartGame: () => void;
  handleCloseModalRestart: () => void;
}

export function Modal({
  winner,
  info,
  isRestart,
  isClosing,
  handleNextRound,
  handleRestartGame,
  handleCloseModalRestart,
}: Readonly<Modal>) {
  return (
    <div
      className={`absolute inset-0 z-20 flex h-screen w-full flex-col items-center justify-center`}
    >
      <div className='absolute z-30 h-screen w-full bg-black opacity-50'></div>
      <div
        className={`bg-semi-dark-navy z-40 flex min-h-57 w-full flex-col items-center justify-center gap-4.25 ${!isClosing ? 'animate-slide-down' : 'animate-slide-up'} min-h-66.5 md:gap-6`}
      >
        {info && (
          <h3 className='text-body text-silver font-bold uppercase md:text-xs'>
            {info}
          </h3>
        )}

        <div className='flex items-center justify-center gap-2 md:gap-6'>
          {(winner === 'O' || winner === 'X') && (
            <Image
              width={36}
              height={36}
              src={`/images/icon-${winner?.toLowerCase()}.svg`}
              alt={`icon-${winner}`}
              className='h-7 w-7 md:h-16 md:w-16'
            />
          )}

          <h1
            className={`text-medium ${winner === 'O' && 'text-light-yellow'} ${winner === 'X' && 'text-light-blue'} ${(isRestart || winner === 'TIE') && 'text-silver'} md:text-large font-bold`}
          >
            {winner === 'TIE'
              ? 'ROUND TIED'
              : isRestart
                ? 'RESTART GAME'
                : 'TAKES THE ROUND'}
          </h1>
        </div>

        <div className='flex w-full items-center justify-center gap-4'>
          <Button
            color='silver'
            height='small'
            label={isRestart ? 'NO, CANCEL' : 'QUIT'}
            width={isRestart ? 'w-36.5 md:w-35' : `w-19`}
            onClick={
              isRestart
                ? handleCloseModalRestart
                : () => window.location.reload()
            }
          />
          <Button
            color='yellow'
            height='small'
            label={isRestart ? 'YES, RESTART' : 'NEXT ROUND'}
            width='w-36.5 '
            onClick={isRestart ? handleRestartGame : handleNextRound}
          />
        </div>
      </div>
    </div>
  );
}
