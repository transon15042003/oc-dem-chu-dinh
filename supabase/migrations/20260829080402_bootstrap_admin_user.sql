-- Bootstrap first admin (run once on remote via MCP)
UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'transon15042003@gmail.com';

UPDATE public.profiles
SET role = 'admin', full_name = 'Tran Son'
WHERE email = 'transon15042003@gmail.com';
