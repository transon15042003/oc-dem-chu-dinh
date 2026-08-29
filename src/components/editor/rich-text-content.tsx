import { cn } from "@/lib/utils";

type RichTextContentProps = {
  html: string;
  className?: string;
};

export function RichTextContent({ html, className }: RichTextContentProps) {
  return (
    <div
      className={cn("prose-article", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
