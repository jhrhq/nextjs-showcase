"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import CompareSearchResultCard from "@/domains/movies/components/compare/CompareSearchResultCard";
import { CompareSearchResultSkeletonList } from "@/domains/movies/components/compare/CompareSearchResultSkeleton";
import { AUTH_CONFIG } from "@/domains/movies/constants/auth.constant";
import useCompare from "@/domains/movies/hooks/useCompare";
import { useDebouncedValue } from "@/domains/movies/hooks/useDebounce";
import { useFetch } from "../../hooks/useFetch";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SearchResults = ({ query, compareId }) => {
  const { setCompareMovie } = useCompare();
  const debouncedSearchQuery = useDebouncedValue(query, 500);
  const enabled = !!debouncedSearchQuery;

  const { data, isLoading, error } = useFetch(
    () => (enabled ? `${AUTH_CONFIG.API.SEARCH}?movieName=${debouncedSearchQuery}` : null),
    fetcher
  );

  const handleAddToCompare = (movie) => {
    setCompareMovie((prev) => prev.map((item) => (item.id === compareId ? { ...item, ...movie } : item)));
  };

  if (isLoading) {
    return (
      <CommandList>
        <CommandEmpty>
          <CompareSearchResultSkeletonList />
        </CommandEmpty>
      </CommandList>
    );
  }

  if (error) {
    return (
      <CommandList>
        <CommandEmpty>{<div className="p-4 text-sm text-background">Something went wrong</div>}</CommandEmpty>
      </CommandList>
    );
  }

  if (!data) {
    return (
      <CommandList>
        <CommandEmpty>
          <div className="p-4 text-sm text-background">Search for movies</div>
        </CommandEmpty>
      </CommandList>
    );
  }

  if (data?.length === 0) {
    return (
      <CommandList>
        <CommandEmpty>
          <span className="text-background">No results found.</span>
        </CommandEmpty>
      </CommandList>
    );
  }

  return (
    <CommandList className="max-h-96 overflow-y-auto ">
      <CommandGroup>
        {data?.map((movie) => (
          <CommandItem
            key={movie.id}
            onSelect={() => handleAddToCompare({ movie })}
            className="flex items-center gap-4 p-2 cursor-pointer rounded"
          >
            <CompareSearchResultCard {...movie} />
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

const CompareAddMovieAction = ({ compareId }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        Select Movie
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-black bg-opacity-80 flex items-center justify-center max-w-2xl"
      >
        <Command shouldFilter={false}>
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl! font-bold! text-background">Search Movie</h2>
            </div>

            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder="Type movie name..."
              className="w-full bg-zinc-800 h-auto text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <SearchResults query={value} compareId={compareId} />
          </div>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CompareAddMovieAction;
