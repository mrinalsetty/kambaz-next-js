import Link from "next/link";
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
} from "react-bootstrap";

type Course = {
  _id: string;
  name: string;
  description?: string;
  image?: string;
};

export default function Dashboard() {
  const courses: Course[] = db.courses as Course[];

  return (
    <div id="wd-dashboard" style={{ marginLeft: 50 }}>
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row
          xs={1}
          md={5}
          className="g-0"
          style={{ rowGap: 32, columnGap: 32 }}
        >
          {courses.map((course: Course) => (
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
                    <Button variant="primary">Go</Button>
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
