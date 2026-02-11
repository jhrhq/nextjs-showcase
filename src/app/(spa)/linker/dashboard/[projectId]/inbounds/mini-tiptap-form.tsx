"use client";

import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "@/components/ui/button";

type MiniTiptapEditorProps = {
  content: string;
  onChange: (value: string) => void;
};

export function MiniTiptapEditor({ content, onChange }: MiniTiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
        codeBlock: false,
      }),
      Link.configure({
        openOnClick: false,
        autolink: false,
        linkOnPaste: false,
      }),
    ],
    content,
    onUpdate({ editor }) {
      onChange(editor.getText());
    },
    editorProps: {
      attributes: { class: "prose prose-sm max-w-none p-2 focus:outline-none" },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const addAnchor = () => {
    if (!editor.isFocused || editor.state.selection.empty) {
      alert("Select some text first to add a link.");
      return;
    }

    const previousUrl = editor.getAttributes("link").href || "";
    const url = window.prompt("Enter URL", previousUrl);
    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="rounded-md border bg-background">
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b p-1">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
        >
          Undo
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
        >
          Redo
        </Button>

        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={addAnchor}
          disabled={!editor.isFocused || editor.state.selection.empty}
        >
          Add link
        </Button>
      </div>

      {/* Editor */}
      <EditorContent editor={editor} />
    </div>
  );
}
