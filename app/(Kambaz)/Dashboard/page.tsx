/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { addNewCourse, deleteCourse, updateCourse } from "../Courses/reducer";
import { v4 as uuidv4 } from "uuid";
import * as db from "../Database";
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

  const currentUser = useSelector(
    (state: RootState) => (state as any).accountReducer.currentUser
  );

  const { enrollments } = db as any;
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

  const dbCourses = (db.courses as Course[]) ?? [];
  const isEnrolled = (c: Course) =>
    currentUser &&
    currentUser._id &&
    enrollments?.some(
      (enr: any) => enr.user === currentUser._id && enr.course === c._id
    );

  const dbVisible = dbCourses.filter((c) => isEnrolled(c));
  const newlyAdded = (courses ?? []).filter(
    (c) => !dbCourses.some((d) => d._id === c._id)
  );

  const visibleCourses: Course[] = [...dbVisible, ...newlyAdded];

  return (
    <div id="wd-dashboard" style={{ marginLeft: 50 }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h5>
        New Course
        <button
          className="btn btn-primary float-end"
          id="wd-add-new-course-click"
          onClick={() => dispatch(addNewCourse({ ...course, _id: uuidv4() }))}
        >
          Add
        </button>
        <button
          className="btn btn-warning float-end me-2"
          onClick={() => dispatch(updateCourse(course))}
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
          {visibleCourses.map((course: Course) => (
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

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning ms-auto me-2"
                        id="wd-edit-course-click"
                      >
                        Edit
                      </button>

                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          dispatch(deleteCourse(course._id));
                        }}
                        className="btn btn-danger"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
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
