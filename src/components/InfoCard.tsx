interface InfoCardProps {
  title: string;
  score: number;
  bgColor: 'blue' | 'yellow' | 'silver';
}

export function InfoCard({ title, score, bgColor }: Readonly<InfoCardProps>) {
  const colorMap: Record<string, string> = {
    blue: 'bg-light-blue',
    silver: 'bg-silver',
    yellow: 'bg-light-yellow',
  };

  return (
    <div
      className={`rounded-10px text-dark-navy w-full min-w-24 py-3 ${colorMap?.[bgColor]} flex flex-col items-center justify-center`}
    >
      <span className='text-body leading-4'>{title}</span>
      <span className='text-small leading-6 font-bold'>{score}</span>
    </div>
  );
}
