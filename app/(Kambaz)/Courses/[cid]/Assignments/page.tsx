"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignments,
} from "../Assignments/reducer";
import * as coursesClient from "../../client";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import {
  BsGripVertical,
  BsCaretDownFill,
  BsFileEarmarkText,
  BsSearch,
} from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";
import AssignmentRowControls from "./AssignmentRowControls";
import AssignmentGroupControls from "./AssignmentGroupControls";

const titleColor = { color: "#2b363dff" };
const metaColor = { color: "#505b6aff" };
const caretStyle = { fontSize: "0.9rem", color: "#2b363dff" };

const showOrTBD = (v?: string) => (v && v.trim() ? v : "TBD");

type Assignment = {
  _id: string;
  course: string;
  group: "ASSIGNMENTS" | "QUIZZES" | "EXAMS" | "PROJECTS" | string;
  title: string;
  moduleTag?: string;
  availableFrom?: string;
  availableUntil?: string;
  dueDate?: string;
  points?: number;
  editing?: boolean;
};

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const all = useSelector(
    (s: RootState) => s.assignmentsReducer.assignments
  ) as Assignment[];

  const groups = ["ASSIGNMENTS", "QUIZZES", "EXAMS", "PROJECTS"] as const;
  const weights: Record<(typeof groups)[number], string> = {
    ASSIGNMENTS: "40% of Total",
    QUIZZES: "10% of Total",
    EXAMS: "20% of Total",
    PROJECTS: "30% of Total",
  };

  const items = (all ?? []).filter((a) => a.course === cid);

  const addNew = async () => {
    if (!cid) return;
    const created = await coursesClient.createAssignmentForCourse(
      cid,
      {
        title: "New Assignment",
        course: cid,
        group: "ASSIGNMENTS",
      }
    );
    dispatch(addAssignment(created));
    router.push(`/Courses/${cid}/Assignments/${created._id}`);
  };

  const handleDelete = async (assignmentId: string) => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Delete this assignment?")
    ) {
      await coursesClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleUpdate = async (assignment: Assignment) => {
    const updated = await coursesClient.updateAssignment(assignment);
    dispatch(updateAssignment(updated));
  };

  // Load assignments for this course from server
  useEffect(() => {
    if (!cid) return;
    coursesClient
      .findAssignmentsForCourse(cid)
      .then((as) => dispatch(setAssignments(as)));
  }, [cid, dispatch]);

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
            onClick={addNew}
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
                      {/* file icon only (no pencil overlay) */}
                      <BsFileEarmarkText
                        className="text-success"
                        style={{ fontSize: 24 }}
                      />
                    </div>

                    <div className="flex-grow-1">
                      {/* navigate to editor on title click */}
                      {!a.editing && (
                        <>
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
                            <b>Not available until</b>{" "}
                            {showOrTBD(a.availableFrom)} {" | "}
                          </div>
                          <div style={metaColor}>
                            <b>Due</b> {showOrTBD(a.dueDate)} {" | "}{" "}
                            {a.points ?? 100} points
                          </div>
                        </>
                      )}

                      {a.editing && (
                        <FormControl
                          className="w-50 d-inline-block"
                          autoFocus
                          defaultValue={a.title}
                          onChange={(e) =>
                            handleUpdate({ ...a, title: e.target.value })
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              handleUpdate({ ...a, editing: false });
                            }
                          }}
                        />
                      )}
                    </div>

                    <AssignmentRowControls
                      assignmentId={a._id}
                      onDelete={handleDelete}
                    />
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
