// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes

"use client";

import Link from "@tiptap/extension-link";
import type { Editor } from "@tiptap/react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export const PREDEFINED_URL = "https://example.com";

export function useSentenceEditor(content: string) {
  return useEditor({
    content,
    extensions: [
      StarterKit.configure({
        heading: false,
        bold: false,
        italic: false,
        strike: false,
        code: false,
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
  });
}

export function SentenceToolbar({ editor }: { editor: Editor }) {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [url, setUrl] = useState("");
  const isAutoExtending = useRef(false);

  const hasSelection = editor.state.selection.from !== editor.state.selection.to;

  const linkAttrs = editor.getAttributes("link");
  const isOnLink = !!linkAttrs.href;

  // 🔁 Auto-expand selection when cursor is on a link
  useEffect(() => {
    if (!editor) return;

    const handler = () => {
      if (isAutoExtending.current) return;

      const attrs = editor.getAttributes("link");
      if (!attrs.href) return;

      isAutoExtending.current = true;
      editor.chain().extendMarkRange("link").run();

      requestAnimationFrame(() => {
        isAutoExtending.current = false;
      });
    };

    editor.on("selectionUpdate", handler);
    return () => editor.off("selectionUpdate", handler);
  }, [editor]);

  function normalizeUrl(value: string) {
    if (!/^https?:\/\//i.test(value)) {
      return `https://${value}`;
    }
    return value;
  }

  function confirmLink() {
    if (!url) return;

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: normalizeUrl(url) })
      .run();

    setShowLinkInput(false);
    setUrl("");
  }

  function removeLink() {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
  }

  return (
    <Card>
      <CardContent className="space-y-3 pt-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            Undo
          </Button>

          <Button
            variant="secondary"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            Redo
          </Button>

          <Button
            disabled={!hasSelection}
            onClick={() => editor.chain().focus().setLink({ href: PREDEFINED_URL }).run()}
          >
            Add Default Link
          </Button>

          <Button
            disabled={!hasSelection}
            onClick={() => {
              setUrl(isOnLink ? linkAttrs.href : "");
              setShowLinkInput(true);
            }}
          >
            {isOnLink ? "Edit Link" : "Add Link"}
          </Button>

          <Button variant="destructive" disabled={!isOnLink} onClick={removeLink}>
            Remove Link
          </Button>
        </div>

        {/* Inline URL input */}
        {showLinkInput && (
          <div className="flex gap-2">
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") confirmLink();
                if (e.key === "Escape") {
                  setShowLinkInput(false);
                  setUrl("");
                }
              }}
              placeholder="https://..."
            />
            <Button onClick={confirmLink}>Confirm</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function EditableSentence({ html, onSave }: { html: string; onSave: (html: string) => void }) {
  const editor = useSentenceEditor(html);
  if (!editor) return null;

  return (
    <div className="space-y-2">
      <SentenceToolbar editor={editor} />
      <Card>
        <CardContent className="pt-4">
          <EditorContent editor={editor} />
        </CardContent>
        <CardFooter className="justify-end">
          <Button onClick={() => onSave(editor.getHTML())}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export function SentenceList({ sentences }: { sentences: string[] }) {
  const [data, setData] = useState(sentences);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {data.map((html, i) => (
        <Card key={i}>
          <CardContent className="pt-4 space-y-2">
            {editingIndex === i ? (
              <EditableSentence
                html={html}
                onSave={(updated) => {
                  const next = [...data];
                  next[i] = updated;
                  setData(next);
                  setEditingIndex(null);
                }}
              />
            ) : (
              <>
                <div dangerouslySetInnerHTML={{ __html: html }} />
                <Button variant="outline" onClick={() => setEditingIndex(i)}>
                  Edit
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function NotesManager() {
  const [notes, setNotes] = useState<string[]>([
    "<p>My first note with a <a href='https://example.com'>link</a>.</p>",
    "<p>Another note without a link.</p>",
  ]);

  const [newNote, setNewNote] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([...notes, `<p>${newNote}</p>`]);
    setNewNote("");
  };

  return (
    <div className="space-y-6">
      {/* Add new note */}
      <Card>
        <CardContent className="space-y-2">
          <Input placeholder="Write a new note..." value={newNote} onChange={(e) => setNewNote(e.target.value)} />
          <Button onClick={addNote}>Add Note</Button>
        </CardContent>
      </Card>

      {/* List of notes */}
      {notes.map((note, index) => (
        <Card key={index}>
          <CardContent className="space-y-2">
            {editingIndex === index ? (
              <EditableSentence
                html={note}
                onSave={(updatedHtml) => {
                  const updatedNotes = [...notes];
                  updatedNotes[index] = updatedHtml;
                  setNotes(updatedNotes);
                  setEditingIndex(null);
                }}
              />
            ) : (
              <>
                <div className="prose" dangerouslySetInnerHTML={{ __html: note }} />
                <Button variant="outline" onClick={() => setEditingIndex(index)}>
                  Edit Note
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
