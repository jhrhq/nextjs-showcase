"use client";

import Link from "@tiptap/extension-link";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Sentence {
  id: number;
  html: string;
}

interface SentenceEditorPanelProps {
  sentence: Sentence;
  predefinedUrl?: string;
  onSave: (html: string) => void;
  onCancel: () => void;
}

interface SentenceRowProps {
  sentence: Sentence;
  predefinedUrl?: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (html: string) => void;
  onCancel: () => void;
}

interface SentenceEditorV2Props {
  predefinedUrl?: string;
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

const EDITOR_LINK_CLASSES =
  "[&_a]:text-blue-500 [&_a]:p-1 [&_a]:dark:bg-blue-900 [&_a]:dark:text-blue-200 [&_a]:bg-blue-50 [&_a]:border-b [&_a]:font-medium [&_a]:border-primary [&_a]:rounded";

const STARTER_KIT_CONFIG = {
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
  link: false,
} as const;

// ─── Utilities ────────────────────────────────────────────────────────────────

function normalizeUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

function getSelectionHref(editor: Editor): string {
  return editor.getAttributes("link")?.href ?? "";
}

// ─── Hook: useSelectionState ──────────────────────────────────────────────────

function useSelectionState(editor: Editor | null) {
  const [hasSelection, setHasSelection] = useState(false);
  const [existingHref, setExistingHref] = useState("");
  const isAutoExtending = useRef(false);

  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      if (isAutoExtending.current) return;

      const { from, to } = editor.state.selection;
      if (from === to) {
        setHasSelection(false);
        setExistingHref("");
        return;
      }

      const href = getSelectionHref(editor);
      if (href) {
        isAutoExtending.current = true;
        editor.chain().extendMarkRange("link").run();
        isAutoExtending.current = false;
        setExistingHref(href);
      } else {
        setExistingHref("");
      }

      setHasSelection(true);
    };

    editor.on("selectionUpdate", updateSelection);
    editor.on("transaction", updateSelection);

    return () => {
      editor.off("selectionUpdate", updateSelection);
      editor.off("transaction", updateSelection);
    };
  }, [editor]);

  return { hasSelection, existingHref };
}

// ─── Hook: useUrlInput ────────────────────────────────────────────────────────

function useUrlInput(editor: Editor | null, existingHref: string) {
  const [urlInputValue, setUrlInputValue] = useState<string | null>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const open = useCallback(() => {
    setUrlInputValue(existingHref);
  }, [existingHref]);

  const confirm = useCallback(() => {
    if (!editor || urlInputValue === null) return;
    const normalized = normalizeUrl(urlInputValue);
    if (!normalized) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
    setUrlInputValue(null);
  }, [editor, urlInputValue]);

  const cancel = useCallback(() => {
    setUrlInputValue(null);
    editor?.chain().focus().run();
  }, [editor]);

  return { urlInputValue, setUrlInputValue, urlInputRef, open, confirm, cancel };
}

// ─── Sub-component: Toolbar ───────────────────────────────────────────────────

interface ToolbarProps {
  editor: Editor | null;
  hasSelection: boolean;
  existingHref: string;
  predefinedUrl?: string;
  onAddPredefined: () => void;
  onOpenUrlInput: () => void;
  onRemoveLink: () => void;
}

function Toolbar({
  editor,
  hasSelection,
  existingHref,
  predefinedUrl,
  onAddPredefined,
  onOpenUrlInput,
  onRemoveLink,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-1 border border-gray-200 rounded-t-md p-1 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      {/* History */}
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={!editor?.can().undo()}
        className="h-7 px-2 text-xs"
      >
        ↩ Undo
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor?.chain().focus().redo().run()}
        disabled={!editor?.can().redo()}
        className="h-7 px-2 text-xs"
      >
        Redo ↪
      </Button>

      <div className="w-px h-5 bg-gray-300 dark:bg-gray-600 mx-0.5" />

      {/* Link actions */}
      {predefinedUrl && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onAddPredefined}
          disabled={!hasSelection}
          className="h-7 px-2 text-xs"
        >
          Add Default Link
        </Button>
      )}

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onOpenUrlInput}
        disabled={!hasSelection}
        className="h-7 px-2 text-xs"
      >
        {existingHref ? "Edit Link" : "Add Link"}
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onRemoveLink}
        disabled={!existingHref}
        className="h-7 px-2 text-xs text-red-500 hover:text-red-600"
      >
        Remove Link
      </Button>
    </div>
  );
}

// ─── Sub-component: UrlInput ──────────────────────────────────────────────────

