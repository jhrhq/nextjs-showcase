"use client";

import { Link, Plus, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateSiloForm {
  name: string;
  mainUrl: string;
  urlInput: string;
  urls: string[];
}

const INITIAL_FORM: CreateSiloForm = { name: "", mainUrl: "", urlInput: "", urls: [] };

export function CreateSiloForm() {
  const [form, setForm] = React.useState<CreateSiloForm>(INITIAL_FORM);

  const patch = <K extends keyof CreateSiloForm>(key: K, value: CreateSiloForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const addUrl = React.useCallback(() => {
    const trimmed = form.urlInput.trim();
    if (trimmed && !form.urls.includes(trimmed)) {
      setForm((prev) => ({ ...prev, urls: [...prev.urls, trimmed], urlInput: "" }));
    }
  }, [form.urlInput, form.urls]);

  const removeUrl = React.useCallback(
    (index: number) => setForm((prev) => ({ ...prev, urls: prev.urls.filter((_, i) => i !== index) })),
    []
  );

  const handleSubmit = () => {
    if (!form.name.trim() || !form.mainUrl.trim()) return;
    alert({
      name: form.name.trim(),
      mainUrl: form.mainUrl.trim(),
      status: "active",
      urls: form.urls,
    });
    setForm(INITIAL_FORM);
  };

  const isValid = form.name.trim().length > 0 && form.mainUrl.trim().length > 0;

  return (
    <Card className="max-w-lg w-full  p-0 overflow-hidden">
      {/* Subtle tint using theme primary — no hardcoded colour */}
      <div className="relative px-6 pt-6 pb-0">
        <CardHeader className="mb-6">
          <CardTitle className="text-xl font-bold">Create Silo</CardTitle>
          <CardDescription>Link pages into a connected internal cluster.</CardDescription>
        </CardHeader>

        <div className="space-y-5">
          {/* Silo name */}
          <div className="space-y-1.5">
            <Label
              htmlFor="silo-name"
              className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Silo Name
            </Label>
            <Input
              id="silo-name"
              value={form.name}
              onChange={(e) => patch("name", e.target.value)}
              placeholder="e.g. SEO Blog Hub"
            />
          </div>

          {/* Hub URL */}
          <div className="space-y-1.5">
            <Label
              htmlFor="hub-url"
              className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Hub URL
            </Label>
            <div className="relative">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-primary pointer-events-none" />
              <Input
                id="hub-url"
                type="url"
                value={form.mainUrl}
                onChange={(e) => patch("mainUrl", e.target.value)}
                placeholder="https://yoursite.com/main-page"
                className="pl-9 font-mono text-sm"
              />
            </div>
          </div>

          {/* Linked pages */}
          <div className="space-y-1.5">
            <Label
              htmlFor="url-input"
              className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Linked Pages
              {form.urls.length > 0 && (
                <span className="ms-2 normal-case tracking-normal text-primary font-semibold">
                  · {form.urls.length} added
                </span>
              )}
            </Label>

            <div className="flex gap-2">
              <Input
                id="url-input"
                type="url"
                value={form.urlInput}
                onChange={(e) => patch("urlInput", e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === "Enter" && (e.preventDefault(), addUrl())
                }
                placeholder="https://yoursite.com/page"
                className="flex-1 font-mono text-sm"
              />
              <Button onClick={addUrl} disabled={!form.urlInput.trim()} size="sm" className="gap-1.5">
                <Plus className="size-3.5" />
                Add
              </Button>
            </div>

            {form.urls.length > 0 && (
              <ScrollArea className="mt-2 max-h-40 rounded-xl border p-2">
                <ul className="space-y-1.5">
                  {form.urls.map((url, i) => (
                    <li key={i} className="group/item flex items-center gap-2 rounded-lg border px-3 py-2">
                      <span className="size-1.5 rounded-full bg-primary shrink-0" />
                      <span className="flex-1 truncate text-xs font-mono">{url}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeUrl(i)}
                        aria-label={`Remove ${url}`}
                        className="size-5 opacity-0 group-hover/item:opacity-100 hover:bg-transparent hover:text-destructive transition-all shrink-0"
                      >
                        <X className="size-3" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>

      <CardFooter className="flex gap-3 px-6 py-5 mt-2">
        <Button onClick={handleSubmit} disabled={!isValid} className="flex-1 gap-2">
          <Link className="size-4" />
          Create Silo
        </Button>
      </CardFooter>
    </Card>
  );
}
