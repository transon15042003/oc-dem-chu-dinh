"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";

import {
  createCareerPosition,
  deleteCareerPosition,
  initialCareerPositionActionState,
  updateCareerPosition,
  type CareerPositionActionState,
} from "@/app/admin/(protected)/careers/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { perksToTextarea } from "@/lib/careers/perks";
import { slugifyTitle } from "@/lib/articles/slug";
import type { CareerPosition, PublicationStatus } from "@/types/database";

type CareerPositionFormProps = {
  mode: "create" | "edit";
  position?: CareerPosition;
};

export function CareerPositionForm({ mode, position }: CareerPositionFormProps) {
  const boundUpdateAction =
    mode === "edit" && position
      ? updateCareerPosition.bind(null, position.id)
      : createCareerPosition;

  const [state, formAction, pending] = useActionState(
    boundUpdateAction,
    initialCareerPositionActionState,
  );

  const [title, setTitle] = useState(position?.title ?? "");
  const [slug, setSlug] = useState(position?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(position?.slug));
  const [status, setStatus] = useState<PublicationStatus>(position?.status ?? "draft");

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
          <Label htmlFor="title">Tiêu đề vị trí</Label>
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
          />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="badge">Nhãn (vd: FULL-TIME)</Label>
          <Input
            id="badge"
            name="badge"
            defaultValue={position?.badge ?? ""}
            disabled={pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="incomeLabel">Dòng thu nhập</Label>
          <Input
            id="incomeLabel"
            name="incomeLabel"
            defaultValue={position?.income_label ?? ""}
            disabled={pending}
            placeholder="Thu nhập: 12 - 15 Triệu/tháng"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Mô tả công việc</Label>
        <textarea
          id="description"
          name="description"
          defaultValue={position?.description ?? ""}
          disabled={pending}
          rows={3}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="schedule">Thời gian làm việc</Label>
          <Input
            id="schedule"
            name="schedule"
            defaultValue={position?.schedule ?? ""}
            disabled={pending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="salary">Mức lương khởi điểm</Label>
          <Input
            id="salary"
            name="salary"
            defaultValue={position?.salary ?? ""}
            disabled={pending}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="perks">Quyền lợi (mỗi dòng một mục)</Label>
        <textarea
          id="perks"
          name="perks"
          defaultValue={perksToTextarea(position?.perks ?? [])}
          disabled={pending}
          rows={5}
          className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="sortOrder">Thứ tự hiển thị</Label>
          <Input
            id="sortOrder"
            name="sortOrder"
            type="number"
            min={0}
            defaultValue={position?.sort_order ?? 0}
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
            disabled={pending}
            className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
          >
            <option value="draft">Nháp</option>
            <option value="published">Xuất bản</option>
          </select>
        </div>
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="showOnListing"
              value="true"
              defaultChecked={position?.show_on_listing ?? true}
              disabled={pending}
              className="size-4 rounded border-input"
            />
            Hiển thị thẻ trên /tuyen-dung
          </label>
        </div>
      </div>

      {state.message ? (
        <p className={state.ok ? "text-sm text-green-600" : "text-sm text-destructive"}>
          {state.message}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Đang lưu..." : mode === "create" ? "Tạo vị trí" : "Lưu thay đổi"}
        </Button>
        {mode === "edit" && position ? (
          <>
            {status === "published" ? (
              <Button
                type="button"
                variant="outline"
                render={<Link href={`/tuyen-dung?position=${slug}`} target="_blank" />}
              >
                Xem trên site
              </Button>
            ) : null}
            <DeleteCareerPositionButton positionId={position.id} title={position.title} />
          </>
        ) : null}
      </div>
    </form>
  );
}

function DeleteCareerPositionButton({ positionId, title }: { positionId: string; title: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(`Xóa vị trí "${title}"? Hành động không thể hoàn tác.`);

    if (!confirmed) return;

    setPending(true);
    const result: CareerPositionActionState = await deleteCareerPosition(positionId);

    if (!result.ok) {
      window.alert(result.message);
      setPending(false);
      return;
    }

    router.push("/admin/careers");
    router.refresh();
  }

  return (
    <Button type="button" variant="destructive" disabled={pending} onClick={() => void handleDelete()}>
      {pending ? "Đang xóa..." : "Xóa"}
    </Button>
  );
}
