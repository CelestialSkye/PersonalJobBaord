interface CompanyStatusBadgeProps {
  label: string;
  count: number;
  color?: string;
}

const CompanyStatusBadge = ({
  label,
  count,
  color,
}: CompanyStatusBadgeProps) => {
  return (
    <div className="flex flex-col gap-2 items-start flex-1  uppercase">
      <span className="font-body text-xs font-semibold tracking-widest">
        {label}
      </span>
      <span className={`font-headline text-lg font-bold ${color}`}>
        {count}
      </span>
    </div>
  );
};

export default CompanyStatusBadge;
