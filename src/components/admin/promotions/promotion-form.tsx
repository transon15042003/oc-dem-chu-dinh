"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useRef, useState } from "react";

import {
  createPromotion,
  deletePromotion,
  initialPromotionActionState,
  updatePromotion,
  type PromotionActionState,
} from "@/app/admin/(protected)/promotions/actions";
import { PromotionBodyPreview } from "@/components/admin/promotions/promotion-body-preview";
import { RichTextEditor } from "@/components/editor/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugifyTitle } from "@/lib/articles/slug";
import { isPromotionActive, toDatetimeLocalValue } from "@/lib/promotions/datetime";
import { cn } from "@/lib/utils";
import type { Promotion, PublicationStatus } from "@/types/database";

type PromotionFormProps = {
  mode: "create" | "edit";
  promotion?: Promotion;
};

type ContentMode = "edit" | "preview";

function defaultStartsAt(): string {
  const date = new Date();
  date.setMinutes(0, 0, 0);
  return toDatetimeLocalValue(date.toISOString());
}

function defaultEndsAt(): string {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  date.setMinutes(0, 0, 0);
  return toDatetimeLocalValue(date.toISOString());
}

export function PromotionForm({ mode, promotion }: PromotionFormProps) {
  const boundUpdateAction =
    mode === "edit" && promotion
      ? updatePromotion.bind(null, promotion.id)
      : createPromotion;

  const [state, formAction, pending] = useActionState(
    boundUpdateAction,
    initialPromotionActionState,
  );

  const [title, setTitle] = useState(promotion?.title ?? "");
  const [slug, setSlug] = useState(promotion?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(promotion?.slug));
  const [excerpt, setExcerpt] = useState(promotion?.excerpt ?? "");
  const [discountLabel, setDiscountLabel] = useState(promotion?.discount_label ?? "");
  const [promoCode, setPromoCode] = useState(promotion?.promo_code ?? "");
  const [bodyHtml, setBodyHtml] = useState(promotion?.body ?? "");
  const [status, setStatus] = useState<PublicationStatus>(promotion?.status ?? "draft");
  const [startsAt, setStartsAt] = useState(
    promotion ? toDatetimeLocalValue(promotion.starts_at) : defaultStartsAt(),
  );
  const [endsAt, setEndsAt] = useState(
    promotion ? toDatetimeLocalValue(promotion.ends_at) : defaultEndsAt(),
  );
  const [contentMode, setContentMode] = useState<ContentMode>("edit");
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(
    promotion?.cover_image_url ?? null,
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

  const canViewOnSite = isPromotionActive({
    status,
    starts_at: new Date(startsAt).toISOString(),
    ends_at: new Date(endsAt).toISOString(),
  });

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
            placeholder="vi-du-khuyen-mai"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="discountLabel">Nhãn ưu đãi</Label>
          <Input
            id="discountLabel"
            name="discountLabel"
            value={discountLabel}
            onChange={(event) => setDiscountLabel(event.target.value)}
            disabled={pending}
            placeholder="Giảm 20%"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="promoCode">Mã khuyến mãi</Label>
          <Input
            id="promoCode"
            name="promoCode"
            value={promoCode}
            onChange={(event) => setPromoCode(event.target.value)}
            disabled={pending}
            placeholder="OC20"
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startsAt">Bắt đầu</Label>
          <Input
            id="startsAt"
            name="startsAt"
            type="datetime-local"
            value={startsAt}
            onChange={(event) => setStartsAt(event.target.value)}
            required
            disabled={pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endsAt">Kết thúc</Label>
          <Input
            id="endsAt"
            name="endsAt"
            type="datetime-local"
            value={endsAt}
            onChange={(event) => setEndsAt(event.target.value)}
            required
            disabled={pending}
          />
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
          placeholder="Tóm tắt hiển thị trên danh sách khuyến mãi"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverImage">Ảnh bìa (tối đa 2MB)</Label>
        {coverPreviewUrl ? (
          <div className="relative mb-2 aspect-video max-w-md overflow-hidden rounded-lg border border-border">
            <Image
              src={coverPreviewUrl}
              alt=""
              fill
              className="object-cover"
              sizes="400px"
            />
          </div>
        ) : null}
        <input type="hidden" name="coverImageUrl" value={promotion?.cover_image_url ?? ""} />
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

            setCoverPreviewUrl(promotion?.cover_image_url ?? null);
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
            key={promotion?.id ?? "new"}
            name="body"
            defaultValue={promotion?.body ?? ""}
            onChange={setBodyHtml}
          />
        </div>

        {contentMode === "preview" ? (
          <PromotionBodyPreview
            title={title}
            excerpt={excerpt}
            body={bodyHtml}
            coverImageUrl={coverPreviewUrl}
            startsAt={startsAt}
            endsAt={endsAt}
            discountLabel={discountLabel}
            promoCode={promoCode}
            slug={slug}
            variant="detail"
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
          {pending ? "Đang lưu..." : mode === "create" ? "Tạo khuyến mãi" : "Lưu thay đổi"}
        </Button>
        {mode === "edit" && promotion ? (
          <>
            {canViewOnSite ? (
              <Button
                type="button"
                variant="outline"
                render={<Link href={`/khuyen-mai/${slug}`} target="_blank" />}
              >
                Xem trên site
              </Button>
            ) : null}
            <DeletePromotionButton promotionId={promotion.id} title={promotion.title} />
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

function DeletePromotionButton({ promotionId, title }: { promotionId: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Xóa khuyến mãi "${title}"? Hành động không thể hoàn tác.`);

    if (!confirmed) return;

    setPending(true);
    const result: PromotionActionState = await deletePromotion(promotionId);

    if (!result.ok) {
      window.alert(result.message);
      setPending(false);
      return;
    }

    router.push("/admin/promotions");
    router.refresh();
  }

  return (
    <Button type="button" variant="destructive" disabled={pending} onClick={() => void handleDelete()}>
      {pending ? "Đang xóa..." : "Xóa"}
    </Button>
  );
}
