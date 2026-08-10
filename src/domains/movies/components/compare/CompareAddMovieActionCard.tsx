"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
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
import useCompare from "@/domains/movies/hooks/useCompare";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { useSearchMovies } from "../../hooks/useMovies";
import type { TMDBMovie } from "../../types/tmdb-movie.types";

type searchResultProps = {
  query: string;
  compareId: number;
  onSelect: () => void;
};
const SearchResults = ({ query, compareId, onSelect }: searchResultProps) => {
  const { setCompareMovie } = useCompare();
  const debouncedSearchQuery: string = useDebouncedValue(query, 500);

  const { data, isLoading, error } = useSearchMovies(debouncedSearchQuery);

  const handleAddToCompare = (movie: TMDBMovie) => {
    setCompareMovie((prev) => prev.map((item) => (item.id === compareId ? { ...item, movie } : item)));
    onSelect?.();
  };

  if (isLoading) {
    return (
      <CommandList>
        <CommandEmpty className="py-6 text-center text-muted-foreground">
          <CompareSearchResultSkeletonList />
        </CommandEmpty>
      </CommandList>
    );
  }

  if (error) {
    return (
      <CommandList>
        <CommandEmpty className="p-4 text-sm text-destructive font-medium">Something went wrong</CommandEmpty>
      </CommandList>
    );
  }

  if (!debouncedSearchQuery) {
    return (
      <CommandList>
        <CommandEmpty className="p-6 text-sm text-muted-foreground text-center">
          Type a movie name to start searching...
        </CommandEmpty>
      </CommandList>
    );
  }

  if (data?.length === 0) {
    return (
      <CommandList>
        <CommandEmpty className="p-6 text-sm text-muted-foreground text-center">No results found.</CommandEmpty>
      </CommandList>
    );
  }

  return (
    <CommandList className="max-h-96 overflow-y-auto mt-2 space-y-1">
      <CommandGroup>
        {data?.map((movie) => (
          <CommandItem
            key={movie.id}
            value={movie.title}
            onSelect={() => handleAddToCompare(movie)}
            className="flex items-center gap-4 p-2 cursor-pointer rounded-lg aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors"
          >
            <CompareSearchResultCard {...movie} />
          </CommandItem>
        ))}
      </CommandGroup>
    </CommandList>
  );
};

type props = {
  onExternalOpenChange: Dispatch<SetStateAction<boolean>>;
  compareId: number;
  externalOpen: boolean;
};

const CompareAddMovieActionCard = ({ compareId, externalOpen, onExternalOpenChange }: props) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [value, setValue] = useState("");

  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setIsOpen = (open: boolean) => {
    if (onExternalOpenChange) {
      onExternalOpenChange(open);
    }
    setInternalOpen(open);
  };

  const handleOpenChange = (isOpenState: boolean) => {
    setIsOpen(isOpenState);
    if (!isOpenState) {
      setValue("");
    }
  };

  return (
    <>
      <Button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(true);
        }}
        className="bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border px-5 py-2.5 rounded-lg transition-all shadow-sm font-semibold text-sm cursor-pointer"
      >
        Select Movie
      </Button>

      <CommandDialog open={isOpen} onOpenChange={handleOpenChange}>
        <Command
          shouldFilter={false}
          className="bg-card text-card-foreground border border-border rounded-xl shadow-2xl"
        >
          <div className="p-6 w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold tracking-tight text-foreground">Search Movie for Comparison</h2>
            </div>
            <CommandInput
              value={value}
              onValueChange={setValue}
              placeholder="Type movie name..."
              className="h-8 border-input text-foreground placeholder:text-muted-foreground text-sm rounded-lg focus-visible:ring-ring"
            />
            <SearchResults query={value} compareId={compareId} onSelect={() => setIsOpen(false)} />
          </div>
        </Command>
      </CommandDialog>
    </>
  );
};

export default CompareAddMovieActionCard;
