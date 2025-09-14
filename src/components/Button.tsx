export interface ButtonProps {
  label: string;
  color: 'yellow' | 'blue';
  height?: 'small' | 'medium' | 'large';
  width?: string;
}

export function Button({
  label,
  width = 'w-full',
  height = 'medium',
  color,
}: Readonly<ButtonProps>) {
  const colorMap: Record<string, string> = {
    yellow: 'bg-light-yellow border-dark-yellow hover:bg-semi-light-yellow',
    blue: 'bg-light-blue border-dark-blue hover:bg-semi-light-blue',
  };

  const heightMap: Record<string, string> = {
    small: 'border-b-4 py-3.75',
    medium: 'border-b-8 py-3.5 md:py-4.25',
    height: 'border-b-8 py-4.25',
  };

  return (
    <button
      type='button'
      className={`text-dark-navy md:text-small cursor-pointer text-xs font-bold ${heightMap?.[height]} ${colorMap?.[color]} text-center ${width} rounded-15px`}
    >
      {label}
    </button>
  );
}
