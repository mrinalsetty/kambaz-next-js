import Link from "next/link";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {
  BsGripVertical,
  BsCaretDownFill,
  BsFileEarmarkText,
  BsPencil,
  BsSearch,
} from "react-icons/bs";
import AssignmentRowControls from "./AssignmentRowControls";
import AssignmentGroupControls from "./AssignmentGroupControls";

const titleColor = { color: "#2b363dff" };
const metaColor = { color: "#505b6aff" };
const caretStyle = { fontSize: "0.9rem", color: "#2b363dff" };

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center">
        <div className="position-relative" style={{ width: 560 }}>
          <BsSearch
            className="position-absolute"
            style={{
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 20,
              color: "#505b6aff",
            }}
          />
          <input
            placeholder="Search..."
            id="wd-assignments-search"
            className="form-control ps-5 py-3"
            style={{
              borderRadius: 14,
              borderColor: "#d0d7de",
              color: "#2b363dff",
              boxShadow: "none",
            }}
          />
        </div>

        <div className="ms-auto d-flex align-items-center gap-2">
          <button
            id="wd-assignments-add-group"
            className="px-4 py-2"
            style={{
              borderRadius: 5,
              backgroundColor: "#f5f6f8",
              border: "1px solid #d0d7de",
              color: "#2b363dff",
            }}
          >
            + Group
          </button>
          <button
            id="wd-assignments-add"
            className="px-4 py-2"
            style={{
              borderRadius: 5,
              backgroundColor: "#d2222d",
              border: "1px solid #d2222d",
              color: "#ffffff",
            }}
          >
            + Assignment
          </button>
        </div>
      </div>

      <ListGroup className="rounded-0 mt-3" id="wd-assignments-groups">
        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border border-gray">
          <div
            className="wd-title p-3 ps-2"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <BsCaretDownFill className="me-2 align-middle" style={caretStyle} />
            <b style={titleColor}>ASSIGNMENTS</b>
            <AssignmentGroupControls weight="40% of Total" />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>

              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  A1 - ENV + HTML
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 6 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> May 13 at 11:59pm | 100 points
                </div>
              </div>

              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>

              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  A2 - CSS + BOOTSTRAP
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> May 20 at 11:59pm | 100 points
                </div>
              </div>

              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>

              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  A3 - JAVASCRIPT + REACT
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> May 27 at 11:59pm | 100 points
                </div>
              </div>

              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border border-gray">
          <div
            className="wd-title p-3 ps-2"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <BsCaretDownFill className="me-2 align-middle" style={caretStyle} />
            <b style={titleColor}>QUIZZES</b>
            <AssignmentGroupControls weight="10% of Total" />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Q1 - ENV + HTML
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 13 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> May 20 at 11:59pm | 29 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Q2 - CSS + BOOTSTRAP
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 20 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> May 27 at 11:59pm | 23 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Q3 - JAVASCRIPT + REACT
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> May 27 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> Jun 3 at 11:59pm | 32 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border border-gray">
          <div
            className="wd-title p-3 ps-2"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <BsCaretDownFill className="me-2 align-middle" style={caretStyle} />
            <b style={titleColor}>EXAMS</b>
            <AssignmentGroupControls weight="20% of Total" />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Exam 1 (10% of Total)
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> Oct 27 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> Nov 3 at 11:59pm | 100 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Exam 2 (10% of Total)
                </Link>
                <div style={metaColor}>
                  <span className="text-danger">Multiple Modules</span> |{" "}
                  <b>Not available until</b> Dec 1 at 12:00am |
                </div>
                <div style={metaColor}>
                  <b>Due</b> Dec 8 at 11:59pm | 103 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>

        <ListGroupItem className="wd-module p-0 mb-5 fs-5 border border-gray">
          <div
            className="wd-title p-3 ps-2"
            style={{ backgroundColor: "#f3f4f6" }}
          >
            <BsGripVertical className="me-2 fs-3" />
            <BsCaretDownFill className="me-2 align-middle" style={caretStyle} />
            <b style={titleColor}>PROJECTS</b>
            <AssignmentGroupControls weight="30% of Total" />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Project - Kambaz Quizzes
                </Link>
                <div style={metaColor}>
                  <b>Due</b> Dec 7 at 11:59pm | 100 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Project - Kambaz Pazza
                </Link>
                <div style={metaColor}>
                  <b>Due</b> Dec 7 at 11:59pm | 100 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>

            <ListGroupItem className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray">
              <div
                className="me-3 text-secondary d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <BsGripVertical className="fs-3" />
              </div>
              <div
                className="me-3 d-flex align-items-center justify-content-center align-self-center"
                style={{ width: 28 }}
              >
                <span
                  className="position-relative d-inline-block"
                  style={{ width: 24, height: 24 }}
                >
                  <BsFileEarmarkText
                    className="text-success"
                    style={{ fontSize: 24 }}
                  />
                  <BsPencil
                    className="text-success position-absolute"
                    style={{ fontSize: 12, right: -2, bottom: -2 }}
                  />
                </span>
              </div>
              <div className="flex-grow-1">
                <Link
                  href="/Courses/1234/Assignments/123"
                  className="wd-assignment-link fw-semibold text-decoration-none"
                  style={titleColor}
                >
                  Project - Social Network
                </Link>
                <div style={metaColor}>
                  <b>Due</b> Dec 7 at 11:59pm | 100 points
                </div>
              </div>
              <div className="ms-auto d-inline-flex align-items-center align-self-center">
                <AssignmentRowControls />
              </div>
            </ListGroupItem>
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
