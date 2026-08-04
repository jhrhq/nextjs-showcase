"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import useDebounce from "@/domains/movies/hooks/useDebounce";

const Search = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const doSearch = useDebounce((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    push(`${AUTH_CONFIG.ROUTES.SEARCHRESULT}?${params.toString()}`);
  }, 500);

  function handleSearch(term) {
    doSearch(term);
  }

  return (
    <div className="relative">
      <Input
        id="searchInput"
        type="text"
        placeholder="Search an Event"
        className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <div id="searchResults" className="absolute w-full mt-2 bg-black bg-opacity-90 rounded-lg hidden" />
    </div>
  );
};

export default Search;
