"use client";

import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="float-end">
      <FaPencil
        className="text-primary me-3"
        role="button"
        title="Edit module name"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          editModule(moduleId);
        }}
      />
      <FaTrash
        className="text-danger me-2 mb-1"
        role="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          deleteModule(moduleId);
        }}
        title="Delete module"
      />
      <GreenCheckmark />
      <BsPlus className="fs-1" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
