"use client";

import { Search as SearchIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AUTH_CONFIG } from "../../constants/auth.constants";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentSearchTerm = searchParams.get("search") ?? "";
  const [searchValue, setSearchValue] = useState(currentSearchTerm);

  useEffect(() => {
    setSearchValue(currentSearchTerm);
  }, [currentSearchTerm]);

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams.toString());
    const trimmedQuery = searchValue.trim();

    if (trimmedQuery) {
      params.set("search", trimmedQuery);
    } else {
      params.delete("search");
    }

    const destination = `${AUTH_CONFIG.ROUTES.HOME}?${params.toString()}`;
    router.push(destination);
  }

  return (
    <div className="row-start-2 col-span-2 border-0 md:w-full md:border flex shadow-sm hover:shadow-md transition-all md:rounded-full items-center pl-2 pr-1 justify-between">
      <form id="navbar-search-form" onSubmit={handleSubmit} className="w-full">
        <Input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          name="search"
          placeholder="Where to?"
          className="ring-0 focus-visible:ring-0 px-3 border-none bg-transparent focus-visible:ring-offset-0 placeholder:text-sm focus:ring-0 w-full"
        />
      </form>
      <Button
        form="navbar-search-form"
        type="submit"
        className="bg-primary size-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0"
      >
        <SearchIcon className="text-white" />
      </Button>
    </div>
  );
};
export default Search;
