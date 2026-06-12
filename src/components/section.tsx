import { cn } from "@/lib/cn";

export function Section({
  className,
  children,
  as: As = "section",
  bleed = false,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  as?: "section" | "div" | "header" | "footer" | "article";
  bleed?: boolean;
  id?: string;
}) {
  return (
    <As
      id={id}
      className={cn(
        "py-20 sm:py-24 lg:py-28",
        bleed && "py-0 sm:py-0 lg:py-0",
        id && "scroll-mt-16",
        className,
      )}
    >
      {children}
    </As>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}
