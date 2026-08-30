import { cn } from "@/lib/utils";

type BrandIconProps = {
  className?: string;
};

export function GoogleMapsIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path
        fill="#EA4335"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
      />
      <circle cx="12" cy="9" r="2.5" fill="#B31412" />
      <circle cx="12" cy="9" r="1.2" fill="#fff" />
    </svg>
  );
}

export function ZaloIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0068FF" />
      <path
        fill="#fff"
        d="M7.5 8.5c0-.8.7-1.5 1.5-1.5h6c.8 0 1.5.7 1.5 1.5v1.2c0 .8-.7 1.5-1.5 1.5H11l-2 2v-2H9c-.8 0-1.5-.7-1.5-1.5V8.5zm1.5 4.5h5.5c.8 0 1.5.7 1.5 1.5v1.2c0 .8-.7 1.5-1.5 1.5h-3.5l-2 2v-2H9c-.8 0-1.5-.7-1.5-1.5v-1.2c0-.8.7-1.5 1.5-1.5z"
      />
    </svg>
  );
}

export function MessengerIcon({ className }: BrandIconProps) {
  return (
    <svg viewBox="0 0 24 24" className={cn("size-5", className)} aria-hidden>
      <path fill="#0084FF" d="M12 2C6.48 2 2 6.15 2 11.07c0 2.87 1.42 5.43 3.64 7.1L4.5 22l4.43-2.43c1.18.33 2.43.5 3.72.5 5.52 0 10-4.15 10-9.07S17.52 2 12 2z" />
      <path fill="#fff" d="M7.2 13.1 10.4 9.8l3.1 2.8 4.1-3.7-4.1 4.8-3.2-2.9-2.3 2.3z" />
    </svg>
  );
}
