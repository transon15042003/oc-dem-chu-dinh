-- v2.1 Event Booking: lưu yêu cầu đặt tiệc từ form public

CREATE TYPE public.event_booking_type AS ENUM (
  'sinh-nhat',
  'thoi-noi',
  'tat-nien',
  'lien-hoan'
);

CREATE TABLE public.event_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  event_type public.event_booking_type NOT NULL,
  guest_count TEXT NOT NULL,
  branch_id TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT NOT NULL,
  company_name TEXT,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX event_bookings_created_at_idx ON public.event_bookings (created_at DESC);

ALTER TABLE public.event_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY event_bookings_editor_select ON public.event_bookings
  FOR SELECT TO authenticated
  USING (public.is_content_editor());
