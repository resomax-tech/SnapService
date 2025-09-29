import Link from "next/link";

export default function FooterLink({ href, label, Icon, pathname }) {
  const isActive =
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href);

  return (
    
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 mt-2 ${
        isActive ? "text-yellow-500" : "text-[#37353e]"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
