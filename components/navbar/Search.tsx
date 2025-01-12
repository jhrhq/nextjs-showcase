"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    }
    if (pathname == "/") {
      replace(`?${params.toString()}`);
    } else {
      replace(`/?${params.toString()}`);
    }
  }, 500);

  function handleSearch(term: string) {
    doSearch(term);
  }

  return (
    <div className="row-start-2 col-span-2 border-0 md:w-full md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center px-2">
      <div className="grid md:grid-cols-3 lg:grid-cols-7 gap-4 divide-x py-2 md:px-2 flex-grow w-full">
        <Input
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          type="text"
          defaultValue={searchParams.get("search")?.toString()}
          placeholder="Where to?"
          className="  col-span-full ring-0 focus-visible:ring-0 px-3 border-none bg-transparent  lg:col-span-full  focus-visible:ring-offset-0 placeholder:text-sm focus:ring-0 "
        />
      </div>
      <Button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0">
        <FaMagnifyingGlass className="fas fa-search text-white" />
      </Button>
    </div>
  );
};

export default Search;
