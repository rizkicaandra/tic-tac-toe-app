import { BoardHeaderProps } from '@/features/TicTacToeBoard/components/BoardHeader';
import Image from 'next/image';

interface TurnIndicatorProps extends Pick<BoardHeaderProps, 'turn'> {}

export function TurnIndicator({ turn }: Readonly<TurnIndicatorProps>) {
  return (
    <div className='bg-semi-dark-navy rounded-5px border-b-very-dark flex gap-2.75 border-b-4 px-3.5 py-2.25'>
      <div className='h-4 w-4'>
        <Image
          src={`/images/icon-${turn === 'X' ? 'x' : 'o'}-unselect.svg`}
          width={16}
          height={16}
          alt={'icon-x'}
        />
      </div>

      <h3 className='text-body text-silver font-bold'>TURN</h3>
    </div>
  );
}
