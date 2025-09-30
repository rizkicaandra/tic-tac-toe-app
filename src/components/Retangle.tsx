import Image from 'next/image';

export interface RetangleProps {
  boardValue: null | 'X' | 'O';
  boardIndex: number;
  handleClick: (index: number) => void;
  winner: 'X' | 'O' | 'default';
}

export function Retangle({
  boardValue,
  boardIndex,
  handleClick,
  winner,
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
    <div className='relative h-24 w-24'>
      {/* <!-- shadow / bottom layer --> */}
      <span
        className={`rounded-10px ${borderColorMap?.[winner]} absolute top-2.25 left-0 z-10 h-21.5 w-24 border`}
      ></span>

      {/* <!-- main box --> */}
      <button
        onClick={() => handleClick(boardIndex)}
        className={`rounded-10px ${bgColorMap?.[winner]} relative z-20 flex h-21.5 w-24 items-center justify-center`}
      >
        {boardValue === 'X' && (
          <Image
            src={`/images/icon-x${winner !== 'default' ? '-select' : ''}.svg`}
            width={40}
            height={40}
            alt='icon-x'
          />
        )}

        {boardValue === 'O' && (
          <Image
            src={`/images/icon-o${winner !== 'default' ? '-select' : ''}.svg`}
            width={40}
            height={40}
            alt='icon-o'
          />
        )}
      </button>
    </div>
  );
}
