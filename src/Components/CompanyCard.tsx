import { type Company } from "../types";

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <div className="border-2 border-black p-4 bg-white mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{company.name}</h3>
          <p className="text-xs text-gray-600">{company.location}</p>
        </div>

        <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
          {company.status}
        </div>
      </div>

      <a
        href={company.url}
        target="_blank"
        className="text-xs underline text-blue-600 mt-2 block"
      >
        Visit Link
      </a>
    </div>
  );
};

export default CompanyCard;
