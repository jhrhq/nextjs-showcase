"use client";

import CompareSearchResultCard from "@/components/compare/CompareSearchResultCard";
import { CompareSearchResultSkeletonList } from "@/components/compare/CompareSearchResultSkeleton";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { useDebouncedValue } from "@/app/hooks/useDebounce";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SearchResults = ({ query }) => {
  const debouncedSearchQuery = useDebouncedValue(query, 500);
  const enabled = !!debouncedSearchQuery;

  const { data, isLoading, error } = useSWR(
    () => (enabled ? "/api/search?movieName=" + debouncedSearchQuery : null),
    fetcher
  );

  if (isLoading) {
    return (
      <CommandList>
        <CommandEmpty>
          <CompareSearchResultSkeletonList />
        </CommandEmpty>
      </CommandList>
    );
  }
  if (error || !data) {
    return (
      <CommandList>
        <CommandEmpty>
          {<div className="p-4 text-sm">Something went wrong</div>}
        </CommandEmpty>
      </CommandList>
    );
  }

  if (data?.length == 0) {
    return (
      <CommandList>
        <CommandEmpty>
          <CommandEmpty>No results found.</CommandEmpty>
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
            className="flex items-center gap-4 p-2 cursor-pointer rounded"
          >
            <CompareSearchResultCard {...movie} />
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

const CompareAddMovieAction = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
      >
        Add Movie +
      </Button>

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        className="bg-black bg-opacity-80 flex items-center justify-center max-w-2xl"
      >
        <Command shouldFilter={false}>
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="!text-xl !font-bold text-background">
                Search Movie
              </h2>
            </div>

            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder="Type movie name..."
              className="w-full bg-zinc-800 h-auto text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <SearchResults query={value} />
          </div>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CompareAddMovieAction;
