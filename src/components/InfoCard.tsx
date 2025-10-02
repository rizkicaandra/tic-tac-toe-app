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
      <span className='text-body leading-4 md:leading-4.25'>{title}</span>
      <span className='text-small md:text-medium leading-6 font-bold md:leading-7.75'>
        {score}
      </span>
    </div>
  );
}
