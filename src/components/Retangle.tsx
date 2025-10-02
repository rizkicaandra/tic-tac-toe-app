import { BoardValue } from '@/app/page';
import Image from 'next/image';

export interface RetangleProps {
  currentPlayer: BoardValue;
  boardValue: null | 'X' | 'O';
  boardIndex: number;
  handleClick: (index: number) => void;
  winner: 'X' | 'O' | 'default';
  disabled?: boolean;
}

export function Retangle({
  currentPlayer,
  boardValue,
  boardIndex,
  handleClick,
  winner,
  disabled,
}: Readonly<RetangleProps>) {
  const bgColorMap: Record<string, string> = {
    default: 'bg-semi-dark-navy',
    X: 'bg-semi-light-blue',
    O: 'bg-semi-light-yellow',
  };

  const borderColorMap: Record<string, string> = {
    default: 'bg-very-dark border-very-dark',
    X: 'bg-dark-blue border-dark-blue',
    O: 'bg-dark-yellow border-dark-yellow',
  };

  return (
    <div className='relative h-24 w-24 md:h-35 md:w-35'>
      {/* <!-- shadow / bottom layer --> */}
      <span
        className={`rounded-10px md:rounded-15px ${borderColorMap?.[winner]} absolute top-2.25 left-0 z-10 h-21.5 w-24 border md:h-32.5 md:w-35`}
      ></span>

      {/* <!-- main box --> */}
      <button
        onClick={() => handleClick(boardIndex)}
        disabled={disabled || boardValue !== null}
        className={`rounded-10px md:rounded-15px group ${bgColorMap?.[winner]} relative z-20 flex h-21.5 w-24 items-center justify-center md:h-32.5 md:w-35 ${disabled ? 'cursor-not-allowed opacity-95' : 'cursor-pointer'}`}
      >
        {currentPlayer === 'X' && !boardValue && (
          <Image
            src={`/images/icon-x-outline.svg`}
            width={40}
            height={40}
            alt='icon-x'
            className='opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:h-16 md:w-16'
          />
        )}

        {currentPlayer === 'O' && !boardValue && (
          <Image
            src={`/images/icon-o-outline.svg`}
            width={40}
            height={40}
            alt='icon-o'
            className='opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:h-16 md:w-16'
          />
        )}

        {boardValue === 'X' && (
          <Image
            src={`/images/icon-x${winner !== 'default' ? '-select' : ''}.svg`}
            width={40}
            height={40}
            alt='icon-x'
            className='md:h-16 md:w-16'
          />
        )}

        {boardValue === 'O' && (
          <Image
            src={`/images/icon-o${winner !== 'default' ? '-select' : ''}.svg`}
            width={40}
            height={40}
            alt='icon-o'
            className='md:h-16 md:w-16'
          />
        )}
      </button>
    </div>
  );
}
