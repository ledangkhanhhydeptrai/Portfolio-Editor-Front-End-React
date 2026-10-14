import { Search } from "lucide-react";
import { EducationSearchProps } from "../../../../services/education/EducationTypes";

export default function EducationSearch({
  searchTerm,
  setSearchTerm
}: EducationSearchProps) {
  return (
    <div className="relative w-full sm:w-72">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Tìm trường, bằng cấp, chuyên ngành..."
        className="w-full rounded-lg border border-white/10 bg-[#0B0C11] py-2.5 pl-9 pr-3 text-sm text-gray-200 outline-none transition placeholder:text-gray-600 focus:border-indigo-400/50"
      />
    </div>
  );
}
