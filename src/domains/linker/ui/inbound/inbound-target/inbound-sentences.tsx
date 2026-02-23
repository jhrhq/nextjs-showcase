// @ts-nocheck
/** biome-ignore-all lint/correctness/noUnusedVariables: false flag */

import { useQuery } from "@tanstack/react-query";
import { Check, ChevronRight, Copy, Edit2, Loader2, SendHorizontal } from "lucide-react";
import React from "react";
import { MiniTiptapEditor } from "@/app/(spa)/linker/dashboard/[projectId]/inbounds/mini-tiptap-form";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CopyClipboard } from "@/ui/shared/copy-to-clipboard";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

// ─── Sentence List
export function SentenceList({ postId }: { postId: string }) {
  const { data: sentences, isLoading } = useQuery({
    queryKey: ["sentences", postId],
    queryFn: () => fetchSentences(postId),
  });

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [draft, setDraft] = React.useState("");
  const [sentIndexes, setSentIndexes] = React.useState<Set<number>>(new Set());
  const [sendingIndex, setSendingIndex] = React.useState<number | null>(null);

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
      {sentences?.map((sentence, index) => (
        <SentenceItem
          key={index}
          sentence={sentence}
          isEditing={editingIndex === index}
          isSent={sentIndexes.has(index)}
          // isSending={1 === index}
          isSending={false}
          draft={draft}
          onEdit={() => {
            setEditingIndex(index);
            setDraft(sentence);
          }}
          onCancel={() => {
            setEditingIndex(null);
            setDraft("");
          }}
          onDraftChange={setDraft}
          onSave={() => {
            setEditingIndex(null);
          }}
          onSend={() =>
            sendMutation.mutate({
              index,
              content: editingIndex === index ? draft : sentence,
            })
          }
        />
      ))}
    </div>
  );
}

type SentenceItemProps = {
  sentence: string;
  draft: string;
  isEditing: boolean;
  isSent: boolean;
  isSending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onSend: () => void;
  onDraftChange: (val: string) => void;
};

export function SentenceItem({
  sentence,
  draft,
  isEditing,
  isSent,
  isSending,
  onEdit,
  onCancel,
  onSave,
  onSend,
  onDraftChange,
}: SentenceItemProps) {
  return (
    <div className="rounded-md border bg-muted/40 px-3 py-2.5 text-sm">
      <div className="flex items-start gap-2">
        <ChevronRight className="mt-1 text-primary shrink-0" />

        <div className="flex-1 space-y-2">
          {!isEditing ? (
            <p className="leading-relaxed">{sentence}</p>
          ) : (
            <MiniTiptapEditor content={draft} onChange={onDraftChange} />
          )}

          <SentenceActions
            sentence={sentence}
            isEditing={isEditing}
            isSent={isSent}
            isSending={isSending}
            onEdit={onEdit}
            onCancel={onCancel}
            onSave={onSave}
            onSend={onSend}
          />
        </div>
      </div>
    </div>
  );
}

type SentenceActionsProps = {
  sentence: string;
  isEditing: boolean;
  isSent: boolean;
  isSending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onSend: () => void;
};

export function SentenceActions({
  sentence,
  isEditing,
  isSent,
  isSending,
  onEdit,
  onCancel,
  onSave,
  onSend,
}: SentenceActionsProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <CopyClipboard value={sentence} timeout={2000}>
        {({ copied, copy }) => (
          <Button size="icon" variant="ghost" onClick={copy}>
            {copied ? <Check className="text-green-500" /> : <Copy />}
          </Button>
        )}
      </CopyClipboard>

      {!isEditing && !isSent && (
        <>
          <Button size="icon" variant="ghost" onClick={onEdit} disabled={isSending}>
            <Edit2 />
          </Button>

          <Button size="icon" variant="ghost" onClick={onSend} disabled={isSending}>
            {isSending ? <Loader2 className="animate-spin" /> : <SendHorizontal />}
          </Button>
        </>
      )}

      {isEditing && (
        <>
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={onSave}
            className="font-medium text-primary hover:underline"
            disabled={isSending}
          >
            Save
          </Button>
          <Button size={"icon"} variant={"ghost"} onClick={onCancel} disabled={isSending}>
            Cancel
          </Button>
        </>
      )}

      {isSent && <span className="font-medium text-green-600">✓ Sent</span>}
    </div>
  );
}
