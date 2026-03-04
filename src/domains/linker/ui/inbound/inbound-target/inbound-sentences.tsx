// @ts-nocheck
/** biome-ignore-all lint/correctness/noUnusedVariables: false flag */
"use client";
import { Check, ChevronRight, Copy, Edit2, Loader2, SendHorizontal } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGenerateSentenceSuggestions } from "@/domains/linker/hooks/use-projects";
import { MiniTipTapEditorPanel } from "@/domains/linker/ui/tip-tap-editor/mini-tiptap-editor-panel";
import type {
  GenerateSentenceSuggestionsRequest,
  InboundSuggestions,
} from "@/domains/linker/validations/inbound.validation";
import { CopyClipboard } from "@/ui/shared/copy-to-clipboard";

export function SentenceList({
  // item,
  payload,
}: {
  item: InboundSuggestions;
  payload: GenerateSentenceSuggestionsRequest;
}) {
  const { data, isLoading } = useGenerateSentenceSuggestions(payload);
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [sentIndexes, setSentIndexes] = React.useState<Set<number>>(new Set());
  const [sendingIndex, setSendingIndex] = React.useState<number | null>(null);
  console.log(data);
  const handleEdit = (index: number) => {
    setEditingIndex(index);
  };

  const handleOnSave = () => {
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
  };
  const handleOnSend = (index: number) => {
    // TODO
    /** mutation functionality
     * set projectId
     * set content
     * set others necessary...
     */
    sendMutation.mutate(
      {
        index,
        content: editingIndex === index ? draft : sentence,
      },
      {
        onSuccess: () => {
          setSentIndexes((prev) => {
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        },
      }
    );
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
    <>
      {data?.data.map((sentence, index) => (
        <SentenceItem
          key={index}
          sentence={sentence}
          isEditing={editingIndex === index}
          isSent={sentIndexes.has(index)}
          // isSending={1 === index}
          isSending={false}
          onEdit={() => handleEdit(index)}
          onSave={handleOnSave}
          onCancel={handleCancel}
          onSend={() => handleOnSend(index)}
        />
      ))}
    </>
  );
}

type SentenceItemProps = {
  sentence: string;
  predefinedUrl: string | null;
  isEditing: boolean;
  isSent: boolean;
  isSending: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onSave: () => void;
  onSend: () => void;
};

export function SentenceItem({
  sentence,
  predefinedUrl,
  isEditing,
  isSent,
  isSending,
  onEdit,
  onCancel,
  onSave,
  onSend,
}: SentenceItemProps) {
  const [draft, setDraft] = React.useState(sentence);
  const hadleSave = (content: string) => {
    onSave();
    setDraft(content);
  };
  return (
    <div className="border bg-muted/40 px-3 py-2.5 text-sm">
      <div className="flex items-start gap-2">
        <ChevronRight className="mt-1 text-primary shrink-0" />

        <div className="flex-1 space-y-2">
          {!isEditing ? (
            <div
              className="leading-relaxed [&_a]:text-blue-600 [&_a]:underline"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized
              dangerouslySetInnerHTML={{ __html: draft }}
            />
          ) : (
            <MiniTipTapEditorPanel
              content={draft}
              predefinedUrl={predefinedUrl}
              onSave={hadleSave}
              onCancel={onCancel}
            />
          )}
          {!isEditing && (
            <div className="place-items-end">
              <SentenceActions sentence={draft} isSent={isSent} isSending={isSending} onEdit={onEdit} onSend={onSend} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type SentenceActionsProps = {
  sentence: string;
  isSent: boolean;
  isSending: boolean;
  onEdit: () => void;
  onSend: () => void;
};

export function SentenceActions({ sentence, isSent, isSending, onEdit, onSend }: SentenceActionsProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <CopyClipboard value={sentence} timeout={2000}>
        {({ copied, copy }) => (
          <Button size="icon" variant="ghost" onClick={copy}>
            {copied ? <Check className="text-green-500" /> : <Copy />}
          </Button>
        )}
      </CopyClipboard>

      <Button size="icon" variant="ghost" onClick={onEdit} disabled={isSending || isSent}>
        <Edit2 />
      </Button>

      <Button size="icon" variant="ghost" onClick={onSend} disabled={isSending || isSent}>
        {isSending ? <Loader2 className="animate-spin" /> : <SendHorizontal />}
      </Button>

      {isSent && (
        <span className="font-medium text-green-600">
          <Check /> Sent
        </span>
      )}
    </div>
  );
}
