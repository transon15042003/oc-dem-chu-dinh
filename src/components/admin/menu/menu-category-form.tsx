"use client";

import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import {
  createMenuCategory,
  deleteMenuCategory,
  initialMenuActionState,
  updateMenuCategory,
  type MenuActionState,
} from "@/app/admin/(protected)/menu/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { slugifyTitle } from "@/lib/articles/slug";
import type { MenuCategoryRecord, PublicationStatus } from "@/types/database";

type MenuCategoryFormProps = {
  mode: "create" | "edit";
  category?: MenuCategoryRecord;
};

export function MenuCategoryForm({ mode, category }: MenuCategoryFormProps) {
  const router = useRouter();
  const boundUpdateAction =
    mode === "edit" && category
      ? updateMenuCategory.bind(null, category.id)
      : createMenuCategory;

  const [state, formAction, pending] = useActionState(
    boundUpdateAction,
    initialMenuActionState,
  );

  const [name, setName] = useState(category?.name ?? "");
  const [slug, setSlug] = useState(category?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(category?.slug));
  const [status, setStatus] = useState<PublicationStatus>(category?.status ?? "published");

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
          <Label htmlFor="name">Tên danh mục</Label>
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

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          name="description"
          defaultValue={category?.description ?? ""}
          rows={3}
          disabled={pending}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Thứ tự hiển thị</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={category?.sort_order ?? 0}
            disabled={pending}
          />
        </div>
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
          <Label htmlFor="showInFilter">Hiện tab lọc</Label>
          <select
            id="showInFilter"
            name="showInFilter"
            defaultValue={category?.show_in_filter === false ? "false" : "true"}
            className="h-10 w-full rounded-lg border border-border bg-background px-3 text-sm"
            disabled={pending}
          >
            <option value="true">Có</option>
            <option value="false">Không</option>
          </select>
        </div>
      </div>

      {state.message ? (
        <p className={`text-sm ${state.ok ? "text-green-600" : "text-red-600"}`}>{state.message}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {mode === "create" ? "Tạo danh mục" : "Lưu thay đổi"}
        </Button>
        <Button type="button" variant="outline" disabled={pending} onClick={() => router.push("/admin/menu")}>
          Quay lại
        </Button>
        {mode === "edit" && category ? (
          <DeleteCategoryButton categoryId={category.id} />
        ) : null}
      </div>
    </form>
  );
}

function DeleteCategoryButton({ categoryId }: { categoryId: string }) {
  const [state, setState] = useState<MenuActionState | null>(null);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Xóa danh mục này? Chỉ xóa được khi không còn món ăn liên kết.")) {
      return;
    }

    setPending(true);
    const result = await deleteMenuCategory(categoryId);
    setState(result);
    setPending(false);
  }

  return (
    <div>
      <Button type="button" variant="destructive" disabled={pending} onClick={handleDelete}>
        Xóa danh mục
      </Button>
      {state && !state.ok ? <p className="mt-2 text-sm text-red-600">{state.message}</p> : null}
    </div>
  );
}
