// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes

"use client";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { ArrowDownToLine, ArrowUpFromLine, ChevronRight, ExternalLink, FileText, Link2, Loader2 } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup } from "@/components/ui/field";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FormError from "@/ui/shared/auth-errro-alert";
import { FormFieldWrapper } from "@/ui/shared/form-field-wrapper";

// ─── Mock API ─────────────────────────────────────────────────────────────────

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ALL_SIDEBAR_POSTS = Array.from({ length: 40 }, (_, i) => {
  const titles = [
    "Why Does My Bissell Carpet Cleaner Start Smoking?",
    "How to Clean Vacuum Filter?",
    "Why Does Persil Smell Like Vomit?",
    "Advantages and Disadvantages of Wet and Dry Vacuum Cleaner",
    "Best Carpet Cleaners for Pet Hair 2024",
    "How to Remove Stubborn Carpet Stains",
    "Dyson vs Bissell: Which Is Better?",
    "Steam Cleaning vs Dry Cleaning Carpets",
    "How Often Should You Vacuum Your Home?",
    "Top Robot Vacuums Reviewed",
  ];
  const slugs = [
    "why-does-my-bissell-carpet-cleaner-start-smoking",
    "how-to-clean-vacuum-filter",
    "why-does-persil-smell-like-vomit",
    "advantages-disadvantages-wet-dry-vacuum-cleaner",
    "best-carpet-cleaners-for-pet-hair",
    "how-to-remove-stubborn-carpet-stains",
    "dyson-vs-bissell",
    "steam-cleaning-vs-dry-cleaning",
    "how-often-should-you-vacuum",
    "top-robot-vacuums-reviewed",
  ];
  return {
    id: i + 1,
    title: titles[i % 10],
    slug: `https://cleaningtuts.com/${slugs[i % 10]}/`,
  };
});

async function fetchSidebarPage({ pageParam = 1 }) {
  await sleep(700);
  const PER_PAGE = 8;
  const start = (pageParam - 1) * PER_PAGE;
  const items = ALL_SIDEBAR_POSTS.slice(start, start + PER_PAGE);
  const nextPage = start + PER_PAGE < ALL_SIDEBAR_POSTS.length ? pageParam + 1 : undefined;
  return { items, nextPage };
}

async function fetchLinkResults() {
  await sleep(1200);
  return [
    {
      id: "1",
      title: "Why Does My Bissell Carpet Cleaner Keep Catching On Carpet",
      slug: "/why-does-my-bissell-carpet-cleaner-keep-catching-on-carpet/",
      score: 76,
      clicks: 0,
      impressions: 271,
      position: 4.0,
    },
    {
      id: "2",
      title: "How to Deep Clean Your Bissell ProHeat 2X",
      slug: "/how-to-deep-clean-bissell-proheat-2x/",
      score: 68,
      clicks: 12,
      impressions: 540,
      position: 6.2,
    },
    {
      id: "3",
      title: "Bissell CrossWave vs Symphony: Full Comparison",
      slug: "/bissell-crosswave-vs-symphony/",
      score: 59,
      clicks: 34,
      impressions: 820,
      position: 8.1,
    },
    {
      id: "4",
      title: "Why Is My Carpet Cleaner Leaving Residue?",
      slug: "/why-is-my-carpet-cleaner-leaving-residue/",
      score: 51,
      clicks: 5,
      impressions: 312,
      position: 11.4,
    },
  ];
}

async function fetchSentences(postId: string) {
  await sleep(800);
  const map = {
    "1": [
      "We've outlined some of the most common reasons why your Bissell cleaner might be catching on your carpet and ways to prevent it from happening.",
      "Let's start with the common reasons concerning the machine why your Bissell carpet cleaner might catch on your carpet.",
      "If your Bissell carpet cleaner keeps catching on the carpet, it is likely due to the roller not being placed properly.",
      "There are a few things that you can do to prevent your Bissell carpet cleaner from catching on the carpet.",
      "If you're using ultra-plush or ultra-soft carpets, that may be why your Bissell vacuum is failing to clean smoothly.",
    ],
    "2": [
      "Regular maintenance of your ProHeat 2X extends its lifespan significantly.",
      "The brush roll is the most commonly clogged component and should be checked monthly.",
      "After every use, empty the dirty water tank to prevent odors and bacterial growth.",
    ],
    "3": [
      "The CrossWave handles hard floors and area rugs while the Symphony focuses purely on steam cleaning.",
      "If you have pets, the CrossWave's dual-action brush roll gives it a notable edge.",
      "Both models are priced similarly, making the decision come down to your floor type.",
    ],
    "4": [
      "Residue is often caused by using too much cleaning solution in the water tank.",
      "Always dilute cleaning formulas according to the manufacturer's instructions.",
      "Running a clean water pass after cleaning helps remove any leftover soap residue.",
    ],
  };
  return map[postId] ?? [];
}

