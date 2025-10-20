"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
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
import { assignments as assignmentsData } from "../../../Database";

const titleColor = { color: "#2b363dff" };
const metaColor = { color: "#505b6aff" };
const caretStyle = { fontSize: "0.9rem", color: "#2b363dff" };

type Assignment = {
  _id: string;
  course: string;
  group: "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECTS" | string;
  title: string;
  moduleTag?: string;
  availableText?: string;
  dueText?: string;
  points?: number;
};

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const all: Assignment[] = (assignmentsData as unknown as Assignment[]) ?? [];
  const groups = ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"] as const;
  const weights: Record<(typeof groups)[number], string> = {
    ASSIGNMENTS: "40% of Total",
    QUIZZES: "10% of Total",
    EXAMS: "20% of Total",
    PROJECTS: "30% of Total",
  };
  const items = all.filter((a) => a.course === cid);

  return (
    <div id="wd-assignments" className="p-3">
      <div className="d-flex align-items-center mb-3">
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
            className="px-4 py-2 rounded bg-light border border-gray text-dark"
          >
            + Group
          </button>
          <button
            id="wd-assignments-add"
            className="px-4 py-2 rounded bg-danger border border-danger text-white"
          >
            + Assignment
          </button>
        </div>
      </div>

      <ListGroup className="rounded-0 mt-3" id="wd-assignments-groups">
        {groups.map((group) => {
          const groupItems = items.filter(
            (a) => (a.group || "").toUpperCase() === group
          );

          return (
            <ListGroupItem
              key={group}
              className="wd-module p-0 mb-5 fs-5 border border-gray"
            >
              <div
                className="wd-title p-3 ps-2"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <BsGripVertical className="me-2 fs-3" />
                <BsCaretDownFill
                  className="me-2 align-middle"
                  style={caretStyle}
                />
                <b style={titleColor}>{group}</b>
                <AssignmentGroupControls weight={weights[group]} />
              </div>

              <ListGroup className="wd-lessons rounded-0">
                {groupItems.map((a) => (
                  <ListGroupItem
                    key={a._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-start border border-gray"
                  >
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
                        href={`/Courses/${cid}/Assignments/${a._id}`}
                        className="wd-assignment-link fw-semibold text-decoration-none"
                        style={titleColor}
                      >
                        {a.title}
                      </Link>
                      <div style={metaColor}>
                        <span className="text-danger">
                          {a.moduleTag ?? "Multiple Modules"}
                        </span>{" "}
                        {" | "}
                        <b>Not available until</b> {a.availableText ?? "TBD"}{" "}
                        {" | "}
                      </div>
                      <div style={metaColor}>
                        <b>Due</b> {a.dueText ?? "TBD"} {" | "} {a.points ?? 0}{" "}
                        points
                      </div>
                    </div>

                    <div className="ms-auto d-inline-flex align-items-center align-self-center">
                      <AssignmentRowControls />
                    </div>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}
