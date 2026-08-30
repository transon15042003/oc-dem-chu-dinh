-- v2.3 Table Booking: lưu yêu cầu đặt bàn từ form public

CREATE TABLE public.table_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  guest_count TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX table_bookings_created_at_idx ON public.table_bookings (created_at DESC);

ALTER TABLE public.table_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY table_bookings_editor_select ON public.table_bookings
  FOR SELECT TO authenticated
  USING (public.is_content_editor());
