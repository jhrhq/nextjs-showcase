import { Button } from "@/components/ui/button";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  return (
    <div className="row-start-2 col-span-2 border-0 md:w-full md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow w-full">
        <input
          type="text"
          placeholder="Where to?"
          className=" form-input col-span-full px-3 bg-transparent  lg:col-span-full placeholder:text-sm border-none focus:ring-0 "
        />
      </div>
      <Button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
        <FaMagnifyingGlass className="fas fa-search text-white" />
      </Button>
    </div>
  );
};

export default Search;
