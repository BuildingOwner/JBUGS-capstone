import { useMemo } from "react";
import "./StudentQuizItem.css";

const StudentQuizItem = ({
  prop,
  progressBar,
  prop1,
  studentQuizItemAlignSelf,
  studentQuizItemWidth,
  divMinWidth,
  listContainerPadding,
  listContainerBackgroundColor,
  bMinWidth,
  studentQuizItemFlex,
  studentQuizItemPadding,
}) => {
  const studentQuizItemStyle = useMemo(() => {
    return {
      alignSelf: studentQuizItemAlignSelf,
      width: studentQuizItemWidth,
      flex: studentQuizItemFlex,
      padding: studentQuizItemPadding,
    };
  }, [
    studentQuizItemAlignSelf,
    studentQuizItemWidth,
    studentQuizItemFlex,
    studentQuizItemPadding,
  ]);

  const div2Style = useMemo(() => {
    return {
      minWidth: divMinWidth,
    };
  }, [divMinWidth]);

  const listContainerStyle = useMemo(() => {
    return {
      padding: listContainerPadding,
      backgroundColor: listContainerBackgroundColor,
    };
  }, [listContainerPadding, listContainerBackgroundColor]);

  const b7Style = useMemo(() => {
    return {
      minWidth: bMinWidth,
    };
  }, [bMinWidth]);

  return (
    <div className="student-quiz-item7" style={studentQuizItemStyle}>
      <div className="stunumber16">
        <div className="submit22">1971084</div>
      </div>
      <div className="stuname16">
        <div className="div336">진승원</div>
      </div>
      <div className="date44">
        <div className="div337" style={div2Style}>
          {prop}
        </div>
      </div>
      <div className="score23">
        <div className="progress-bar1">{progressBar}</div>
      </div>
      <div className="submit23">
        <button className="list-container" style={listContainerStyle}>
          <b className="b256" style={b7Style}>
            {prop1}
          </b>
        </button>
      </div>
    </div>
  );
};

export default StudentQuizItem;
