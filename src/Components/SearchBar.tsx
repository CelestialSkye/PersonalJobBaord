import { IoMdSearch } from "react-icons/io";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="flex items-center w-full bg-gray-300 opacity-50 border-none h-12  ">
      {/* 1. The Icon Wrapper */}
      <div className="pl-4 pr-2 flex items-center justify-center text-black">
        <IoMdSearch size={18} strokeWidth={4} />
      </div>

      <input
        type="text"
        placeholder="Search company ledger..."
        value={value}
        onChange={onChange}
        className="w-full bg-transparent p-4 pl-2 placeholder:text-zinc-800 text-[14px] outline-none"
      />
    </div>
  );
};

export default SearchBar;
