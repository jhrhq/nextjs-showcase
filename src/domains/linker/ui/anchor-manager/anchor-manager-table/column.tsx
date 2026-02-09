"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const anchors = [
  { id: 1, text: "Your Bissell carpet cleaner", internal: 1, external: 0, type: "Branded Keyword" },
  {
    id: 2,
    text: "replace the motor on your Bissell carpet cleaner",
    internal: 1,
    external: 0,
    type: "Branded Keyword",
  },
  { id: 3, text: "clothes smell like pee", internal: 1, external: 0, type: "Full‑Part Match" },
  { id: 4, text: "white clothes turning pink", internal: 1, external: 0, type: "Full‑Part Match" },
  { id: 5, text: "tile cleaning tips and tricks", internal: 1, external: 0, type: "Partial Match" },
  { id: 6, text: "clean grout from tile", internal: 1, external: 0, type: "Partial Match" },
  { id: 7, text: "how to clean tile grout", internal: 1, external: 0, type: "Partial Match" },
  { id: 8, text: "cleaning tile grout benefits", internal: 1, external: 0, type: "Branded Keyword" },
];
export const columns = [
  { accessorKey: "id", header: "No" },
  { accessorKey: "text", header: "Anchor" },
  { accessorKey: "internal", header: "Internal" },
  { accessorKey: "external", header: "External" },

  {
    id: "actions",
    header: "",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
