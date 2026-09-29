import Link from "next/link";

type Props = {
  href?: string;
  variant?: "primary" | "secondary";
  size?: "md" | "lg";
  /** true = chat bubble; or pass any icon node */
  icon?: boolean | React.ReactNode;
  className?: string;
  children: React.ReactNode;
};

export function ChatIcon() {
  return (
    <span className="flex size-5 items-center justify-center">
      <svg width="17" height="17" viewBox="0 0 17 17" aria-hidden>
        <path
          d="M0 16.9999V1.69999C0 1.23249 0.166458 0.832288 0.499373 0.499373C0.832288 0.166458 1.23249 0 1.69999 0H15.2999C15.7674 0 16.1676 0.166458 16.5005 0.499373C16.8335 0.832288 16.9999 1.23249 16.9999 1.69999V11.8999C16.9999 12.3674 16.8335 12.7676 16.5005 13.1006C16.1676 13.4335 15.7674 13.5999 15.2999 13.5999H3.39998L0 16.9999ZM2.67749 11.8999H15.2999V1.69999H1.69999V12.8562L2.67749 11.8999Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function DownloadIcon({ className = "size-5" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center ${className}`}>
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
        <path
          d="M8 12L3 7L4.4 5.55L7 8.15V0H9V8.15L11.6 5.55L13 7L8 12ZM2 16C1.45 16 0.979167 15.8042 0.5875 15.4125C0.195833 15.0208 0 14.55 0 14V11H2V14H14V11H16V14C16 14.55 15.8042 15.0208 15.4125 15.4125C15.0208 15.8042 14.55 16 14 16H2Z"
          fill="currentColor"
        />
      </svg>
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
      {icon === true ? <ChatIcon /> : icon}
      {children}
    </Link>
  );
}
