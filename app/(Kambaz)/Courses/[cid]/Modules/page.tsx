"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import * as db from "../../../Database";

type Lesson = { _id: string; name: string };
type Module = { _id: string; name: string; course: string; lessons?: Lesson[] };

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const modules: Module[] = db.modules as Module[];

  return (
    <div>
      <ModulesControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        {modules
          .filter((module: Module) => module.course === cid)
          .map((module: Module) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {module.name}
                <ModuleControlButtons />
              </div>

              <ListGroup className="wd-lessons rounded-0">
                {(module.lessons ?? []).map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <span className="ms-4">{lesson.name}</span>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
