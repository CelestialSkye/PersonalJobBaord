import { type Company } from "../types";

type Props = {
  company: Company;
  onEdit: (company: Company) => void;
};

const CompanyCard = ({ company, onEdit }: Props) => {
  return (
    <div className="border-2 border-black p-4 bg-white mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{company.name}</h3>
          <p className="text-xs text-gray-600">{company.location}</p>
          <p className="text-s text-black">{company.connection}</p>
        </div>

        <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
          {company.status}
        </div>
      </div>

      <button
        onClick={() => onEdit(company)}
        className="mt-2 text-xs underline text-blue-600"
      >
        Edit
      </button>
    </div>
  );
};

export default CompanyCard;
