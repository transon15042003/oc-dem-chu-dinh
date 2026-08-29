import Link from "next/link";

import { PromotionsTable } from "@/components/admin/promotions/promotions-table";
import { Button } from "@/components/ui/button";
import { getAdminPromotions } from "@/lib/promotions/queries";
import { requireRole } from "@/lib/auth/session";

export default async function AdminPromotionsPage() {
  await requireRole(["admin", "editor"]);
  const promotions = await getAdminPromotions();

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Khuyến mãi</h1>
          <p className="text-muted-foreground">Quản lý chương trình hiển thị tại /khuyen-mai</p>
        </div>
        <Button render={<Link href="/admin/promotions/new" prefetch={false} />}>
          Tạo khuyến mãi mới
        </Button>
      </div>

      <PromotionsTable promotions={promotions} />
    </div>
  );
}
