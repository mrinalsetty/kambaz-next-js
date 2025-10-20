"use client";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>();
  const pathname = usePathname();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const segment = (label: string) => label;

  const idMap: Record<string, string> = {
    Home: "wd-course-home-link",
    Modules: "wd-course-modules-link",
    Piazza: "wd-course-piazza-link",
    Zoom: "wd-course-zoom-link",
    Assignments: "wd-course-quizzes-link",
    Quizzes: "wd-course-assignments-link",
    Grades: "wd-course-grades-link",
    People: "wd-course-people-link",
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        const href = `/Courses/${cid}/${segment(label)}`;
        const isActive = pathname.startsWith(href);
        return (
          <Link
            key={label}
            href={href}
            id={idMap[label]}
            className={`list-group-item border-0 ${
              isActive ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
      <br />
    </div>
  );
}
