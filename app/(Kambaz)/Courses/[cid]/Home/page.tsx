import Modules from "../Modules/page";
import CourseStatus from "./Status";
import People from "../People";
export default function Home() {
  return (
    <div id="wd-home">
      <div className="d-flex" id="wd-home">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-lg-block" style={{ width: 360 }}>
          <CourseStatus />
          <People />
        </div>
      </div>
    </div>
  );
}
