import { useMemo } from "react";
import "./QuizInfo.css";

const QuizInfo = ({ propDisplay, propWidth }) => {
  const quizNameStyle = useMemo(() => {
    return {
      display: propDisplay,
    };
  }, [propDisplay]);

  const courceInfoStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  return (
    <div className="quiz-info">
      <div className="quiz-name" style={quizNameStyle}>
        이건 무슨 퀴즈 일까용??!!??
      </div>
      <nav className="cource-info1" style={courceInfoStyle}>
        <b className="cource-name1">과목명</b>
        <b className="division5">분반</b>
        <button className="quiz-quit-btn">
          <b className="b203">나가기</b>
        </button>
      </nav>
    </div>
  );
};

export default QuizInfo;
