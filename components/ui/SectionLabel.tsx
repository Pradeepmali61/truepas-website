export default function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex w-fit items-center rounded-[40px] bg-sky-100 px-4 py-1 text-base leading-8 font-medium ${className}`}>
      {children}
    </span>
  );
}
