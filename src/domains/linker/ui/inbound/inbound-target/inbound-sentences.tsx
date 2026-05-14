"use client";
import { Check, ChevronRight, Copy, Edit2, FileText, Loader2, SendHorizontal } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSuggestedSentences, useSumbitSentence } from "@/domains/linker/hooks/use-projects";
import { MiniTipTapEditorPanel } from "@/domains/linker/ui/tip-tap-editor/mini-tiptap-editor-panel";
import type {
  InboundSuggestions,
  SuggestedSentencesPayloadValues,
} from "@/domains/linker/validations/inbound.validation";
import { CopyClipboard } from "@/ui/shared/copy-to-clipboard";

export function SentenceList({
  item,
  payload,
}: {
  item: InboundSuggestions;
  payload: SuggestedSentencesPayloadValues;
}) {
  const { data, isLoading, isError, error, refetch } = useGetSuggestedSentences(payload);
  const [sentSentences, setSentSentences] = React.useState<Set<string>>(new Set());
  const handleSentSentences = (id: string) => {
    setSentSentences((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
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
  if (isError) {
    return (
      <div className="p-4 border border-destructive/50 bg-destructive/10 rounded-md">
        <p className="text-sm text-destructive mb-2">
          {error instanceof Error ? error.message : "Failed to load suggestions"}
        </p>
        <Button onClick={() => refetch()} className="text-xs font-medium">
          Try again
        </Button>
      </div>
    );
  }
  if (!data || (data && data.length === 0)) {
    return (
      <Empty>
        <EmptyHeader className="flex-row">
          <EmptyMedia variant="icon">
            <FileText />
          </EmptyMedia>
          <EmptyTitle>No Suggestions Found</EmptyTitle>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <>
      {data.map((sentence) => (
        <SentenceItem
          key={sentence.id}
          sentence={sentence}
          predefinedUrl={item.url}
          payload={payload}
          onSentSentences={handleSentSentences}
          isSent={sentSentences.has(sentence.id)}
        />
      ))}
    </>
  );
}

type SentenceItemProps = {
  payload: SuggestedSentencesPayloadValues;
  sentence: { id: string; text: string };
  predefinedUrl?: string;
  isSent: boolean;
  onSentSentences: (id: string) => void;
};

export function SentenceItem({ payload, sentence, predefinedUrl, isSent, onSentSentences }: SentenceItemProps) {
  const [draft, setDraft] = React.useState(sentence.text);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const sendMutation = useSumbitSentence();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const hadleSave = (content: string) => {
    setDraft(content);
    handleCancel();
  };

  const handleOnSend = () => {
    sendMutation.mutate(
      {
        ...payload,
        sentence: {
          id: sentence.id,
          text: draft,
        },
      },
      {
        onSuccess: () => {
          onSentSentences(sentence.id);
          toast.success("Updated Successfully", {
            position: "bottom-right",
            classNames: {
              content: "flex flex-col gap-2",
            },
            style: {
              "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
          });
        },
      }
    );
  };

  if (isSent) {
    return null;
  }

  return (
    <div className="border bg-muted/40 px-3 py-2.5 text-sm">
      <div className="flex items-start gap-2">
        <ChevronRight className="mt-1 text-blue-500 shrink-0" />

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
              onCancel={handleCancel}
            />
          )}

          {!isEditing && (
            <div className="place-items-end">
              <SentenceActions
                sentence={draft}
                isSent={isSent}
                isSending={false}
                onEdit={handleEdit}
                onSend={handleOnSend}
              />
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
            {copied ? <Check /> : <Copy />}
          </Button>
        )}
      </CopyClipboard>

      <Button size="icon" variant="ghost" onClick={onEdit} disabled={isSending || isSent}>
        <Edit2 />
      </Button>

      {!isSent && (
        <Button size="icon" variant="ghost" onClick={onSend} disabled={isSending || isSent}>
          {isSending ? <Loader2 className="animate-spin" /> : <SendHorizontal />}
        </Button>
      )}

      {isSent && (
        <span className="font-medium">
          <Check className="text-green-500" /> Sent
        </span>
      )}
    </div>
  );
}
