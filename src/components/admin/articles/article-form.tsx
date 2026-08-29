"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  createArticle,
  deleteArticle,
  initialArticleActionState,
  updateArticle,
  type ArticleActionState,
} from "@/app/admin/(protected)/articles/actions";
import { ArticleBodyPreview } from "@/components/admin/articles/article-body-preview";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CONTENT_CATEGORIES } from "@/lib/content/categories";
import type { ContentCategory } from "@/lib/content/categories";
import { cn } from "@/lib/utils";
import { slugifyTitle } from "@/lib/articles/slug";
import type { Article, PublicationStatus } from "@/types/database";

type ArticleFormProps = {
  mode: "create" | "edit";
  article?: Article;
};

type ContentMode = "edit" | "preview";

export function ArticleForm({ mode, article }: ArticleFormProps) {
  const boundUpdateAction =
    mode === "edit" && article
      ? updateArticle.bind(null, article.id)
      : createArticle;

  const [state, formAction, pending] = useActionState(
    boundUpdateAction,
    initialArticleActionState,
  );

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(article?.slug));
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [bodyHtml, setBodyHtml] = useState(article?.body ?? "");
  const [category, setCategory] = useState<ContentCategory | "">(article?.category ?? "");
  const [status, setStatus] = useState<PublicationStatus>(article?.status ?? "draft");
  const [contentMode, setContentMode] = useState<ContentMode>("edit");
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    article?.cover_image_url ?? null,
  );
  const coverBlobRef = useRef<string | null>(null);

  useEffect(() => {
    return () => {
      if (coverBlobRef.current) {
        URL.revokeObjectURL(coverBlobRef.current);
      }
    };
  }, []);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugifyTitle(value));
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Tiêu đề</Label>
          <Input
            id="title"
            name="title"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            required
            disabled={pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug (URL)</Label>
          <Input
            id="slug"
            name="slug"
            value={slug}
            onChange={(event) => {
              setSlugTouched(true);
              setSlug(event.target.value);
            }}
            required
            disabled={pending}
            placeholder="vi-du-bai-viet"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Danh mục</Label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(event) => setCategory(event.target.value as ContentCategory | "")}
            disabled={pending}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="">Chọn danh mục</option>
            {CONTENT_CATEGORIES.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="isFeatured"
              value="true"
              defaultChecked={article?.is_featured}
              disabled={pending}
              className="size-4 rounded border-input"
            />
            Bài viết nổi bật (hiển thị trên đầu /tin-tuc)
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Mô tả ngắn</Label>
        <textarea
          id="excerpt"
          name="excerpt"
          value={excerpt}
          onChange={(event) => setExcerpt(event.target.value)}
          disabled={pending}
          rows={3}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
          placeholder="Tóm tắt hiển thị trên danh sách tin tức"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Ảnh bìa (tối đa 2MB)</Label>
        {coverPreviewUrl ? (
          <div className="relative mb-2 aspect-[16/9] max-w-md overflow-hidden rounded-lg border border-border">
            <Image
              src={coverPreviewUrl}
              alt=""
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        ) : null}
        <input type="hidden" name="coverImageUrl" value={article?.cover_image_url ?? ""} />
        <Input
          id="coverImage"
          name="coverImage"
          type="file"
          accept="image/*"
          disabled={pending}
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (coverBlobRef.current) {
              URL.revokeObjectURL(coverBlobRef.current);
              coverBlobRef.current = null;
            }

            if (file) {
              const nextUrl = URL.createObjectURL(file);
              coverBlobRef.current = nextUrl;
              setCoverPreviewUrl(nextUrl);
              return;
            }

            setCoverPreviewUrl(article?.cover_image_url ?? null);
          }}
        />
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label>Nội dung</Label>
          <div className="inline-flex rounded-lg border border-border bg-muted/40 p-1">
            <ContentModeButton
              active={contentMode === "edit"}
              onClick={() => setContentMode("edit")}
              label="Soạn"
            />
            <ContentModeButton
              active={contentMode === "preview"}
              onClick={() => setContentMode("preview")}
              label="Xem trước"
            />
          </div>
        </div>

        <div className={contentMode === "edit" ? "block" : "hidden"}>
          <RichTextEditor
            key={article?.id ?? "new"}
            name="body"
            defaultValue={article?.body ?? ""}
            onChange={setBodyHtml}
          />
        </div>

        {contentMode === "preview" ? (
          <ArticleBodyPreview
            title={title}
            excerpt={excerpt}
            body={bodyHtml}
            coverImageUrl={coverPreviewUrl}
            category={category || null}
          />
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as PublicationStatus)}
          disabled={pending}
          className="h-9 w-full max-w-xs rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <StatusOption value="draft" label="Nháp" />
          <StatusOption value="published" label="Xuất bản" />
        </select>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-green-600" : "text-sm text-destructive"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Đang lưu..." : mode === "create" ? "Tạo bài viết" : "Lưu thay đổi"}
        </Button>
        {mode === "edit" && article ? (
          <>
            {status === "published" ? (
              <Button type="button" variant="outline" render={<Link href={`/tin-tuc/${slug}`} target="_blank" />}>
                Xem trên site
              </Button>
            ) : null}
            <DeleteArticleButton articleId={article.id} title={article.title} />
          </>
        ) : null}
      </div>
    </form>
  );
}

function StatusOption({ value, label }: { value: PublicationStatus; label: string }) {
  return <option value={value}>{label}</option>;
}

function ContentModeButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "bg-background text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

function DeleteArticleButton({ articleId, title }: { articleId: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Xóa bài viết "${title}"? Hành động không thể hoàn tác.`);

    if (!confirmed) return;

    setPending(true);
    const result: ArticleActionState = await deleteArticle(articleId);

    if (!result.ok) {
      window.alert(result.message);
      setPending(false);
      return;
    }

    router.push("/admin/articles");
    router.refresh();
  }

  return (
    <Button type="button" variant="destructive" disabled={pending} onClick={() => void handleDelete()}>
      {pending ? "Đang xóa..." : "Xóa bài"}
    </Button>
  );
}
