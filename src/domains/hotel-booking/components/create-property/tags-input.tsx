import { Plus, Tag, X } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "../ui/input";

// type FormControl = Control<PropertyFormValues>;

interface TagsInputProps {
  tags: string[];
  onTagAdd: (tag: string) => void;
  onTagRemove: (tag: string) => void;
}

export function TagsInput({ tags, onTagAdd, onTagRemove }: TagsInputProps) {
  const [tagInput, setTagInput] = useState("");

  function handleAdd() {
    const trimmed = tagInput.trim();
    if (!trimmed) return;
    onTagAdd(trimmed);
    setTagInput("");
  }

  return (
    <FieldGroup className="border-b pb-6 border-zinc-200">
      <Field>
        <FieldLabel className="font-semibold text-xl">Tags</FieldLabel>
        <div className="flex gap-2">
          <Input
            id="tag-input"
            value={tagInput}
            placeholder="e.g. pet-friendly"
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            className="bg-background"
          />
          <Button type="button" variant="outline" size="icon" onClick={handleAdd}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                <Tag className="h-3 w-3" />
                {tag}
                <button
                  type="button"
                  onClick={() => onTagRemove(tag)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-muted-foreground/20"
                  aria-label={`Remove tag "${tag}"`}
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </Badge>
            ))}
          </div>
        )}
        <FieldDescription>Press Enter or + to add a tag.</FieldDescription>
      </Field>
    </FieldGroup>
  );
}
