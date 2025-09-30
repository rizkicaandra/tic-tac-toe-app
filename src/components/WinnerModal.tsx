import Image from 'next/image';
import { Button } from './Button';

interface WinnerModal {
  info: string;
  winner: 'X' | 'O' | 'TIE' | null;
}

export function WinnerModal({ winner, info }: Readonly<WinnerModal>) {
  return (
    <div className='absolute z-10 flex h-screen w-full flex-col items-center justify-center'>
      <div className='absolute z-20 h-screen w-full bg-black opacity-50'></div>
      <div className='bg-semi-dark-navy z-30 flex min-h-57 w-full flex-col items-center justify-center gap-4.25'>
        <h3 className='text-body text-silver font-bold uppercase'>{info}</h3>
        <div className='flex items-center justify-center gap-2'>
          <Image
            width={36}
            height={36}
            src={`/images/icon-${winner?.toLowerCase()}.svg`}
            alt={`icon-${winner}`}
            className='h-7 w-7'
          />
          <h1
            className={`text-medium ${winner === 'O' ? 'text-light-yellow' : 'text-light-blue'} font-bold`}
          >
            TAKES THE ROUND
          </h1>
        </div>

        <div className='flex w-full items-center justify-center gap-4'>
          <Button color='silver' height='small' label={'QUIT'} width='w-19' />
          <Button
            color='yellow'
            height='small'
            label={'NEXT ROUND'}
            width='w-36.5'
          />
        </div>
      </div>
    </div>
  );
}
