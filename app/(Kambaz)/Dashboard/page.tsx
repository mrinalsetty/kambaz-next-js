"use client";

import { useEffect, useCallback } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Course } from "../Courses/client";
import {
  setCourses,
  setAllCourses,
  setEnrollments,
  toggleViewMode,
  setCourseDraftField,
  setCourseDraft,
  resetCourseDraft,
} from "../Courses/reducer";
import * as client from "../Courses/client";
import {
  Row,
  Col,
  Card,
  Button,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  FormControl,
} from "react-bootstrap";

// Local interface no longer needed; Redux courseDraft holds editable fields

export default function Dashboard() {
  const coursesState = useSelector((state: RootState) => state.coursesReducer);
  const {
    courses: enrolledCourses,
    allCourses,
    enrollments,
    viewMode,
  } = coursesState;
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );
  const role = currentUser?.role ?? "STUDENT";
  const isInstructor = ["FACULTY", "TA", "ADMIN"].includes(role);

  const dispatch = useDispatch();

  const courseDraft = useSelector(
    (state: RootState) => state.coursesReducer.courseDraft
  );

  const visibleCourses: Course[] =
    viewMode === "ENROLLED" ? enrolledCourses : allCourses;

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    try {
      const [all, myEnrollments] = await Promise.all([
        client.fetchAllCourses(),
        client.fetchMyEnrollments(),
      ]);
      const myCourses = all.filter((c) =>
        myEnrollments.some((e) => e.course === c._id)
      );
      dispatch(setAllCourses(all));
      dispatch(setEnrollments(myEnrollments));
      dispatch(setCourses(myCourses));
    } catch (e) {
      console.error("Failed to load courses/enrollments", e);
    }
  }, [currentUser, dispatch]);
  const createCourse = async () => {
    const { name, description, image } = courseDraft;
    await client.createCourse({ name, description, image });
    await loadData();
    dispatch(resetCourseDraft());
  };
  const performUpdateCourse = async () => {
    if (!courseDraft._id) return;
    const { _id, name, description, image } = courseDraft;
    const updated = await client.updateCourse({
      _id,
      name,
      description,
      image,
    });
    dispatch(
      setAllCourses(
        allCourses.map((c) => (c._id === updated._id ? updated : c))
      )
    );
    dispatch(
      setCourses(
        enrolledCourses.map((c) => (c._id === updated._id ? updated : c))
      )
    );
    dispatch(resetCourseDraft());
  };
  const performDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    dispatch(setAllCourses(allCourses.filter((c) => c._id !== courseId)));
    dispatch(setCourses(enrolledCourses.filter((c) => c._id !== courseId)));
    dispatch(setEnrollments(enrollments.filter((e) => e.course !== courseId)));
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.course === courseId);

  const refreshEnrollments = async () => {
    const [all, myEnrollments] = await Promise.all([
      client.fetchAllCourses(),
      client.fetchMyEnrollments(),
    ]);
    const myCourses = all.filter((c) =>
      myEnrollments.some((e) => e.course === c._id)
    );
    dispatch(setAllCourses(all));
    dispatch(setEnrollments(myEnrollments));
    dispatch(setCourses(myCourses));
  };
  const enroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    await refreshEnrollments();
  };
  const unenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    await refreshEnrollments();
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (!currentUser) {
    return (
      <div id="wd-dashboard-unauth" style={{ marginLeft: 50 }}>
        <h1>Dashboard</h1>
        <hr />
        <p>
          Please <Link href="/Account/Signin">sign in</Link> to view courses.
        </p>
      </div>
    );
  }

  return (
    <div id="wd-dashboard" style={{ marginLeft: 50 }}>
      <h1 id="wd-dashboard-title" className="d-flex align-items-center">
        <span className="flex-grow-1">Dashboard</span>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => dispatch(toggleViewMode())}
          id="wd-enrollments-toggle"
        >
          {viewMode === "ENROLLED" ? "Enrollments" : "My Courses"}
        </button>
      </h1>
      <hr />
      {isInstructor && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={createCourse}
              disabled={!courseDraft.name.trim()}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={performUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={courseDraft.name}
            className="mb-2"
            onChange={(e) =>
              dispatch(
                setCourseDraftField({ field: "name", value: e.target.value })
              )
            }
          />
          <FormControl
            as="textarea"
            value={courseDraft.description}
            rows={3}
            onChange={(e) =>
              dispatch(
                setCourseDraftField({
                  field: "description",
                  value: e.target.value,
                })
              )
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
          {visibleCourses
            .filter((c): c is Course & { _id: string } => !!c._id)
            .map((course) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      variant="top"
                      src={course.image}
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      <div className="d-flex align-items-center">
                        <Button variant="primary">Go</Button>

                        {isInstructor && (
                          <>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                dispatch(
                                  setCourseDraft({
                                    _id: course._id!,
                                    name: course.name || "",
                                    description: course.description || "",
                                    image:
                                      course.image || "/images/reactjs.jpg",
                                  })
                                );
                              }}
                              className="btn btn-warning ms-2"
                              id="wd-edit-course-click"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                performDeleteCourse(course._id!);
                              }}
                              className="btn btn-danger ms-2"
                              id="wd-delete-course-click"
                            >
                              Delete
                            </button>
                          </>
                        )}
                        {!isEnrolled(course._id!) && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              enroll(course._id!);
                            }}
                            className="btn btn-success ms-auto"
                          >
                            Enroll
                          </button>
                        )}
                        {isEnrolled(course._id!) && (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              unenroll(course._id!);
                            }}
                            className="btn btn-outline-secondary ms-2"
                          >
                            Unenroll
                          </button>
                        )}
                      </div>
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}
