import { type Company } from "../types";

type Props = {
  company: Company;
  onEdit: (company: Company) => void;
  isStale: boolean;
  onVisit: (companyId?: string) => void;
};

const CompanyCard = ({ company, onEdit, isStale, onVisit }: Props) => {
  return (
    <div className="border-2 border-black p-4 bg-white mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{company.name}</h3>
          <p className="text-xs text-gray-600">{company.location}</p>
          <p className="text-s text-black">{company.connection}</p>
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreffer"
            onClick={() => onVisit(company.id)}
            className="underline font-bold text-sm"
          >
            VISIT POSTING
          </a>
        </div>

        <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
          {company.status}
        </div>
        {isStale && (
          <span className="bg-yellow-500 text-white px-2 py-1 text-sm font-bold uppercase">
            daily check
          </span>
        )}
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
