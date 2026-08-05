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
        placeholder="Search movies..."
        className="bg-secondary/50 text-foreground px-4 py-2 rounded-md border border-border placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <div
        id="searchResults"
        className="absolute w-full mt-2 bg-card/90 backdrop-blur-md rounded-lg shadow-xl border border-border hidden"
      />
    </div>
  );
};

export default Search;
