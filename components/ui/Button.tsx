import Link from "next/link";

type Props = {
  href?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  icon?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function ChatIcon() {
  return (
    <span className="flex size-5 items-center justify-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/icons/chat-bubble.svg" alt="" width={17} height={17} />
    </span>
  );
}

export default function Button({ href = "#", variant = "primary", size = "lg", icon, className = "", children }: Props) {
  const base = "inline-flex items-center justify-center rounded-lg text-base leading-6 transition-colors";
  const sizes = {
    primary: { md: "gap-1 px-4 py-2", lg: "gap-2 px-4 py-3" },
    secondary: { md: "gap-2.5 px-[19px] py-[7px]", lg: "gap-2.5 px-[19px] py-[11px]" },
  };
  const variants = {
    primary: "bg-primary font-semibold text-surface hover:bg-[#006ae0]",
    secondary: "border border-line-2 bg-white font-medium text-ink hover:bg-surface",
  };
  return (
    <Link href={href} className={`${base} ${sizes[variant][size]} ${variants[variant]} ${className}`}>
      {icon && <ChatIcon />}
      {children}
    </Link>
  );
}
