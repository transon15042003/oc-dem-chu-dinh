import { branches } from "@/data/branches";
import type { CareerApplication } from "@/types/database";

type CareerApplicationsTableProps = {
  applications: CareerApplication[];
};

export function CareerApplicationsTable({ applications }: CareerApplicationsTableProps) {
  if (applications.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">
        Chưa có hồ sơ ứng tuyển nào.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/50 text-left">
          <tr>
            <th className="px-4 py-3 font-semibold">Ứng viên</th>
            <th className="px-4 py-3 font-semibold">Vị trí</th>
            <th className="px-4 py-3 font-semibold">Chi nhánh</th>
            <th className="px-4 py-3 font-semibold">Ghi chú</th>
            <th className="px-4 py-3 font-semibold">Nhận lúc</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id} className="border-t border-border align-top">
              <td className="px-4 py-3">
                <p className="font-medium">{application.full_name}</p>
                <p className="text-xs text-muted-foreground">{application.phone}</p>
                {application.email ? (
                  <p className="text-xs text-muted-foreground">{application.email}</p>
                ) : null}
              </td>
              <td className="px-4 py-3">{application.position_title}</td>
              <td className="px-4 py-3 text-muted-foreground">
                {resolveBranchLabel(application.branch_id)}
              </td>
              <td className="max-w-xs px-4 py-3 text-muted-foreground">
                {application.experience?.trim() || "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground">
                {formatDateTime(application.created_at)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function resolveBranchLabel(branchId: string): string {
  const branch = branches.find((item) => item.id === branchId);
  return branch ? `${branch.badge} — ${branch.name}` : branchId;
}

function formatDateTime(value: string): string {
  return new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}
