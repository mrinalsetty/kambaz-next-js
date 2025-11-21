"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";

export default function AssignmentGroupControls({
  weight,
  canEdit = false,
}: {
  weight: string;
  canEdit?: boolean;
}) {
  return (
    <div className="float-end d-flex align-items-center">
      <span
        className="me-3 px-3 py-1"
        style={{
          border: "1px solid #d0d7de",
          borderRadius: 999,
          backgroundColor: "#f3f4f6",
          color: "#2b363dff",
          lineHeight: 1.2,
        }}
      >
        {weight}
      </span>
      {canEdit && (
        <BsPlus
          className="me-3"
          style={{ fontSize: 22, color: "#2b363dff" }}
          role="button"
          title="Add item"
        />
      )}
      <IoEllipsisVertical
        className="fs-5"
        style={{ color: "#505b6aff" }}
        role="button"
        title="More"
      />
    </div>
  );
}
