-- Ngăn user tự đổi role/email khi cập nhật profile của mình (chỉ admin mới đổi qua policy admin_manage).

CREATE OR REPLACE FUNCTION public.profiles_protect_self_update()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT public.is_admin() THEN
    IF NEW.role IS DISTINCT FROM OLD.role THEN
      NEW.role := OLD.role;
    END IF;

    IF NEW.email IS DISTINCT FROM OLD.email THEN
      NEW.email := OLD.email;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_protect_self_update ON public.profiles;

CREATE TRIGGER profiles_protect_self_update
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.profiles_protect_self_update();
