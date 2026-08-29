import { notFound } from "next/navigation";

import { PromotionForm } from "@/components/admin/promotions/promotion-form";
import { getPromotionById } from "@/lib/promotions/queries";
import { requireRole } from "@/lib/auth/session";

type EditPromotionPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPromotionPage({ params }: EditPromotionPageProps) {
  await requireRole(["admin", "editor"]);
  const { id } = await params;
  const promotion = await getPromotionById(id);

  if (!promotion) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Sửa khuyến mãi</h1>
        <p className="text-muted-foreground">{promotion.title}</p>
      </div>

      <PromotionForm mode="edit" promotion={promotion} />
    </div>
  );
}
