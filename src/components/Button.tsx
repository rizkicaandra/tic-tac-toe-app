import Image from 'next/image';

export interface ButtonProps {
  label: string | { src: string; width: number; height: number; alt: string };
  color: 'yellow' | 'blue' | 'silver';
  height?: 'small' | 'medium' | 'large' | 'xs';
  width?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function Button({
  label,
  width = 'w-full',
  height = 'medium',
  color,
  onClick,
}: Readonly<ButtonProps>) {
  const colorMap: Record<string, string> = {
    yellow: 'bg-light-yellow border-dark-yellow hover:bg-semi-light-yellow',
    blue: 'bg-light-blue border-dark-blue hover:bg-semi-light-blue',
    silver: 'bg-silver border-dark-silver hover:bg-semi-silver',
  };

  const heightMap: Record<string, string> = {
    xs: 'border-b-4 pt-3 pb-2.25 rounded-5px',
    small: 'border-b-4 py-3.75 rounded-15px',
    medium: 'border-b-8 py-3.5 rounded-15px md:py-4.25',
    large: 'border-b-8 py-4.25 rounded-15px',
  };

  return (
    <button
      type='button'
      className={`text-dark-navy md:text-small cursor-pointer text-xs font-bold ${heightMap?.[height]} ${colorMap?.[color]} flex items-center justify-center ${width} `}
      onClick={onClick}
    >
      {typeof label === 'string' ? label : <Image {...label} />}
    </button>
  );
}
