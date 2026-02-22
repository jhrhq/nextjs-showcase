/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: false flag */

"use client";
import Link from "@tiptap/extension-link";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Sentence {
  id: number;
  html: string;
}

interface SentenceEditorPanelProps {
  sentence: Sentence;
  predefinedUrl: string | undefined;
  onSave: (html: string) => void;
  onCancel: () => void;
}

interface SentenceRowProps {
  sentence: Sentence;
  predefinedUrl: string | undefined;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (html: string) => void;
  onCancel: () => void;
}

interface SentenceEditorProps {
  predefinedUrl?: string;
}

interface EditorSelectionState {
  hasSelection: boolean;
  existingHref: string;
}

interface UrlInputControls {
  value: string | null;
  setValue: (value: string | null) => void;
  open: () => void;
  confirm: () => void;
  cancel: () => void;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const INITIAL_SENTENCES: Sentence[] = [
  { id: 1, html: "The quick brown fox jumps over the lazy dog." },
  {
    id: 2,
    html: 'Visit <a href="https://openai.com">OpenAI</a> for more information.',
  },
  {
    id: 3,
    html: 'Check out <a href="https://github.com">GitHub</a> and <a href="https://stackoverflow.com">Stack Overflow</a> for coding help.',
  },
  { id: 4, html: "Plain sentence with no links at all." },
];

const EDITOR_EXTENSIONS = [
  StarterKit.configure({
    heading: false,
    bold: false,
    italic: false,
    strike: false,
    code: false,
    codeBlock: false,
    blockquote: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    horizontalRule: false,
    hardBreak: false,
  }),
  Link.configure({
    openOnClick: false,
    autolink: false,
    linkOnPaste: false,
  }),
];

const EDITOR_PROPS = {
  attributes: {
    class:
      "min-h-[60px] w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border rounded-md rounded-t-none p-4 [&_a]:text-blue-500 [&_a]:p-1 [&_a]:dark:bg-blue-900 [&_a]:dark:text-blue-200 [&_a]:bg-blue-50 [&_a]:border-b [&_a]:font-medium [&_a]:border-primary [&_a]:rounded text-justify",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function normalizeUrl(url: unknown): string {
  if (typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  try {
    return new URL(trimmed).toString();
  } catch {
    try {
      return new URL(`https://${trimmed}`).toString();
    } catch {
      return "";
    }
  }
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useEditorSelection(editor: Editor | null): EditorSelectionState {
  const [hasSelection, setHasSelection] = useState<boolean>(false);
  const [existingHref, setExistingHref] = useState<string>("");
  const isAutoExtending = useRef<boolean>(false);

  useEffect(() => {
    if (!editor) return;

    const update = () => {
      if (isAutoExtending.current) return;

      const { from, to } = editor.state.selection;
      if (from === to) {
        setHasSelection(false);
        setExistingHref("");
        return;
      }

      const href: string = editor.getAttributes("link")?.href ?? "";
      if (href) {
        isAutoExtending.current = true;
        editor.chain().extendMarkRange("link").run();
        isAutoExtending.current = false;
      }

      setHasSelection(true);
      setExistingHref(href);
    };

    editor.on("selectionUpdate", update);
    editor.on("transaction", update);

    return () => {
      editor.off("selectionUpdate", update);
      editor.off("transaction", update);
    };
  }, [editor]);

  return { hasSelection, existingHref };
}

function useUrlInput(editor: Editor | null): UrlInputControls {
  const [value, setValue] = useState<string | null>(null);

  const open = useCallback(() => {
    if (!editor || value === null) return;
    const normalized = normalizeUrl(value);
    if (!normalized) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
    setValue(null);
  }, [editor, value]);

  const confirm = useCallback(() => {
    if (!editor || value === null) return;
    const normalized = normalizeUrl(value);
    if (!normalized) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
    setValue(null);
  }, [editor, value]);

  const cancel = useCallback(() => {
    setValue(null);
    editor?.chain().focus().run();
  }, [editor]);

  return { value, setValue, open, confirm, cancel };
}

// ─── Sentence Editor Panel ────────────────────────────────────────────────────

function SentenceEditorPanel({ sentence, predefinedUrl, onSave, onCancel }: SentenceEditorPanelProps) {
  const editor = useEditor({
    extensions: EDITOR_EXTENSIONS,
    editorProps: EDITOR_PROPS,
    immediatelyRender: false,
    content: sentence.html,
  });

  const { hasSelection, existingHref } = useEditorSelection(editor ?? null);
  const urlInput = useUrlInput(editor ?? null);

  const handleAddPredefined = useCallback(() => {
    if (!editor || !hasSelection || !predefinedUrl) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: predefinedUrl }).run();
  }, [editor, hasSelection, predefinedUrl]);

  const handleRemoveLink = useCallback(() => {
    if (!editor || !existingHref) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor, existingHref]);

  const handleSave = useCallback(() => {
    if (!editor) return;
    onSave(editor.getHTML());
  }, [editor, onSave]);

  return (
    <div className="mt-2 space-y-2">
      {/* ── Toolbar ── */}
      <div className="flex items-center gap-1 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().undo().run()}
          disabled={!editor?.can().undo()}
          className="h-7 px-2 text-xs"
        >
          ↩ Undo
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => editor?.chain().focus().redo().run()}
          disabled={!editor?.can().redo()}
          className="h-7 px-2 text-xs"
        >
          Redo ↪
        </Button>

        <div className="w-px h-4 bg-gray-200 mx-1" />

        {predefinedUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddPredefined}
            disabled={!hasSelection}
            title={`Apply default link: ${predefinedUrl}`}
            className="h-7 px-2 text-xs"
          >
            Add Default Link
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={urlInput.open}
          disabled={!hasSelection}
          className="h-7 px-2 text-xs"
        >
          {existingHref ? "Edit Link" : "Add Link"}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleRemoveLink}
          disabled={!existingHref}
          className="h-7 px-2 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 disabled:text-gray-300"
        >
          Remove Link
        </Button>
      </div>

      {/* ── Inline URL input ── */}
      {urlInput.value !== null && (
        <div className="flex items-center gap-2">
          <Input
            autoFocus
            value={urlInput.value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => urlInput.setValue(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") urlInput.confirm();
              if (e.key === "Escape") urlInput.cancel();
            }}
            placeholder="https://example.com"
            className="h-8 text-sm max-w-xs"
          />
          <Button size="sm" onClick={urlInput.confirm} className="h-8 px-3 text-xs">
            OK
          </Button>
          <Button variant="ghost" size="sm" onClick={urlInput.cancel} className="h-8 px-3 text-xs">
            Cancel
          </Button>
        </div>
      )}

      <EditorContent editor={editor} />

      <div className="flex gap-2 justify-end pt-1">
        <Button variant="ghost" size="sm" onClick={onCancel} className="h-8">
          Cancel
        </Button>
        <Button size="sm" onClick={handleSave} className="h-8">
          Save
        </Button>
      </div>
    </div>
  );
}

// ─── Sentence Row ─────────────────────────────────────────────────────────────

const SentenceRow = memo(function SentenceRow({
  sentence,
  predefinedUrl,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: SentenceRowProps) {
  return (
    <li className="py-3 border-b border-gray-100 last:border-0">
      {isEditing ? (
        <SentenceEditorPanel sentence={sentence} predefinedUrl={predefinedUrl} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div className="flex items-start gap-3">
          <p
            className="flex-1 text-sm text-gray-800 leading-relaxed [&_a]:text-blue-600 [&_a]:underline [&_a]:underline-offset-2"
            dangerouslySetInnerHTML={{ __html: sentence.html }}
          />
          <Button variant="outline" size="sm" onClick={onEdit} className="h-7 px-3 text-xs shrink-0">
            Edit
          </Button>
        </div>
      )}
    </li>
  );
});

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SentenceEditorV3({ predefinedUrl }: SentenceEditorProps) {
  const [sentences, setSentences] = useState<Sentence[]>(INITIAL_SENTENCES);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = useCallback((id: number) => setEditingId(id), []);
  const handleCancel = useCallback(() => setEditingId(null), []);

  const handleSave = useCallback((id: number, newHtml: string) => {
    setSentences((prev) => prev.map((s) => (s.id === id ? { ...s, html: newHtml } : s)));
    setEditingId(null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-lg font-semibold text-gray-900 mb-4">Sentence Editor</h1>
      <ul className="bg-white rounded-lg border border-gray-200 divide-y divide-gray-100 px-4">
        {sentences.map((sentence) => (
          <SentenceRow
            key={sentence.id}
            sentence={sentence}
            predefinedUrl={predefinedUrl}
            isEditing={editingId === sentence.id}
            onEdit={() => handleEdit(sentence.id)}
            onSave={(html: string) => handleSave(sentence.id, html)}
            onCancel={handleCancel}
          />
        ))}
      </ul>
    </div>
  );
}
