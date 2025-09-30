import { BoardValue } from '@/app/page';
import Image from 'next/image';

interface XOSelectorProps {
  selected: 'X' | 'O' | null;
  onSelect: (markers: BoardValue) => void;
}

export function XOSelector({ selected, onSelect }: Readonly<XOSelectorProps>) {
  return (
    <div className='bg-dark-navy rounded-10px relative flex flex-row px-2 py-2.25'>
      <div
        className={`rounded-10px bg-silver absolute z-1 h-13.5 w-33 transition-transform duration-500 md:w-49.5 ${selected === 'O' ? 'translate-x-33 md:translate-x-49.5' : 'translate-x-none'}`}
      ></div>

      <button
        className='hover:bg-silver/5 hover:rounded-10px z-5 cursor-pointer px-12.5 py-2.75 md:px-20.75'
        onClick={() => onSelect('X')}
      >
        <Image
          height={32}
          width={32}
          src={`/images/icon-x-${selected === 'X' ? 'select' : 'unselect'}.svg`}
          alt='icon-x'
        />
      </button>

      <button
        className='hover:bg-silver/5 hover:rounded-10px z-5 cursor-pointer px-12.5 py-2.5 md:px-20.75'
        onClick={() => onSelect('O')}
      >
        <Image
          height={32}
          width={32}
          src={`/images/icon-o-${selected === 'O' ? 'select' : 'unselect'}.svg`}
          alt='icon-o'
        />
      </button>
    </div>
  );
}
