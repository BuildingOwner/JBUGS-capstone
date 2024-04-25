import Sidebar from "../../../sidebar/Sidebar";
import QuizInfo from "../quizComponents/QuizInfo";
import Option1 from "../quizComponents/Option1";
import InfoPanel from "./InfoPanel";
import "./QuizAnswer.css";

const QuizAnswer = () => {
  return (
    <div className="quizanswer">
      <Sidebar />
      <main className="content-wrap-wrapper">
        <section className="content-wrap1">
          <div className="content5">
            <QuizInfo propDisplay="inline-block" propWidth="16rem" />
            <div className="quiz-content1">
              <div className="question1">
                <h3 className="h32">문제 나갑니다.</h3>
                <div className="question-1-of1">question 1 of 10</div>
              </div>
              <Option1 propBackgroundColor="#b4d9f0" propBorderBottom="unset" />
              <textarea
                className="explane"
                placeholder="해설이용"
                rows={15}
                cols={38}
              />
              <div className="bottom2">
                <button className="quiz-nav-btn2">
                  <div className="div52">이전 문제</div>
                </button>
                <button className="quiz-nav-btn3">
                  <b className="b73">다음 문제</b>
                </button>
              </div>
            </div>
          </div>
          <InfoPanel />
        </section>
      </main>
    </div>
  );
};

export default QuizAnswer;
