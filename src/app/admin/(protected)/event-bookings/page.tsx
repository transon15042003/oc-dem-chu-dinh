import { redirect } from "next/navigation";

export default function AdminEventBookingsRedirectPage() {
  redirect("/admin/bookings?type=event");
}
