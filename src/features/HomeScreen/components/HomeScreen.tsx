'use client';
import { Button } from '@/components/Button';
import { XOSelector } from '@/components/XOSelector';
import Image from 'next/image';
import { useState } from 'react';

export function HomeScreen() {
  const [xoSelect, setXOSelect] = useState<'X' | 'O'>('O');

  return (
    <main className='bg-dark-navy flex h-full min-h-screen flex-col items-center justify-center gap-8 md:gap-10'>
      <Image src='/images/logo.svg' width={71.22} height={31.74} alt={'logo'} />

      <div className='bg-semi-dark-navy rounded-15px border-b-very-dark flex flex-col items-center justify-center border-b-8 p-6'>
        <h1 className='text-silver mb-6 text-xs font-bold'>
          PICK PLAYER 1’S MARK
        </h1>

        <XOSelector selected={xoSelect} onSelect={setXOSelect} />

        <h3 className='text-body text-silver mt-4.25 font-normal'>
          REMEMBER : X GOES FIRST
        </h3>
      </div>

      <div className='flex w-full max-w-81.75 flex-col gap-4 md:max-w-115 md:gap-5'>
        <Button color='yellow' height='medium' label='NEW GAME (VS CPU)' />

        <Button color='blue' height='medium' label='NEW GAME  (VS PLAYER)' />
      </div>
    </main>
  );
}
