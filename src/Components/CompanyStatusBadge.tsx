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
    <div className={`flex flex-col gap-2 items-center items-start ${color}  `}>
      <span>{label}</span>
      <span>{count}</span>
    </div>
  );
};

export default CompanyStatusBadge;
