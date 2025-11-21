/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./BreadCrumb";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParams, useRouter } from "next/navigation";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid } = useParams<{ cid: string }>();

  const courses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  );
  const enrollments = useSelector(
    (state: RootState) => (state as any).enrollmentsReducer.enrollments
  );
  const currentUser = useSelector(
    (state: RootState) => (state as any).accountReducer.currentUser
  );
  const course = courses.find((c: any) => c._id === cid);
  const router = useRouter();

  useEffect(() => {
    const enrolled =
      currentUser &&
      currentUser._id &&
      enrollments?.some(
        (enr: any) => enr.user === currentUser._id && enr.course === cid
      );
    if (!enrolled) {
      router.replace("/Dashboard");
    }
  }, [cid, currentUser, enrollments, router]);

  const [showNav, setShowNav] = useState(true);

  const enrolled =
    currentUser &&
    currentUser._id &&
    enrollments?.some(
      (enr: any) => enr.user === currentUser._id && enr.course === cid
    );
  if (!enrolled) {
    return null;
  }

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
