export function AdminPageHeaderSkeleton() {
  return (
    <div className="space-y-2">
      <div className="h-8 w-48 rounded-lg bg-muted" />
      <div className="h-4 w-72 max-w-full rounded bg-muted" />
    </div>
  );
}

export function AdminDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Đang tải">
      <AdminPageHeaderSkeleton />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-32 rounded-xl bg-muted" />
        <div className="h-32 rounded-xl bg-muted" />
      </div>
    </div>
  );
}

export function AdminUsersTableSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-xl border border-border animate-pulse"
      aria-busy="true"
      aria-label="Đang tải danh sách người dùng"
    >
      <div className="h-11 bg-muted/50" />
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="flex gap-4 border-t border-border px-4 py-3">
          <div className="h-4 w-40 rounded bg-muted" />
          <div className="h-4 w-28 rounded bg-muted" />
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="h-8 w-32 rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

export function AdminUsersPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse" aria-busy="true" aria-label="Đang tải">
      <AdminPageHeaderSkeleton />
      <div className="h-64 rounded-xl border border-border bg-muted/30" />
      <AdminUsersTableSkeleton />
    </div>
  );
}
