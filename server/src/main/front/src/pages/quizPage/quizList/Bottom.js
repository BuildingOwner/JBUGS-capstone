import QuizRow1 from "./QuizRow1";
import QuizRow from "./QuizRow";
import "./Bottom.css";

const Bottom = () => {
  return (
    <div className="bottom15">
      <div className="menu4">
        <div className="div259">퀴즈 전체보기</div>
        <div className="bxsdown-arrow5">
          <img className="vector-icon73" alt="" src="/vector-5.svg" />
        </div>
      </div>
      <div className="col-name4">
        <div className="line27">
          <div className="status25">
            <div className="div260">응시</div>
          </div>
          <div className="secret8">
            <div className="div261">문제 분류</div>
          </div>
          <div className="title29">
            <div className="title-text7">제목</div>
          </div>
          <div className="writer9">
            <div className="div262">제한 시간</div>
          </div>
          <div className="score20">
            <div className="div263">점수</div>
          </div>
          <div className="deadline8">
            <div className="div264">기한</div>
          </div>
          <div className="feedback2">
            <div className="div265">피드백</div>
          </div>
        </div>
      </div>
      <div className="list6">
        <QuizRow1 />
        <QuizRow1 />
        <QuizRow1 />
        <footer className="quiz-row2">
          <div className="line28">
            <button className="status26">
              <b className="b212">미응시</b>
            </button>
            <div className="secret9">
              <div className="div266">심화 문제</div>
            </div>
            <div className="title30">
              <div className="title-text8">
                <p className="p176">이거슨 제목</p>
                <p className="p177">2줄임</p>
                <p className="p178">3줄임</p>
              </div>
            </div>
            <div className="writer10">
              <div className="div267">10 분</div>
            </div>
            <div className="score21">
              <div className="div268">-</div>
            </div>
            <div className="deadline9">
              <div className="div269">2024-10-10</div>
            </div>
            <div className="feedback3">
              <div className="div270">비활성화</div>
            </div>
          </div>
        </footer>
        <QuizRow />
        <QuizRow />
      </div>
    </div>
  );
};

export default Bottom;
