import { createAdminClient } from "@/lib/supabase/admin";
import { getCareerPositionBySlug } from "@/lib/careers/queries";
import type { CareerApplicationFormValues } from "@/lib/validations/careers";

export async function insertCareerApplication(data: CareerApplicationFormValues): Promise<void> {
  const position = await getCareerPositionBySlug(data.positionSlug);

  if (!position) {
    throw new Error("POSITION_NOT_FOUND");
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("career_applications").insert({
    position_id: position.id,
    position_title: position.title,
    full_name: data.fullName,
    phone: data.phone,
    email: data.email?.trim() || null,
    branch_id: data.branchId,
    experience: data.experience?.trim() || null,
  });

  if (error) {
    throw new Error(error.message);
  }
}
