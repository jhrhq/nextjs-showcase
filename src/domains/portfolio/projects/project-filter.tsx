"use client";

import { Check, ChevronDown, Filter, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { ProjectTechnology } from "./types";

interface ProjectFilterProps {
  selected: ProjectTechnology[];
  onToggle: (technology: ProjectTechnology) => void;
  onClear: () => void;
}

const technologyGroups = [
  {
    label: "Framework",
    technologies: ["Next.js", "React", "Vanilla JS"],
  },

  {
    label: "Language",
    technologies: ["TypeScript", "JavaScript"],
  },

  {
    label: "Data & API",
    technologies: ["Database", "API"],
  },

  {
    label: "TanStack",
    technologies: ["TanStack Query", "TanStack Table"],
  },

  {
    label: "Styling",
    technologies: ["CSS", "TailwindCSS", "Bootstrap", "SCSS"],
  },
] satisfies {
  label: string;
  technologies: ProjectTechnology[];
}[];

export function ProjectFilter({ selected, onToggle, onClear }: ProjectFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="
              h-10
              rounded-full
              border-border
              px-4
              shadow-none
            "
          >
            <Filter className="mr-2 size-3.5" />
            Filter
            {selected.length > 0 && (
              <span
                className="
                  ml-2
                  flex
                  size-5
                  items-center
                  justify-center
                  rounded-full
                  bg-foreground
                  text-[10px]
                  font-medium
                  text-background
                "
              >
                {selected.length}
              </span>
            )}
            <ChevronDown className="ml-2 size-3.5 text-muted-foreground" />
          </Button>
        </PopoverTrigger>

        <PopoverContent align="end" className="w-75 overflow-hidden rounded-2xl p-0">
          <Command>
            <CommandInput placeholder="Search technologies..." />

            <CommandList className="max-h-105">
              <CommandEmpty>No technology found.</CommandEmpty>

              {technologyGroups.map((group) => (
                <CommandGroup key={group.label} heading={group.label}>
                  {group.technologies.map((technology) => {
                    const isSelected = selected.includes(technology);

                    return (
                      <CommandItem
                        key={technology}
                        value={technology}
                        onSelect={() => onToggle(technology)}
                        className="cursor-pointer"
                      >
                        <span
                          className={[
                            "mr-2 flex size-4 items-center justify-center rounded-sm border",
                            isSelected ? "border-foreground bg-foreground text-background" : "border-border",
                          ].join(" ")}
                        >
                          {isSelected && <Check className="size-3" />}
                        </span>

                        {technology}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ))}
            </CommandList>

            {selected.length > 0 && (
              <div className="border-t border-border p-2">
                <Button variant="ghost" size="sm" onClick={onClear} className="h-8 w-full text-xs">
                  <X className="mr-1.5 size-3.5" />
                  Clear filters
                </Button>
              </div>
            )}
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
