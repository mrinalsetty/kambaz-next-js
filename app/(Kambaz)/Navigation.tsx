"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser, FaGithub } from "react-icons/fa6";

const NAV_ITEMS = [
  { href: "/Account", label: "Account", Icon: FaRegCircleUser },
  { href: "/Dashboard", label: "Dashboard", Icon: AiOutlineDashboard },
  { href: "/Courses", label: "Courses", Icon: LiaBookSolid },
  { href: "/Calendar", label: "Calendar", Icon: IoCalendarOutline },
  { href: "/Inbox", label: "Inbox", Icon: FaInbox },
  { href: "/Labs", label: "Labs", Icon: LiaCogSolid },
  {
    href: "https://github.com/mrinalsetty/kambaz-next-js",
    label: "GitHub",
    Icon: FaGithub,
    external: true,
  },
];

export default function KambazNavigation() {
  const pathname = usePathname();

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 120 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU badge */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
        target="_blank"
      >
        <img src="/images/NEU.png" width={75} alt="Northeastern University" />
      </ListGroupItem>

      {/* Navigation items with per-route active styling */}
      {NAV_ITEMS.map(({ href, label, Icon, external }) => {
        const isActive =
          !external && (pathname === href || pathname.startsWith(href + "/"));
        return (
          <ListGroupItem
            key={href}
            className={`border-0 text-center ${
              isActive ? "bg-white" : "bg-black"
            }`}
          >
            <Link
              href={href}
              target={external ? "_blank" : undefined}
              id={`wd-${label.toLowerCase()}-link`}
              className={`text-decoration-none ${
                isActive ? "text-danger" : "text-white"
              }`}
            >
              {/* Icons are red in both states; active state flips bg + text per spec */}
              <Icon className="fs-1 text-danger" />
              <br />
              {label}
            </Link>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}
