"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckMark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  const currentUser = useSelector(
    (s: RootState) => s.accountReducer.currentUser
  );
  const role = currentUser?.role ?? "STUDENT";
  const isEditor = role === "FACULTY" || role === "TA" || role === "ADMIN";
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const unpublishIconStyle: React.CSSProperties = {
    fontSize: 21,
    marginRight: 9,
    position: "relative",
    top: -1,
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {isEditor && (
        <>
          <Button
            variant="danger"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
            onClick={handleShow}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Module
          </Button>

          <Dropdown className="float-end me-2">
            <DropdownToggle
              variant="secondary"
              size="lg"
              id="wd-publish-all-btn"
            >
              <GreenCheckmark /> Publish All
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem id="wd-publish-all-modules-and-items">
                <GreenCheckmark /> Publish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-publish-modules-only">
                <GreenCheckmark /> Publish modules only
              </DropdownItem>
              <DropdownItem id="wd-unpublish-all-modules-and-items">
                <MdDoNotDisturbAlt style={unpublishIconStyle} />
                Unpublish all modules and items
              </DropdownItem>
              <DropdownItem id="wd-unpublish-modules-only">
                <MdDoNotDisturbAlt style={unpublishIconStyle} />
                Unpublish modules only
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      )}

      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>

      {isEditor && (
        <ModuleEditor
          show={show}
          handleClose={handleClose}
          dialogTitle="Add Module"
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={addModule}
        />
      )}
    </div>
  );
}
