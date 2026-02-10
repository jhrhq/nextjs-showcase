// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes

"use client";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { fetchSentences } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/target-form/api";
import { Skeleton } from "@/components/ui/skeleton";

interface SuggestedSentenceListProps {
  /** `LinkResult.id` — used as the query key and API parameter */
  postId: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Fetches and displays the list of sentences suggested for placing an
 * internal link to a specific post. Renders skeleton placeholders while loading.
 */
export function SuggestedSentenceList({ postId }: SuggestedSentenceListProps) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["suggested-sentences", postId],
    queryFn: () => fetchSentences(postId),
    // Keep cached results alive for 5 minutes to avoid re-fetching on re-open
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <div className="space-y-2 mt-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (!sentences?.length) {
    return <p className="text-xs text-muted-foreground mt-2">No suggested sentences found for this post.</p>;
  }

  return (
    <ul className="space-y-2 mt-2">
      {sentences.map((sentence, index) => (
        <li
          key={index}
          className="flex items-start gap-2 rounded-md border bg-muted/40 px-3 py-2.5 text-sm leading-relaxed"
        >
          <ChevronRight className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden />
          <span>{sentence}</span>
        </li>
      ))}
    </ul>
  );
}

// ─── Sentence List with Inline Actions ───────────────────────────────────
export function SentenceList({ postId }) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["sentences", postId],
    queryFn: () => fetchSentences(postId),
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState<Set<number>>(new Set());

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  const handleEdit = (index: number, text: string) => {
    setEditingIndex(index);
    setDraft(text);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setDraft("");
  };

  const handleSave = (index: number) => {
    // Replace with API call if needed
    setEditingIndex(null);
    setDraft("");
  };

  const handleSubmit = (index: number) => {
    // Stub for API call (send / post / save)
    setSubmitted((prev) => new Set(prev).add(index));
  };

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
      {sentences?.map((sentence, i) => {
        const isEditing = editingIndex === i;
        const isSubmitted = submitted.has(i);

        return (
          <div key={i} className="group rounded-md border bg-muted/40 px-3 py-2.5 text-sm">
            <div className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 mt-1 text-primary shrink-0" />

              <div className="flex-1 space-y-2">
                {/* ── Sentence / Editor ── */}
                {!isEditing ? (
                  <p className="leading-relaxed">{sentence}</p>
                ) : (
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    rows={3}
                    className="w-full rounded-md border bg-background p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                )}

                {/* ── Actions ── */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  {!isEditing && !isSubmitted && (
                    <>
                      <button onClick={() => handleCopy(sentence)} className="hover:text-foreground transition">
                        Copy
                      </button>

                      <button onClick={() => handleEdit(i, sentence)} className="hover:text-foreground transition">
                        Edit
                      </button>

                      <button onClick={() => handleSubmit(i)} className="font-medium text-primary hover:underline">
                        Send
                      </button>
                    </>
                  )}

                  {isEditing && (
                    <>
                      <button onClick={() => handleSave(i)} className="font-medium text-primary hover:underline">
                        Save
                      </button>

                      <button onClick={handleCancel} className="hover:text-foreground transition">
                        Cancel
                      </button>
                    </>
                  )}

                  {isSubmitted && <span className="flex items-center gap-1 text-green-600 font-medium">✓ Sent</span>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
