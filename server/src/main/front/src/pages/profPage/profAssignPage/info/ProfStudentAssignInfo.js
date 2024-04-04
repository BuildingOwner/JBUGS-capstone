import Sidebar from "../../../../sidebar/Sidebar";
import FrameComponent4 from "./FrameComponent4";
import Bottom2 from "./Bottom2";
import "./ProfStudentAssignInfo.css";

const ProfStudentAssignInfo = () => {
  return (
    <div className="profstudentassigninfo">
      <Sidebar />
      <main className="padding1">
        <section className="content9">
          <FrameComponent4 />
          <Bottom2 />
        </section>
      </main>
    </div>
  );
};

export default ProfStudentAssignInfo;
