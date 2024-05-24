import Sidebar from "../../../../sidebar/Sidebar";
import FrameComponent3 from "./FrameComponent3";
import Bottom1 from "./Bottom1";
import "./ProfStudentQuizInfo.css";

const ProfStudentQuizInfo = () => {
  return (
    <div className="profstudentquizinfo">
      <Sidebar />
      <main className="padding">
        <section className="content8">
          <FrameComponent3 />
          <Bottom1 />
        </section>
      </main>
    </div>
  );
};

export default ProfStudentQuizInfo;
