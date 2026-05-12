interface BadgeProps {
  status: string;
}

const Badge = ({ status }: BadgeProps) => {
  const statusStyles: Record<string, string> = {
    alive: 'bg-alive',
    dead: 'bg-dead',
    unknown: 'bg-unknown',
  };

  const bgColor = statusStyles[status.toLowerCase()] || 'bg-unknown';

  return (
    <div
      className={`${bgColor} border-badge-main inline-flex items-center justify-center rounded-2xl border-2 px-2 py-0.5 shadow-(--badge-shadow)`}
    >
      <span className="text-badge-main text-sm font-bold tracking-wider uppercase">
        {status}
      </span>
    </div>
  );
};

export default Badge;
