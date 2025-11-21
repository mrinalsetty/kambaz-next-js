"use client";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  deleteModule as deleteModuleAction,
  updateModule as updateModuleAction,
  editModule as editModuleAction,
} from "./reducer";

type Lesson = { _id: string; name: string };
type Module = {
  _id: string;
  name: string;
  course: string;
  lessons?: Lesson[];
  editing?: boolean;
};

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();

  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as Module[];
  interface User {
    _id: string;
    username: string;
    role: string;
  }
  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser as User | null
  );
  const canManage =
    currentUser && ["FACULTY", "TA", "ADMIN"].includes(currentUser.role);

  const dispatch = useDispatch();

  return (
    <div>
      <ModulesControls canManage={!!canManage} />
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

                {!module.editing && module.name}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModuleAction({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(
                          updateModuleAction({ ...module, editing: false })
                        );
                      }
                    }}
                  />
                )}

                {canManage && (
                  <ModuleControlButtons
                    moduleId={module._id}
                    deleteModule={(moduleId) =>
                      dispatch(deleteModuleAction(moduleId))
                    }
                    editModule={(moduleId) =>
                      dispatch(editModuleAction(moduleId))
                    }
                  />
                )}
              </div>

              <ListGroup className="wd-lessons rounded-0">
                {(module.lessons ?? []).map((lesson: Lesson) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1"
                  >
                    <BsGripVertical className="me-2 fs-3" />
                    <span className="ms-4">{lesson.name}</span>
                    {canManage && <LessonControlButtons />}
                  </ListGroupItem>
                ))}
              </ListGroup>
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
