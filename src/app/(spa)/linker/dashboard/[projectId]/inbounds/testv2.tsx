// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes
"use client";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// ─── Constants ───────────────────────────────────────────────────────────────
const INITIAL_SENTENCES = [
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

// ─── Utilities ───────────────────────────────────────────────────────────────
function normalizeUrl(url) {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// ─── Sentence Editor Panel ────────────────────────────────────────────────────
function SentenceEditorPanel({ sentence, predefinedUrl, onSave, onCancel }) {
  const [hasSelection, setHasSelection] = useState(false);
  const [existingHref, setExistingHref] = useState("");
  const [urlInputValue, setUrlInputValue] = useState(null);
  const urlInputRef = useRef(null);
  const isAutoExtending = useRef(false);

  const editor = useEditor({
    extensions: [
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
    ],
    immediatelyRender: false,
    content: sentence.html,
    autofocus: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[60px] w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border rounded-md rounded-t-none p-4 [&_a]:text-blue-500 [&_a]:p-1 [&_a]:dark:bg-blue-900 [&_a]:dark:text-blue-200 [&_a]:bg-blue-50 [&_a]:border-b [&_a]:font-medium [&_a]:border-primary [&_a]:rounded text-justify",
      },
    },
  });

  // ── Track selection & detect existing link ────────────────────────────────
  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      if (isAutoExtending.current) return;
      const { from, to } = editor.state.selection;
      const selected = from !== to;

      if (!selected) {
        setHasSelection(false);
        setExistingHref("");
        setUrlInputValue(null);
        return;
      }

      const href = editor.getAttributes("link")?.href ?? "";
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
  /* 
  useEffect(() => {
    if (urlInputValue !== null) {
      setTimeout(() => urlInputRef.current?.focus(), 0);
    }
  }, [urlInputValue]); */

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAddPredefined = useCallback(() => {
    if (!editor || !hasSelection || !predefinedUrl) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: predefinedUrl }).run();
  }, [editor, hasSelection, predefinedUrl]);

  const handleOpenUrlInput = useCallback(() => {
    setUrlInputValue(existingHref);
  }, [existingHref]);

  const handleConfirmUrl = useCallback(() => {
    if (!editor || urlInputValue === null) return;
    const normalized = normalizeUrl(urlInputValue);
    if (!normalized) return;
    editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run();
    setUrlInputValue(null);
  }, [editor, urlInputValue]);

  const handleCancelUrl = useCallback(() => {
    setUrlInputValue(null);
    editor?.chain().focus().run();
  }, [editor]);

  const handleRemoveLink = useCallback(() => {
    if (!editor || !existingHref) return;
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }, [editor, existingHref]);

  const handleSave = () => {
    if (!editor) return;
    onSave(editor.getHTML());
  };

  // ── Render ────────────────────────────────────────────────────────────────
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

        {/* Add Default Link — only rendered when predefinedUrl is provided */}
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
          onClick={handleOpenUrlInput}
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
      {urlInputValue !== null && (
        <div className="flex items-center gap-2">
          <Input
            ref={urlInputRef}
            value={urlInputValue}
            onChange={(e) => setUrlInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirmUrl();
              if (e.key === "Escape") handleCancelUrl();
            }}
            placeholder="https://example.com"
            className="h-8 text-sm max-w-xs"
          />
          <Button size="sm" onClick={handleConfirmUrl} className="h-8 px-3 text-xs">
            OK
          </Button>
          <Button variant="ghost" size="sm" onClick={handleCancelUrl} className="h-8 px-3 text-xs">
            Cancel
          </Button>
        </div>
      )}

      {/* ── Editor content ── */}
      <EditorContent editor={editor} />

      {/* ── Save / Cancel ── */}
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
function SentenceRow({ sentence, predefinedUrl, isEditing, onEdit, onSave, onCancel }) {
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
}

// ─── Main Component ───────────────────────────────────────────────────────────
// `predefinedUrl` is optional. When omitted (or falsy), the "Add Default Link"
export default function SentenceEditorv2({ predefinedUrl }) {
  const [sentences, setSentences] = useState(INITIAL_SENTENCES);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => setEditingId(id);
  const handleCancel = () => setEditingId(null);
  const handleSave = (id, newHtml) => {
    setSentences((prev) => prev.map((s) => (s.id === id ? { ...s, html: newHtml } : s)));
    setEditingId(null);
  };

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
            onSave={(html) => handleSave(sentence.id, html)}
            onCancel={handleCancel}
          />
        ))}
      </ul>
    </div>
  );
}
