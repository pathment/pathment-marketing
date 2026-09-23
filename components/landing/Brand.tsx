import Image from "next/image";
import Link from "next/link";
export function Brand({
  compact = false,
  href = "/",
  inverse = false,
}: {
  compact?: boolean;
  href?: string;
  inverse?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="Pathment home"
      className={`inline-flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight ${inverse ? "text-white" : "text-ink"}`}
    >
      <Image
        src="/logo-mark.svg"
        alt=""
        width={compact ? 30 : 34}
        height={compact ? 30 : 34}
        priority
      />
      Pathment
    </Link>
  );
}
