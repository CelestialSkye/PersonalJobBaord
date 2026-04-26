import { useMemo } from "react";
import { type Company } from "../types";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

type Props = {
  company: Company;
  onEdit: (company: Company) => void;
  dailyVisit: boolean;
  onVisit: (companyId?: string) => void;
  isStale: boolean;
  onDelete: (companyId?: string) => void;
};

const colorsArray = [
  "#E07A5F", // terracotta
  "#F2A65A", // warm amber
  "#D4845A", // burnt sienna
  "#C97B4B", // caramel
  "#E8B86D", // golden sand
  "#B5614A", // rust
] as const;

type BrutalColor = (typeof colorsArray)[number];

const getColorFromId = (id: string = ""): BrutalColor => {
  const hash = id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colorsArray[hash % colorsArray.length];
};

const CompanyCard = ({
  company,
  onEdit,
  dailyVisit,
  onVisit,
  isStale,
  onDelete,
}: Props) => {
  const accentColor = useMemo(() => getColorFromId(company.id), [company.id]);

  return (
    <div
      className="flex flex-row mb-4 bg-white md:grid-cols-2 lg:grid-cols-3
"
    >
      <div
        className="w-1 self-stretch"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex flex-col flex-1 p-4">
        <div className="flex flex-row justify-between items-center">
          <p className="text-s text-gray-600">{company.location}</p>

          {isStale && (
            <span className="bg-red-500 text-white px-2 py-1 text-sm font-bold uppercase">
              stale
            </span>
          )}
        </div>
        <div className="flex flex-row gap-x-2 items-center   ">
          <h3 className="font-bold text-lg">{company.name}</h3>

          <p className="text-s text-black">{company.connection}</p>
        </div>
        <p className="text-xs text-gray-500">
          {new Date(company.lastChecked).toLocaleString()}
        </p>
        <div className="flex flex-row gap-x-2 items-center mt-1">
          {dailyVisit && (
            <span className="bg-yellow-500 text-white px-2 py-1 text-xs font-bold uppercase">
              daily check
            </span>
          )}

          <div className="bg-black text-white px-2 py-1 text-xs font-bold uppercase">
            {company.status}
          </div>
        </div>

        <div className="flex flex-row gap-x-4 justify-between items-center">
          <a
            href={company.url}
            target="_blank"
            rel="noopener noreffer"
            onClick={() => onVisit(company.id)}
            className="font-bold text-white text-sm bg-blue-500 p-2 mt-2"
          >
            VIEW POSTING
          </a>
          <div className="flex gap-1">
            <button
              onClick={() => onEdit(company)}
              className="mt-2 text-white  text-xs bg-blue-500 p-2 "
            >
              <FaEdit />
            </button>
            <button
              onClick={() => onDelete(company.id)}
              className="mt-2 text-white text-xs bg-red-500 p-2"
            >
              <MdDeleteForever />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
