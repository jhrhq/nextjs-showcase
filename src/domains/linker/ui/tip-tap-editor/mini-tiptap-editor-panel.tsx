"use client";

import Link from "@tiptap/extension-link";
import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SentenceEditorPanelProps {
  content: string;
  predefinedUrl?: string;
  onSave: (html: string) => void;
  onCancel: () => void;
}

const EDITOR_LINK_CLASSES =
  "min-h-[60px] w-full px-3 py-2 text-sm rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent border rounded-md rounded-t-none p-4 text-justify [&_a]:text-blue-500 [&_a]:p-1 [&_a]:dark:bg-blue-900 [&_a]:dark:text-blue-200 [&_a]:bg-blue-50 [&_a]:border-b [&_a]:font-medium [&_a]:border-primary [&_a]:rounded";

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

function normalizeUrl(input: string): string {
  if (!input) return "";

  const trimmed = input.trim();
  if (!trimmed) return "";

  const candidate = trimmed.startsWith("//")
    ? `https:${trimmed}`
    : trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  try {
    const url = new URL(candidate);
    /* url.protocol = "https:"; // enforce HTTPS */
    return url.toString();
  } catch {
    return "";
  }
}

function getSelectionHref(editor: Editor): string {
  return editor.getAttributes("link")?.href ?? "";
}

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
        type="text"
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

export function MiniTipTapEditorPanel({ content, predefinedUrl, onSave, onCancel }: SentenceEditorPanelProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(STARTER_KIT_CONFIG),
      Link.configure({ openOnClick: false, autolink: false, linkOnPaste: false }),
    ],
    immediatelyRender: false,
    content,
    editorProps: {
      attributes: {
        class: EDITOR_LINK_CLASSES,
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
