"use client";

import { useParams } from "next/navigation";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { FaPlus } from "react-icons/fa6";
import { MdDoNotDisturbAlt } from "react-icons/md";
import GreenCheckmark from "./GreenCheckMark";
import ModuleEditor from "./ModuleEditor";
import {
  setModuleEditorOpen,
  setModuleNameDraft,
  addModule as addModuleAction,
} from "./reducer";

export default function ModulesControls({ canManage }: { canManage: boolean }) {
  const dispatch = useDispatch();
  const { cid } = useParams<{ cid: string }>();

  const show = useSelector((s: RootState) => s.modulesReducer.moduleEditorOpen);
  const moduleName = useSelector(
    (s: RootState) => s.modulesReducer.moduleNameDraft
  );

  const handleClose = () => dispatch(setModuleEditorOpen(false));
  const handleShow = () => dispatch(setModuleEditorOpen(true));

  const unpublishIconStyle: React.CSSProperties = {
    fontSize: 21,
    marginRight: 9,
    position: "relative",
    top: -1,
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {canManage && (
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
      )}

      {canManage && (
        <Dropdown className="float-end me-2">
          <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
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

      {canManage && (
        <ModuleEditor
          show={!!show}
          handleClose={handleClose}
          dialogTitle="Add Module"
          moduleName={moduleName}
          setModuleName={(t) => dispatch(setModuleNameDraft(t))}
          addModule={() => {
            dispatch(
              addModuleAction({ name: moduleName, course: String(cid) })
            );
            dispatch(setModuleNameDraft(""));
          }}
        />
      )}
    </div>
  );
}
