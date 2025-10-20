import { ReactNode } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../Database";
import Breadcrumb from "./BreadCrumb";

export default function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: { cid: string } }>) {
  const { cid } = params;
  const course = courses.find((course) => course._id === cid);
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb course={course} />
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">{children} </div>
      </div>
    </div>
  );
}
