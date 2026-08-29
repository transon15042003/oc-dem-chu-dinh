"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import {
  createArticle,
  deleteArticle,
  initialArticleActionState,
  updateArticle,
  type ArticleActionState,
} from "@/app/admin/(protected)/articles/actions";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugifyTitle } from "@/lib/articles/slug";
import type { Article, PublicationStatus } from "@/types/database";

type ArticleFormProps = {
  mode: "create" | "edit";
  article?: Article;
};

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

      <div className="space-y-2">
        <Label htmlFor="excerpt">Mô tả ngắn</Label>
        <textarea
          id="excerpt"
          name="excerpt"
          defaultValue={article?.excerpt ?? ""}
          disabled={pending}
          rows={3}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
          placeholder="Tóm tắt hiển thị trên danh sách tin tức"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Ảnh bìa (tối đa 2MB)</Label>
        {article?.cover_image_url ? (
          <div className="relative mb-2 aspect-[16/9] max-w-md overflow-hidden rounded-lg border border-border">
            <Image
              src={article.cover_image_url}
              alt=""
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        ) : null}
        <input type="hidden" name="coverImageUrl" value={article?.cover_image_url ?? ""} />
        <Input id="coverImage" name="coverImage" type="file" accept="image/*" disabled={pending} />
      </div>

      <div className="space-y-2">
        <Label>Nội dung</Label>
        <RichTextEditor
          key={article?.id ?? "new"}
          name="body"
          defaultValue={article?.body ?? ""}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Trạng thái</Label>
        <select
          id="status"
          name="status"
          defaultValue={article?.status ?? "draft"}
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
            {article.status === "published" ? (
              <Button type="button" variant="outline" render={<Link href={`/tin-tuc/${article.slug}`} target="_blank" />}>
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
