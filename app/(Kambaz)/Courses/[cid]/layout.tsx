/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import CourseNavigation from "./Navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./BreadCrumb";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { cid } = useParams<{ cid: string }>();

  const router = useRouter();
  const { courses, enrollments, allCourses } = useSelector(
    (state: RootState) => state.coursesReducer
  );
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const role = currentUser?.role ?? "STUDENT";
  const enrolled = enrollments.some((e) => e.course === cid);
  const courseFromState =
    (courses as any[]).find((c) => c._id === cid) ||
    (allCourses as any[]).find((c) => c._id === cid);

  const [resolvedCourseName, setResolvedCourseName] = useState<
    string | undefined
  >(courseFromState?.name);

  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      cid &&
      courseFromState &&
      role === "STUDENT" &&
      !enrolled
    ) {
      router.replace("/Dashboard");
    }
  }, [cid, courseFromState, role, enrolled, router]);

  useEffect(() => {
    if (courseFromState?.name) {
      setResolvedCourseName(courseFromState.name);
      return;
    }
    if (!cid) return;
    client
      .fetchAllCourses()
      .then((all) => all.find((c) => c._id === cid))
      .then((found) => setResolvedCourseName(found?.name))
      .catch(() => {});
  }, [cid, courseFromState]);

  if (role === "STUDENT" && courseFromState && !enrolled) {
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
          <Breadcrumb
            course={
              resolvedCourseName ? { name: resolvedCourseName } : undefined
            }
          />
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
