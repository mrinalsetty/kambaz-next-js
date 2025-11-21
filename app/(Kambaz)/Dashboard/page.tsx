/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { unenrollCourse } from "../Enrollments/reducer";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  FormControl,
} from "react-bootstrap";

type Course = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
};

export default function Dashboard() {
  const courses: Course[] = useSelector(
    (state: RootState) => (state as any).coursesReducer.courses
  );
  const enrollments: any[] = useSelector(
    (state: RootState) => (state as any).enrollmentsReducer.enrollments
  );

  const currentUser = useSelector(
    (state: RootState) => (state as any).accountReducer.currentUser
  );

  const canManage =
    currentUser && ["FACULTY", "TA", "ADMIN"].includes(currentUser.role);

  const dispatch = useDispatch();

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isEnrolled = (c: Course) =>
    currentUser &&
    currentUser._id &&
    enrollments?.some(
      (enr: any) => enr.user === currentUser._id && enr.course === c._id
    );

  const enrolledCourses = (courses ?? []).filter((c) => isEnrolled(c));
  const ownedCourses = (courses ?? []).filter(
    (c) => canManage && !isEnrolled(c)
  );
  const visibleCoursesMap: Record<string, Course> = {};
  [...enrolledCourses, ...ownedCourses].forEach((c) => {
    visibleCoursesMap[c._id] = c;
  });
  const visibleCourses: Course[] = Object.values(visibleCoursesMap);

  return (
    <div id="wd-dashboard" style={{ marginLeft: 50 }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {canManage && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => canManage && dispatch(addNewCourse(course))}
              disabled={!canManage}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => canManage && dispatch(updateCourse(course))}
              id="wd-update-course-click"
              disabled={!canManage}
            >
              Update
            </button>
          </h5>
          <br />

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={5}
          className="g-0"
          style={{ rowGap: 32, columnGap: 32 }}
        >
          {visibleCourses.map((course: Course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <CardImg
                  variant="top"
                  src={course.image}
                  width="100%"
                  height={160}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    window.location.href = `/Courses/${course._id}/Home`;
                  }}
                />
                <CardBody>
                  <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="text-decoration-none text-dark"
                    >
                      {course.name}
                    </Link>
                  </CardTitle>
                  <CardText
                    className="wd-dashboard-course-description overflow-hidden"
                    style={{ height: "100px" }}
                  >
                    {course.description}
                  </CardText>
                  <div className="d-flex align-items-center">
                    <Link
                      href={`/Courses/${course._id}/Home`}
                      className="btn btn-primary"
                    >
                      Go
                    </Link>
                    {canManage && (
                      <>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            setCourse(course);
                          }}
                          className="btn btn-warning ms-auto me-2"
                          id="wd-edit-course-click"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            dispatch(deleteCourse(course._id));
                          }}
                          className="btn btn-danger me-2"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {currentUser?.role === "STUDENT" && isEnrolled(course) && (
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatch(
                            unenrollCourse({
                              user: currentUser._id,
                              course: course._id,
                            })
                          );
                        }}
                        className="btn btn-danger ms-auto"
                        id="wd-unenroll-course-click"
                      >
                        Unenroll
                      </button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
