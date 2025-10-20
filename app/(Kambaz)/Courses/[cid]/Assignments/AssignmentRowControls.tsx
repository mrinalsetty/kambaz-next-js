import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";

export default function AssignmentRowControls() {
  return (
    <div className="d-inline-flex align-items-center">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 ms-3" />
    </div>
  );
}
