// components/Footer/FooterLink.jsx
import Link from "next/link";


export default function FooterLink({ href, label, Icon, pathname }) {
  const isActive = pathname === href || pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1.5 ${isActive ? "text-yellow-500" : "text-black"}`}
    >
      <Icon className="w-6 h-4" />
      <span className="text-sm">{label}</span>
    </Link>
  );
}
