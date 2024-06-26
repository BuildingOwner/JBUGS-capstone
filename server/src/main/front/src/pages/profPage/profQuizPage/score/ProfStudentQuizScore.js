import Sidebar from "../../../../sidebar/Sidebar";
import StudentItemTitle from "../../profScoreTitle/StudentItemTitle"
import StudentQuizItem from "./StudentQuizItem";
import "./ProfStudentQuizScore.css";

const ProfStudentQuizScore = () => {
  return (
    <div className="profstudentquizscore">
      <Sidebar />
      <main className="incomplete-container">
        <section className="content10">
          <StudentItemTitle
            title="퀴즈 제목"
            prop="학번"
            prop1="기한"
            prop2="1/14"
          />
          <div className="contents">
            <div className="contentswrap">
              <div className="header5">
                <div className="student-quiz-item">
                  <b className="b150">학번</b>
                </div>
                <div className="student-quiz-item1">
                  <b className="b151">이름</b>
                </div>
                <div className="student-quiz-item2">
                  <b className="b152">제출 일시</b>
                </div>
                <div className="student-quiz-item3">
                  <b className="b153">성적</b>
                </div>
                <div className="student-quiz-item4">
                  <b className="b154">제출 유무</b>
                </div>
              </div>
              <div className="list4">
                <StudentQuizItem />
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <StudentQuizItem/>
                <footer className="student-quiz-item5">
                  <div className="stunumber">
                    <div className="div94">1971084</div>
                  </div>
                  <div className="stuname">
                    <div className="div95">진승원</div>
                  </div>
                  <div className="date14">
                    <div className="div96">-</div>
                  </div>
                  <div className="score">
                    <div className="div97">-</div>
                  </div>
                  <div className="submit10">
                    <div className="wrapper18">
                      <b className="b155">미응시</b>
                    </div>
                  </div>
                </footer>
                <div className="student-quiz-item6">
                  <div className="stunumber1">
                    <div className="div98">1971084</div>
                  </div>
                  <div className="stuname1">
                    <div className="div99">진승원</div>
                  </div>
                  <div className="date15">
                    <div className="div100">-</div>
                  </div>
                  <div className="score1">
                    <div className="div101">-</div>
                  </div>
                  <div className="submit11">
                    <div className="wrapper19">
                      <b className="b156">미응시</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfStudentQuizScore;
