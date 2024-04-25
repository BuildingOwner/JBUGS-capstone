import Sidebar from "../../../sidebar/Sidebar";
import FrameComponent1 from "./FrameComponent1";
import Bottom from "./Bottom";
import "./QuizList.css";

const QuizList = () => {
  return (
    <div className="quizlist">
      <Sidebar />
      <main className="content-container">
        <section className="content6">
          <FrameComponent1 />
          <Bottom />
        </section>
      </main>
    </div>
  );
};

export default QuizList;
