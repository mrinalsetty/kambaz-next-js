"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const pathname = usePathname();
  const links = [
    { label: "Signin", href: "/Account/Signin", id: "wd-account-signin-link" },
    { label: "Signup", href: "/Account/Signup", id: "wd-account-signup-link" },
    {
      label: "Profile",
      href: "/Account/Profile",
      id: "wd-account-profile-link",
    },
  ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ label, href, id }) => {
        const active = pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            id={id}
            className={`list-group-item border-0 py-2 ${
              active ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