// ─── Sentence List ────────────────────────────────────────────────────────────
/* function SentenceList({ postId }: { postId: string }) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["sentences", postId],
    queryFn: () => fetchSentences(postId),
  });

  if (isLoading) {
    return (
      <div className="space-y-2 mt-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-2">
      {sentences?.map((sentence, i) => (
        <div
          key={i}
          className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2.5 text-sm leading-relaxed"
        >
          <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" />
          <span>{sentence}</span>
        </div>
      ))}
    </div>
  );
} */

export function SentenceList({ postId }: { postId: string }) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["sentences", postId],
    queryFn: () => fetchSentences(postId),
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sentences?.map((sentence, index) => {
        const isEditing = editingIndex === index;
        const isSent = submitted.has(index);

        return (
          <div key={index} className="group rounded-md border bg-muted/40 px-3 py-2.5 text-sm">
            <div className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />

              <div className="flex-1 space-y-2">
                {/* Text / Editor */}
                {!isEditing ? (
                  <p className="leading-relaxed">{sentence}</p>
                ) : (
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border bg-background p-2 text-sm resize-none focus:ring-2 focus:ring-primary"
                  />
                )}

                {/* Actions */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {!isEditing && !isSent && (
                    <>
                      <button onClick={() => copyToClipboard(sentence)} className="hover:text-foreground">
                        Copy
                      </button>

                      <button
                        onClick={() => {
                          setEditingIndex(index);
                          setDraft(sentence);
                        }}
                        className="hover:text-foreground"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => setSubmitted((prev) => new Set(prev).add(index))}
                        className="font-medium text-primary hover:underline"
                      >
                        Send
                      </button>
                    </>
                  )}

                  {isEditing && (
                    <>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="font-medium text-primary hover:underline"
                      >
                        Save
                      </button>

                      <button onClick={() => setEditingIndex(null)} className="hover:text-foreground">
                        Cancel
                      </button>
                    </>
                  )}

                  {isSent && <span className="font-medium text-green-600">✓ Sent</span>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Results Accordion with Decision Layer ───────────────────────────────

// mock API already exists
// fetchLinkResults(url)

export function ResultsAccordion({ url }: { url: string }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const { data: results, isLoading } = useQuery({
    queryKey: ["link-results", url],
    queryFn: () => fetchLinkResults(url),
    enabled: !!url,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!results?.length) {
    return (
      <Card>
        <CardContent className="py-12 text-center text-sm text-muted-foreground">
          No link opportunities found.
        </CardContent>
      </Card>
    );
  }

  const recommended = results.slice(0, 3);
  const others = results.slice(3);

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            Link Suggestions
          </CardTitle>
          <Badge variant="secondary">{results.length} found</Badge>
        </div>
        <p className="text-xs text-muted-foreground">Recommended links are ranked by relevance and internal signals.</p>
      </CardHeader>

      <Separator />

      <CardContent className="p-4 space-y-6">
        {/* Recommended */}
        <section>
          <h3 className="text-sm font-semibold mb-2">⭐ Recommended opportunities</h3>

          <div className="space-y-2">
            {recommended.map((item) => (
              <Card key={item.id} className="border-primary/40 bg-primary/5">
                <CardContent className="p-4 space-y-3">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-full border bg-background text-sm font-bold">
                      {item.score}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground break-all">{item.slug}</p>

                      <div className="flex gap-2 mt-1 text-xs">
                        <Badge variant="outline">{item.clicks} clicks</Badge>
                        <Badge variant="outline">{item.impressions} impressions</Badge>
                        <Badge variant="outline">Position {item.position}</Badge>
                      </div>
                    </div>
                  </div>

                  <SentenceList postId={item.id} />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Others */}
        {others.length > 0 && (
          <Accordion type="single" collapsible>
            <AccordionItem value="more">
              <AccordionTrigger>More opportunities ({others.length})</AccordionTrigger>

              <AccordionContent>
                <Accordion type="single" collapsible value={openItem} onValueChange={setOpenItem}>
                  {others.map((item) => (
                    <AccordionItem key={item.id} value={item.id}>
                      <AccordionTrigger className="py-3">
                        <div className="flex gap-3 text-left">
                          <div className="w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold">
                            {item.score}
                          </div>
                          <span className="text-sm font-medium line-clamp-1">{item.title}</span>
                        </div>
                      </AccordionTrigger>

                      <AccordionContent>
                        <div className="pl-11 space-y-2">
                          <p className="text-xs text-muted-foreground break-all">{item.slug}</p>

                          <SentenceList postId={item.id} />
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// ─── Sidebar ─────────────────────────────────────────────────────────────

// mock API already exists
// fetchSidebarPage()

export function Sidebar({ onSelectUrl }: { onSelectUrl: (url: string) => void }) {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["sidebar-posts"],
    queryFn: fetchSidebarPage,
    getNextPageParam: (last) => last.nextPage,
    initialPageParam: 1,
  });

  const posts = data?.pages.flatMap((p) => p.items) ?? [];

  const onIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  React.useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.1,
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [onIntersect]);

  return (
    <aside className="w-72 border-l bg-background flex flex-col">
      <header className="p-4 border-b space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-[10px]">
            Post
          </Badge>
          <span className="text-sm font-semibold truncate flex-1">Select a post</span>
          <ExternalLink className="w-4 h-4 text-muted-foreground" />
        </div>

        <Tabs defaultValue="orphans">
          <TabsList className="w-full">
            <TabsTrigger value="orphans" className="flex-1 text-xs">
              Orphans
            </TabsTrigger>
            <TabsTrigger value="search" className="flex-1 text-xs">
              Search
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {isLoading &&
            Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-20 w-full rounded-lg" />)}

          {!isLoading &&
            posts.map((post) => (
              <Card
                key={post.id}
                className="cursor-pointer hover:border-primary"
                onClick={() => onSelectUrl(post.slug)}
              >
                <CardContent className="p-3 space-y-1">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="text-[10px]">
                      Post
                    </Badge>

                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => e.stopPropagation()}>
                      ✕
                    </Button>
                  </div>

                  <p className="text-sm font-medium line-clamp-2">{post.title}</p>

                  <p className="text-[11px] text-muted-foreground truncate">{post.slug}</p>
                </CardContent>
              </Card>
            ))}

          <div ref={loaderRef} className="flex justify-center py-3 h-10">
            {isFetchingNextPage && <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function InternalLinkBuilderPageOne() {
  const [submittedUrl, setSubmittedUrl] = useState(null);
  const submitFnRef = useRef(null);

  const form = useForm({
    defaultValues: { url: "" },
  });

  const onSubmit = (data) => {
    setSubmittedUrl(data.url);
  };

  // Called when a sidebar card is clicked
  const handleSidebarSelect = React.useCallback(
    (url) => {
      form.setValue("url", url);
      // Trigger validation + submit on next tick
      setTimeout(() => {
        form.handleSubmit(onSubmit)();
      }, 0);
    },
    [form]
  );

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Main area ── */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-6 space-y-6">
          {/* Page heading */}
          <div>
            <h1 className="text-xl font-bold tracking-tight">Internal Link Builder</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter a URL or click a post from the sidebar to find linking opportunities.
            </p>
          </div>

          {/* ── URL Form ── */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Target Content URL</CardTitle>
            </CardHeader>
            <CardContent>
              <form id="signin" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
                <FieldGroup>
                  <FormFieldWrapper
                    control={form.control}
                    label="Target Content URL"
                    type="text"
                    name="url"
                    placeholder="https://example.com/best-interlinking-tool"
                    autoComplete="off"
                    required={true}
                  />
                </FieldGroup>
                {/* General Error Alert */}
                <FormError error={form.formState.errors.root?.message} />
                <Field orientation="horizontal">
                  <Button form="signin" type="submit">
                    {/* {loading ? (
                      <>
                        <Spinner />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )} */}
                    submit
                  </Button>{" "}
                </Field>
              </form>
            </CardContent>
          </Card>

          {/* ── Results (shown after submit) ── */}
          {submittedUrl && (
            <Tabs defaultValue="outbound">
              <TabsList>
                <TabsTrigger value="inbound" className="gap-1.5">
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  Inbound Links (0)
                </TabsTrigger>
                <TabsTrigger value="outbound" className="gap-1.5">
                  <ArrowUpFromLine className="w-3.5 h-3.5" />
                  Outbound Links (2)
                </TabsTrigger>
                <TabsTrigger value="external" className="gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5" />
                  External Links (0)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="inbound" className="mt-4">
                <Card>
                  <CardContent className="py-12 text-center text-sm text-muted-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No Inbound Links Found
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="outbound" className="mt-4">
                <ResultsAccordion url={submittedUrl} />
              </TabsContent>

              <TabsContent value="external" className="mt-4">
                <Card>
                  <CardContent className="py-12 text-center text-sm text-muted-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
                    No External Links Found
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* ── Sidebar ── */}
      <Sidebar onSelectUrl={handleSidebarSelect} />
    </div>
  );
}
