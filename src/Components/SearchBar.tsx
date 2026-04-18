interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search Companies"
        value={value}
        onChange={onChange}
        className="w-full bg-white border-4 border-black p-4 font-black uppercase 
                   focus:bg-black focus:text-white outline-none transition-all
                   placeholder:text-zinc-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      />
    </div>
  );
};

export default SearchBar;
