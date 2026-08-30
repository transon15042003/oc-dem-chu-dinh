"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useMemo, useState } from "react";

import {
  createMenuItem,
  deleteMenuItem,
  initialMenuActionState,
  updateMenuItem,
  type MenuActionState,
} from "@/app/admin/(protected)/menu/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { slugifyTitle } from "@/lib/articles/slug";
import { buildMenuImageUrls } from "@/lib/menu/types";
import type { MenuCategoryRecord, MenuItemWithCategory, PublicationStatus } from "@/types/database";

type MenuItemFormProps = {
  mode: "create" | "edit";
  categories: MenuCategoryRecord[];
  item?: MenuItemWithCategory;
};

export function MenuItemForm({ mode, categories, item }: MenuItemFormProps) {
  const router = useRouter();
  const boundUpdateAction =
    mode === "edit" && item ? updateMenuItem.bind(null, item.id) : createMenuItem;

  const [state, formAction, pending] = useActionState(
    boundUpdateAction,
    initialMenuActionState,
  );

  const [name, setName] = useState(item?.name ?? "");
  const [slug, setSlug] = useState(item?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(item?.slug));
  const [imagePath, setImagePath] = useState(item?.image_path ?? "");
  const [status, setStatus] = useState<PublicationStatus>(item?.status ?? "published");

  const previewImage = useMemo(() => {
    if (!imagePath.trim()) return null;
    try {
      return buildMenuImageUrls(imagePath.trim()).image;
    } catch {
      return null;
    }
  }, [imagePath]);

  function handleNameChange(value: string) {
    setName(value);
    if (!slugTouched) {
      setSlug(slugifyTitle(value));
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Tên món</Label>
          <Input
            id="name"
            name="name"
            value={name}
            onChange={(event) => handleNameChange(event.target.value)}
            required
            disabled={pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="slug">Slug</Label>
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
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="categoryId">Danh mục</Label>
          <select
            id="categoryId"
            name="categoryId"
            defaultValue={item?.category_id ?? categories[0]?.id ?? ""}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            required
            disabled={pending}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Thứ tự hiển thị</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={item?.sort_order ?? 0}
            disabled={pending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imagePath">Đường dẫn ảnh (CDN)</Label>
        <Input
          id="imagePath"
          name="imagePath"
          value={imagePath}
          onChange={(event) => setImagePath(event.target.value)}
          placeholder="storage/mon-an/a (1).jpg"
          required
          disabled={pending}
        />
        <p className="text-xs text-muted-foreground">
          Dùng path tương đối trên CDN gốc, ví dụ: storage/mon-an/a (1).jpg
        </p>
        {previewImage ? (
          <div className="relative mt-3 size-28 overflow-hidden rounded-xl border border-border">
            <Image src={previewImage} alt="Xem trước" fill className="object-cover" sizes="112px" />
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="searchTerms">Từ khóa tìm kiếm</Label>
        <Input
          id="searchTerms"
          name="searchTerms"
          defaultValue={item?.search_terms ?? ""}
          placeholder="ốc hương, sốt trứng muối..."
          disabled={pending}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="status">Trạng thái</Label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as PublicationStatus)}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            disabled={pending}
          >
            <option value="draft">Nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="isHot">Món hot</Label>
          <select
            id="isHot"
            name="isHot"
            defaultValue={item?.is_hot ? "true" : "false"}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            disabled={pending}
          >
            <option value="false">Không</option>
            <option value="true">Có</option>
          </select>
        </div>
      </div>

      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {mode === "create" ? "Tạo món" : "Lưu thay đổi"}
        </Button>
        <Button type="button" variant="outline" disabled={pending} onClick={() => router.push("/admin/menu")}>
          Quay lại
        </Button>
        {mode === "edit" && item ? <DeleteItemButton itemId={item.id} /> : null}
      </div>
    </form>
  );
}

function DeleteItemButton({ itemId }: { itemId: string }) {
  const [state, setState] = useState<MenuActionState | null>(null);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Xóa món ăn này?")) {
      return;
    }

    setPending(true);
    const result = await deleteMenuItem(itemId);
    setState(result);
    setPending(false);
  }

  return (
    <div>
      <Button type="button" variant="destructive" disabled={pending} onClick={handleDelete}>
        Xóa món
      </Button>
      {state && !state.ok ? <p className="mt-2 text-sm text-red-600">{state.message}</p> : null}
    </div>
  );
}
