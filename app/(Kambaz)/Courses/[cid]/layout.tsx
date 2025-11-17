/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./BreadCrumb";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParams } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid } = useParams<{ cid: string }>();

  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  );
  const course = courses.find((c: any) => c._id === cid);

  const [showNav, setShowNav] = useState(true);

  return (
    <div id="wd-courses">
      <h2 className="d-flex align-items-center">
        <button
          type="button"
          aria-label="Toggle course navigation"
          title="Toggle course navigation"
          onClick={() => setShowNav((v) => !v)}
          className="border-0 bg-transparent p-0 me-3 text-danger"
          style={{ cursor: "pointer" }}
        >
          <FaAlignJustify className="fs-4 mb-1" />
        </button>

        <span className="text-danger">
          <Breadcrumb course={course} />
        </span>
      </h2>

      <hr />

      <div className="d-flex">
        {showNav && (
          <div>
            <CourseNavigation />
          </div>
        )}

        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}
