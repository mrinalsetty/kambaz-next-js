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
import type { Module as CourseModule } from "../../client";

type Lesson = { _id?: string; name: string };

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();

  const [moduleName, setModuleName] = useState<string>("");

  const modules = useSelector(
    (state: RootState) => state.modulesReducer.modules
  ) as CourseModule[];

  const currentUser = useSelector(
    (state: RootState) => state.accountReducer.currentUser
  ) as { role?: string } | null;

  const role = currentUser?.role ?? "STUDENT";
  const isEditor = role === "FACULTY" || role === "TA" || role === "ADMIN";

  const dispatch = useDispatch();

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
          } as CourseModule);
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
          .filter((module: CourseModule) => module.course === cid)
          .map((module: CourseModule) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && module.name}
                {module.editing && isEditor && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModuleLocal({
                          ...module,
                          name: e.target.value,
                        })
                      )
                    }
                    onKeyDown={async (e) => {
                      if (e.key === "Enter" && cid) {
                        const updated = await client.updateModule(cid, {
                          ...module,
                          editing: false,
                        });
                        dispatch(
                          updateModuleLocal({
                            ...updated,
                            editing: false,
                          })
                        );
                      }
                    }}
                  />
                )}

                <ModuleControlButtons
                  moduleId={module._id!}
                  deleteModule={async (moduleId) => {
                    if (!cid) return;
                    await client.deleteModule(cid, moduleId);
                    dispatch(
                      setModules(modules.filter((m) => m._id !== moduleId))
                    );
                  }}
                  editModule={(moduleId) => {
                    dispatch(
                      updateModuleLocal({
                        ...module,
                        _id: moduleId,
                        editing: true,
                      })
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

export function ModulesFetcherWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

function useLoadModules(cid: string, dispatch: AppDispatch) {
  useEffect(() => {
    if (!cid) return;
    client.findModulesForCourse(cid).then((ms) => dispatch(setModules(ms)));
  }, [cid, dispatch]);
}
