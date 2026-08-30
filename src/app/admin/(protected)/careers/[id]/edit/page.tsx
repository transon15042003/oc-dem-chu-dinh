import Link from "next/link";
import { notFound } from "next/navigation";

import { CareerPositionForm } from "@/components/admin/careers/career-position-form";
import { getCareerPositionById } from "@/lib/careers/queries";
import { requireRole } from "@/lib/auth/session";

type EditCareerPositionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditCareerPositionPage({ params }: EditCareerPositionPageProps) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const position = await getCareerPositionById(id);

  if (!position) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">
          <Link href="/admin/careers" className="hover:text-brand-red">
            ← Vị trí tuyển dụng
          </Link>
        </p>
        <h1 className="text-2xl font-bold">Sửa vị trí tuyển dụng</h1>
        <p className="text-muted-foreground">{position.title}</p>
      </div>

      <CareerPositionForm mode="edit" position={position} />
    </div>
  );
}
