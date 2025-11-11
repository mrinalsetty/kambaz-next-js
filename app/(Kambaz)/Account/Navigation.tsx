"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

export default function AccountNavigation() {
  const pathname = usePathname();
  const { currentUser } = useSelector((s: RootState) => s.accountReducer);

  const links = currentUser
    ? [
        {
          label: "Profile",
          href: "/Account/Profile",
          id: "wd-account-profile-link",
        },
      ]
    : [
        {
          label: "Signin",
          href: "/Account/Signin",
          id: "wd-account-signin-link",
        },
        {
          label: "Signup",
          href: "/Account/Signup",
          id: "wd-account-signup-link",
        },
      ];

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map(({ label, href, id }) => (
        <Link
          key={id}
          href={href}
          id={id}
          className={`list-group-item border-0 py-2 ${
            pathname.startsWith(href) ? "active" : "text-danger"
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
