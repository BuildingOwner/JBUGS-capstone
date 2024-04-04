import Sidebar from "../../../sidebar/Sidebar";
import QuizInfo from "../quizComponents/QuizInfo";
import Option1 from "../quizComponents/Option1";
import "./DoQuiz.css";

const DoQuiz = () => {
  return (
    <form className="doquiz">
      <Sidebar />
      <main className="quiz-wrapper">
        <section className="content-wrap">
          <div className="content4">
            <QuizInfo />
            <div className="quiz-content">
              <div className="question">
                <h3 className="h31">문제 나갑니다.</h3>
                <div className="question-1-of">question 1 of 10</div>
              </div>
              <Option1 />
              <div className="bottom1">
                <button className="quiz-nav-btn">
                  <div className="div50">이전 문제</div>
                </button>
                <button className="quiz-nav-btn1">
                  <b className="b72">다음 문제</b>
                </button>
              </div>
            </div>
          </div>
          <div className="info-panel">
            <div className="time">
              <div className="div51">남은 시간</div>
              <div className="time-info">3 : 17</div>
            </div>
            <div className="navigator">
              <img
                className="number-icon"
                loading="lazy"
                alt=""
                src="/number-4.svg"
              />
              <img
                className="number-icon1"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon2"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon3"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon4"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon5"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon6"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon7"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon8"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
              <img
                className="number-icon9"
                loading="lazy"
                alt=""
                src="/number-5.svg"
              />
            </div>
            <div className="notice">
              <div className="info-panel-content">주의 사항</div>
            </div>
          </div>
        </section>
      </main>
    </form>
  );
};

export default DoQuiz;
