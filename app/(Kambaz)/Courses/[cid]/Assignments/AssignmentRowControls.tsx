"use client";

import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentRowControls({
  assignmentId,
  onDelete,
}: {
  assignmentId: string;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="d-inline-flex align-items-center">
      <FaTrash
        className="text-danger me-3"
        role="button"
        title="Delete"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete(assignmentId);
        }}
      />
      <IoEllipsisVertical className="fs-4" title="More" />
    </div>
  );
}
