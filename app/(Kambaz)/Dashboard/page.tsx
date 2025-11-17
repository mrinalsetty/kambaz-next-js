"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import type { Enrollment, Course } from "../Courses/client";
import { setCourses } from "../Courses/reducer";
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

// Additional fields used during local editing/creation (not required by interface)
interface CourseForm extends Course {
  number?: string;
  startDate?: string;
  endDate?: string;
}

export default function Dashboard() {
  const enrolledCourses = useSelector(
    (state: RootState) => state.coursesReducer.courses
  );
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  );

  const [allCourses, setAllCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const dispatch = useDispatch();

  const [course, setCourse] = useState<CourseForm>({
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const visibleCourses: Course[] = allCourses;

  const loadData = useCallback(async () => {
    if (!currentUser) return;
    try {
      const [all, myCourses, myEnrollments] = await Promise.all([
        client.fetchAllCourses(),
        client.fetchMyCourses(),
        client.fetchMyEnrollments(),
      ]);
      setAllCourses(all);
      dispatch(setCourses(myCourses));
      setEnrollments(myEnrollments);
    } catch {
      // ignore errors
    }
  }, [currentUser, dispatch]);
  const createCourse = async () => {
    const { name, description, image } = course;
    await client.createCourse({ name, description, image });
    await loadData();
    setCourse({
      ...course,
      name: "New Course",
      description: "New Description",
    });
  };
  const performUpdateCourse = async () => {
    if (!course._id) return;
    const { _id, name, description, image } = course;
    const updated = await client.updateCourse({
      _id,
      name,
      description,
      image,
    });
    setAllCourses(allCourses.map((c) => (c._id === updated._id ? updated : c)));
    dispatch(
      setCourses(
        enrolledCourses.map((c) => (c._id === updated._id ? updated : c))
      )
    );
  };
  const performDeleteCourse = async (courseId: string) => {
    await client.deleteCourse(courseId);
    setAllCourses(allCourses.filter((c) => c._id !== courseId));
    dispatch(setCourses(enrolledCourses.filter((c) => c._id !== courseId)));
    setEnrollments(enrollments.filter((e) => e.course !== courseId));
  };

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.course === courseId);

  const enroll = async (courseId: string) => {
    await client.enrollInCourse(courseId);
    const myEnrollments = await client.fetchMyEnrollments();
    setEnrollments(myEnrollments);
    const myCourses = await client.fetchMyCourses();
    dispatch(setCourses(myCourses));
  };
  const unenroll = async (courseId: string) => {
    await client.unenrollFromCourse(courseId);
    const myEnrollments = await client.fetchMyEnrollments();
    setEnrollments(myEnrollments);
    const myCourses = await client.fetchMyCourses();
    dispatch(setCourses(myCourses));
  };

  // load when user changes
  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div id="wd-dashboard" style={{ marginLeft: 50 }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={createCourse}
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
        value={course.name}
        className="mb-2"
        onChange={(e) => setCourse({ ...course, name: e.target.value })}
      />
      <FormControl
        as="textarea"
        value={course.description}
        rows={3}
        onChange={(e) => setCourse({ ...course, description: e.target.value })}
      />

      <hr />

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

                        {isEnrolled(course._id!) && (
                          <>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                setCourse({ ...course });
                              }}
                              className="btn btn-warning ms-auto me-2"
                              id="wd-edit-course-click"
                            >
                              Edit
                            </button>
                            <button
                              onClick={(event) => {
                                event.preventDefault();
                                performDeleteCourse(course._id!);
                              }}
                              className="btn btn-danger"
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
