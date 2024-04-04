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
        <QuizRow />
        <QuizRow />
      </div>
    </div>
  );
};

export default Bottom;
