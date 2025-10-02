import { BoardValue } from '@/app/page';
import Image from 'next/image';

interface TurnIndicatorProps {
  turn: BoardValue;
}

export function TurnIndicator({ turn }: Readonly<TurnIndicatorProps>) {
  return (
    <div className='bg-semi-dark-navy rounded-5px border-b-very-dark md:rounded-10px flex gap-2.75 border-b-4 px-3.5 py-2.25 text-center md:mr-5 md:gap-3.5 md:px-7 md:py-3.5'>
      <div className='h-4 w-4 md:h-5 md:w-5'>
        <Image
          src={`/images/icon-${turn === 'X' ? 'x' : 'o'}-unselect.svg`}
          alt={'icon-x'}
          width={16}
          height={16}
          className='w-4 md:w-5'
        />
      </div>

      <h3 className='text-body text-silver font-bold md:text-xs'>TURN</h3>
    </div>
  );
}
