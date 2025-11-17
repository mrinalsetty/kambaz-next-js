"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../store";
import { setModules, updateModuleLocal } from "./reducer";
import * as client from "../../client";

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

  const [moduleName, setModuleName] = useState<string>("");

  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as Module[];

  const dispatch = useDispatch();

  // Load modules for this course id
  useLoadModules(cid, dispatch as AppDispatch);

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={async () => {
          if (!cid) return;
          const newModule = await client.createModuleForCourse(cid, {
            name: moduleName,
            course: cid,
          });
          dispatch(setModules([...modules, newModule]));
          setModuleName("");
        }}
      />
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
                        updateModuleLocal({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        // persist update
                        client
                          .updateModule({ ...module, editing: false })
                          .then((updated) => {
                            dispatch(
                              updateModuleLocal({ ...updated, editing: false })
                            );
                          });
                      }
                    }}
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={async (moduleId) => {
                    await client.deleteModule(moduleId);
                    dispatch(
                      setModules(modules.filter((m) => m._id !== moduleId))
                    );
                  }}
                  editModule={(moduleId) => {
                    // reference moduleId to satisfy lint and ensure correct id
                    dispatch(
                      updateModuleLocal({ ...module, _id: moduleId, editing: true })
                    );
                  }}
                />
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

// Fetch modules when cid changes
export function ModulesFetcherWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

// side effect
function useLoadModules(cid: string | undefined, dispatch: AppDispatch) {
  useEffect(() => {
    if (!cid) return;
    client.findModulesForCourse(cid).then((ms) => dispatch(setModules(ms)));
  }, [cid, dispatch]);
}
