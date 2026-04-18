import type { ReactNode } from "react";

interface AddCompanyButtonProps {
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}

const AddCompanyButton = ({
  onClick,
  className = "",
  children = "+ ADD NEW",
}: AddCompanyButtonProps) => (
  <button onClick={onClick} className={className} type="button">
    {children}
  </button>
);

export default AddCompanyButton;
