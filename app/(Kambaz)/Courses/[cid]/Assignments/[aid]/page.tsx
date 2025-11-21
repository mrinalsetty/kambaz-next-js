/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import {
  Form,
  Row,
  Col,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";
import {
  updateAssignment,
  initEditorDraft,
  setEditorDraft,
  clearEditorDraft,
} from "../../Assignments/reducer";
import { useEffect } from "react";

type Assignment = {
  _id: string;
  course: string;
  title?: string;
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
};

const DEFAULT_DESC = "Assignment description and submission instructions.";

const toISO = (s: string) => {
  if (!s) return "";
  if (/\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (m) {
    const [, mm, dd, yyyy] = m;
    return `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
  }
  const d = new Date(s);
  if (!isNaN(d.getTime())) {
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  }
  return "";
};

export default function AssignmentEditor() {
  const router = useRouter();
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const dispatch = useDispatch();

  const currentUser = useSelector(
    (s: RootState) =>
      s.accountReducer.currentUser as {
        _id: string;
        username: string;
        role: string;
      } | null
  );
  const canManage = !!(
    currentUser && ["FACULTY", "TA", "ADMIN"].includes(currentUser.role)
  );

  const a = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find(
      (x: Assignment) => x._id === aid && x.course === cid
    )
  ) as Assignment | undefined;

  const draft = useSelector(
    (s: RootState) => (s.assignmentsReducer as any).editorDrafts[aid]
  ) as any;

  useEffect(() => {
    if (a && !draft) {
      dispatch(
        initEditorDraft({
          _id: a._id,
          title: a.title,
          description: a.description,
          points: a.points,
          dueDate: toISO(a.dueDate ?? ""),
          availableFrom: toISO(a.availableFrom ?? ""),
          availableUntil: toISO(a.availableUntil ?? ""),
        })
      );
    }
  }, [a, draft, dispatch]);

  useEffect(() => {
    if (!canManage) {
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [canManage, router, cid]);

  if (!canManage) {
    return null;
  }

  if (!a) {
    return (
      <div className="p-3">
        <p className="text-danger mb-3">Assignment not found.</p>
        <Button variant="secondary" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    if (draft && a) {
      dispatch(
        updateAssignment({
          ...a,
          title: draft.title,
          description: draft.description,
          points: draft.points,
          dueDate: toISO(draft.dueDate ?? ""),
          availableFrom: toISO(draft.availableFrom ?? ""),
          availableUntil: toISO(draft.availableUntil ?? ""),
          editing: false,
        })
      );
      dispatch(clearEditorDraft(a._id));
    }
    router.back();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    if (a) dispatch(clearEditorDraft(a._id));
    router.back();
  };

  const boxStyle: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  };

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: 720 }}>
      <Form>
        <FormGroup className="mb-3">
          <FormLabel className="fw-bold">Assignment Name</FormLabel>
          <FormControl
            value={draft?.title ?? ""}
            onChange={(e) =>
              dispatch(
                setEditorDraft({ _id: aid, changes: { title: e.target.value } })
              )
            }
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel className="fw-bold">Description</FormLabel>
          <FormControl
            as="textarea"
            rows={5}
            value={draft?.description ?? DEFAULT_DESC}
            onChange={(e) =>
              dispatch(
                setEditorDraft({
                  _id: aid,
                  changes: { description: e.target.value },
                })
              )
            }
          />
        </FormGroup>

        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl
              type="number"
              min={0}
              value={Number.isNaN(draft?.points) ? 100 : draft?.points}
              onChange={(e) =>
                dispatch(
                  setEditorDraft({
                    _id: aid,
                    changes: { points: parseInt(e.target.value || "0", 10) },
                  })
                )
              }
            />
          </Col>
        </FormGroup>

        <FormGroup className="mb-3">
          <div className="p-3" style={boxStyle}>
            <div className="row g-3">
              <div className="col-12">
                <FormLabel className="mb-1">Due</FormLabel>
                <FormControl
                  type="date"
                  value={draft?.dueDate ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setEditorDraft({
                        _id: aid,
                        changes: { dueDate: e.target.value },
                      })
                    )
                  }
                />
              </div>
              <div className="col-6">
                <FormLabel className="mb-1">Available from</FormLabel>
                <FormControl
                  type="date"
                  value={draft?.availableFrom ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setEditorDraft({
                        _id: aid,
                        changes: { availableFrom: e.target.value },
                      })
                    )
                  }
                />
              </div>
              <div className="col-6">
                <FormLabel className="mb-1">Until</FormLabel>
                <FormControl
                  type="date"
                  value={draft?.availableUntil ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setEditorDraft({
                        _id: aid,
                        changes: { availableUntil: e.target.value },
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
        </FormGroup>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Button
            id="wd-cancel-assignment"
            variant="light"
            className="border"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button id="wd-save-assignment" variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
