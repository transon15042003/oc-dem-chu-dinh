-- v2.3: trạng thái xử lý cho đặt bàn / đặt tiệc

CREATE TYPE public.booking_status AS ENUM ('pending', 'processed');

ALTER TABLE public.table_bookings
  ADD COLUMN status public.booking_status NOT NULL DEFAULT 'pending';

ALTER TABLE public.event_bookings
  ADD COLUMN status public.booking_status NOT NULL DEFAULT 'pending';

CREATE INDEX table_bookings_status_created_at_idx
  ON public.table_bookings (status, created_at DESC);

CREATE INDEX event_bookings_status_created_at_idx
  ON public.event_bookings (status, created_at DESC);

CREATE POLICY table_bookings_editor_update ON public.table_bookings
  FOR UPDATE TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());

CREATE POLICY event_bookings_editor_update ON public.event_bookings
  FOR UPDATE TO authenticated
  USING (public.is_content_editor())
  WITH CHECK (public.is_content_editor());
