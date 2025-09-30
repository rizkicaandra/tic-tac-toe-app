import { BoardValue } from '@/app/page';
import { Button } from '@/components/Button';
import { TurnIndicator } from '@/components/TurnIndicator';
import Image from 'next/image';

interface BoardHeaderProps {
  currentPlayer: BoardValue;
}

export function BoardHeader({ currentPlayer }: Readonly<BoardHeaderProps>) {
  return (
    <div className='mb-16 flex items-center justify-between'>
      <Image src='/images/logo.svg' width={71.22} height={31.74} alt={'logo'} />

      {/* turn indicator */}
      <TurnIndicator turn={currentPlayer} />

      {/* reset button */}
      <Button
        label={{
          src: '/images/icon-restart.svg',
          width: 15,
          height: 15,
          alt: 'icon-restart',
        }}
        color='silver'
        height='xs'
        width='w-10'
        onClick={() => {}}
      />
    </div>
  );
}
