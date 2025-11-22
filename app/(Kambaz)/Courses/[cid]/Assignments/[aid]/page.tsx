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
import { useEffect, useMemo, useState } from "react";
import { updateAssignment } from "../../Assignments/reducer";
import * as coursesClient from "../../../client";
import type { Assignment as BaseAssignment } from "../../../client";

type Assignment = BaseAssignment & {
  description?: string;
  points?: number;
  dueDate?: string;
  availableFrom?: string;
  availableUntil?: string;
  editing?: boolean;
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

  const a = useSelector((s: RootState) =>
    s.assignmentsReducer.assignments.find(
      (x) => x._id === aid && x.course === cid
    )
  ) as Assignment | undefined;
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  ) as { role?: string } | null;
  const role = currentUser?.role ?? "STUDENT";
  const isEditor = role === "FACULTY" || role === "TA" || role === "ADMIN";

  useEffect(() => {
    if (!isEditor && cid) {
      router.replace(`/Courses/${cid}/Assignments`);
    }
  }, [isEditor, cid, router]);

  const init = useMemo(
    () => ({
      title: a?.title ?? "New Assignment",
      description: (a?.description && a.description.trim()) || DEFAULT_DESC,
      points: a?.points ?? 100,
      dueDate: toISO(a?.dueDate ?? ""),
      availableFrom: toISO(a?.availableFrom ?? ""),
      availableUntil: toISO(a?.availableUntil ?? ""),
    }),
    [a]
  );

  const [title, setTitle] = useState(init.title);
  const [description, setDescription] = useState(init.description);
  const [points, setPoints] = useState<number>(init.points);
  const [dueDate, setDueDate] = useState(init.dueDate);
  const [availableFrom, setAvailableFrom] = useState(init.availableFrom);
  const [availableUntil, setAvailableUntil] = useState(init.availableUntil);

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

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    const updated = await coursesClient.updateAssignment({
      ...a,
      title,
      description,
      points,
      dueDate: toISO(dueDate),
      availableFrom: toISO(availableFrom),
      availableUntil: toISO(availableUntil),
    });
    dispatch(updateAssignment({ ...updated, editing: false }));
    router.back();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    router.back();
  };

  const boxStyle: React.CSSProperties = {
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    backgroundColor: "#ffffff",
  };

  if (!isEditor) {
    return null;
  }

  return (
    <div id="wd-assignments-editor" className="p-3" style={{ maxWidth: 720 }}>
      <Form>
        <FormGroup className="mb-3">
          <FormLabel className="fw-bold">Assignment Name</FormLabel>
          <FormControl
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            readOnly={!isEditor}
          />
        </FormGroup>

        <FormGroup className="mb-3">
          <FormLabel className="fw-bold">Description</FormLabel>
          <FormControl
            as="textarea"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            readOnly={!isEditor}
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
              value={Number.isNaN(points) ? 100 : points}
              onChange={(e) => setPoints(parseInt(e.target.value || "0", 10))}
              readOnly={!isEditor}
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
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  readOnly={!isEditor}
                />
              </div>
              <div className="col-6">
                <FormLabel className="mb-1">Available from</FormLabel>
                <FormControl
                  type="date"
                  value={availableFrom}
                  onChange={(e) => setAvailableFrom(e.target.value)}
                  readOnly={!isEditor}
                />
              </div>
              <div className="col-6">
                <FormLabel className="mb-1">Until</FormLabel>
                <FormControl
                  type="date"
                  value={availableUntil}
                  onChange={(e) => setAvailableUntil(e.target.value)}
                  readOnly={!isEditor}
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
          {isEditor && (
            <Button
              id="wd-save-assignment"
              variant="danger"
              onClick={handleSave}
            >
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
