"use client";

import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading2,
  ImageIcon,
  Italic,
  Link2,
  List,
  ListOrdered,
  Loader2,
  Redo2,
  Undo2,
} from "lucide-react";
import { useRef, useState } from "react";

import { uploadContentImage } from "@/lib/content/upload-image";
import { cn } from "@/lib/utils";

import { Button } from "../ui/button";

type RichTextEditorProps = {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  className?: string;
  onChange?: (html: string) => void;
};

export function RichTextEditor({
  name,
  defaultValue = "",
  placeholder = "Soạn nội dung bài viết...",
  className,
  onChange,
}: RichTextEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [html, setHtml] = useState(defaultValue);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ HTMLAttributes: { class: "rounded-lg max-w-full h-auto" } }),
      Placeholder.configure({ placeholder }),
    ],
    content: defaultValue,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose-article min-h-[280px] max-w-none px-4 py-3 focus:outline-none",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      const nextHtml = currentEditor.getHTML();
      setHtml(nextHtml);
      onChange?.(nextHtml);
    },
  });

  async function handleImageUpload(file: File) {
    if (!editor) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const result = await uploadContentImage(formData);
    setUploading(false);

    if (!result.ok) {
      window.alert(result.message);
      return;
    }

    editor.chain().focus().setImage({ src: result.url }).run();
  }

  function setLink() {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL liên kết:", previousUrl ?? "https://");

    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  if (!editor) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-border bg-card">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-xl border border-border bg-card", className)}>
      <input type="hidden" name={name} value={html} />

      <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 p-2">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          label="In đậm"
        >
          <Bold className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          label="In nghiêng"
        >
          <Italic className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          active={editor.isActive("heading", { level: 2 })}
          label="Tiêu đề"
        >
          <Heading2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          label="Danh sách"
        >
          <List className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          label="Danh sách số"
        >
          <ListOrdered className="size-4" />
        </ToolbarButton>
        <ToolbarButton onClick={setLink} active={editor.isActive("link")} label="Liên kết">
          <Link2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => fileInputRef.current?.click()}
          active={false}
          label="Chèn ảnh"
          disabled={uploading}
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          active={false}
          label="Hoàn tác"
          disabled={!editor.can().undo()}
        >
          <Undo2 className="size-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          active={false}
          label="Làm lại"
          disabled={!editor.can().redo()}
        >
          <Redo2 className="size-4" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) void handleImageUpload(file);
          event.target.value = "";
        }}
      />
    </div>
  );
}

type ToolbarButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
  label: string;
  disabled?: boolean;
};

function ToolbarButton({ children, onClick, active, label, disabled }: ToolbarButtonProps) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
    >
      {children}
    </Button>
  );
}
