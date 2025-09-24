// components/Sidebar/SidebarLink.jsx
import Link from "next/link";

export default function SidebarLink({ href, label, onClick }) {
  return (
    <Link href={href} onClick={onClick}>
      {label}
    </Link>
  );
}