interface UrlInputRowProps {
  value: string;
  onChange: (val: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

function UrlInputRow({ value, onChange, onConfirm, onCancel, inputRef }: UrlInputRowProps) {
  return (
    <div className="flex items-center gap-2 px-1 py-1 border-x border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-none">
      <Input
        ref={inputRef}
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onConfirm();
          if (e.key === "Escape") onCancel();
        }}
        placeholder="https://example.com"
        className="h-8 text-sm max-w-xs"
      />
      <Button type="button" size="sm" className="h-8 px-3 text-xs" onClick={onConfirm}>
        OK
      </Button>
      <Button type="button" variant="ghost" size="sm" className="h-8 px-3 text-xs" onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
}

// ─── Sentence Editor Panel ────────────────────────────────────────────────────

function SentenceEditorPanel({ sentence, predefinedUrl, onSave, onCancel }: SentenceEditorPanelProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(STARTER_KIT_CONFIG),
      Link.configure({ openOnClick: false, autolink: false, linkOnPaste: false }),
    ],
    immediatelyRender: false,
    content: sentence.html,
    autofocus: false,
    editorProps: {
      attributes: {
        class: `min-h-[60px] w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border rounded-md rounded-t-none p-4 ${EDITOR_LINK_CLASSES} text-justify`,
      },
    },
  });

  const { hasSelection, existingHref } = useSelectionState(editor);
  const urlInput = useUrlInput(editor, existingHref);

  const handleAddPredefined = useCallback(() => {
    if (!editor || !hasSelection || !predefinedUrl) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: predefinedUrl }).run();
  }, [editor, hasSelection, predefinedUrl]);

  const handleRemoveLink = useCallback(() => {
    if (!editor || !existingHref) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor, existingHref]);

  const handleSave = () => {
    if (!editor) return;
    onSave(editor.getHTML());
  };

  return (
    <div className="mt-1 ">
      <Toolbar
        editor={editor}
        hasSelection={hasSelection}
        existingHref={existingHref}
        predefinedUrl={predefinedUrl}
        onAddPredefined={handleAddPredefined}
        onOpenUrlInput={urlInput.open}
        onRemoveLink={handleRemoveLink}
      />

      {urlInput.urlInputValue !== null && (
        <UrlInputRow
          value={urlInput.urlInputValue}
          onChange={urlInput.setUrlInputValue}
          onConfirm={urlInput.confirm}
          onCancel={urlInput.cancel}
          inputRef={urlInput.urlInputRef}
        />
      )}

      <EditorContent editor={editor} />

      <div className="flex justify-end gap-2 mt-2">
        <Button type="button" variant="outline" size="sm" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" size="sm" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}

// ─── Sentence Row ─────────────────────────────────────────────────────────────

function SentenceRow({ sentence, predefinedUrl, isEditing, onEdit, onSave, onCancel }: SentenceRowProps) {
  return (
    <li className="border-b border-gray-100 dark:border-gray-800 py-2">
      {isEditing ? (
        <SentenceEditorPanel sentence={sentence} predefinedUrl={predefinedUrl} onSave={onSave} onCancel={onCancel} />
      ) : (
        <div className="flex items-start justify-between gap-4">
          <span
            className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: controlled HTML from editor output
            dangerouslySetInnerHTML={{ __html: sentence.html }}
          />
          <Button type="button" variant="ghost" size="sm" className="shrink-0 text-xs" onClick={onEdit}>
            Edit
          </Button>
        </div>
      )}
    </li>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SentenceEditorV2({ predefinedUrl = "https://local.com" }: SentenceEditorV2Props) {
  const [sentences, setSentences] = useState<Sentence[]>(INITIAL_SENTENCES);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleEdit = useCallback((id: number) => setEditingId(id), []);
  const handleCancel = useCallback(() => setEditingId(null), []);

  const handleSave = useCallback((id: number, newHtml: string) => {
    setSentences((prev) => prev.map((s) => (s.id === id ? { ...s, html: newHtml } : s)));
    setEditingId(null);
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Sentence Editor</h2>
      <ul className="space-y-1">
        {sentences.map((sentence) => (
          <SentenceRow
            key={sentence.id}
            sentence={sentence}
            predefinedUrl={predefinedUrl}
            isEditing={editingId === sentence.id}
            onEdit={() => handleEdit(sentence.id)}
            onSave={(html) => handleSave(sentence.id, html)}
            onCancel={handleCancel}
          />
        ))}
      </ul>
    </div>
  );
}
