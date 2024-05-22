import { useMemo } from "react";
import "./StudentItemTitle.css";

const StudentItemTitle = ({
  title,
  prop,
  prop1,
  prop2,
  propWidth,
  propFlex,
  propDisplay,
  propMinWidth,
  propPadding,
  propMinWidth1,
}) => {
  const menuStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const div1Style = useMemo(() => {
    return {
      flex: propFlex,
      display: propDisplay,
      minWidth: propMinWidth,
    };
  }, [propFlex, propDisplay, propMinWidth]);

  const frameDivStyle = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const b6Style = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <div className="student-item-title">
      <div className="title-bar-parent1">
        <div className="title-bar3">
          <div className="background-color">
            <h2 className="title40">{title}</h2>
          </div>
          <div className="menu-parent2">
            <button className="menu9" style={menuStyle}>
              <div className="div334" style={div1Style}>
                {prop}
              </div>
              <div className="class-number">
                <div className="bxsdown-arrow10">
                  <img
                    className="color-picker-icon"
                    alt=""
                    src="/vector-53.svg"
                  />
                </div>
              </div>
            </button>
            <div className="search5">
              <div className="search-input5" />
              <div className="icon5">
                <img className="layout-grid-icon" alt="" src="/vector-64.svg" />
              </div>
            </div>
          </div>
        </div>
        <nav className="date-info7">
          <div className="parent12">
            <b className="b248">주차</b>
            <b className="b249">3주차</b>
          </div>
          <div className="parent13">
            <b className="b250">종료 일시</b>
            <b className="b251">2024-10-10</b>
          </div>
          <div className="parent14" style={frameDivStyle}>
            <b className="b252" style={b6Style}>
              {prop1}
            </b>
            <b className="b253">3일 남음</b>
          </div>
          <div className="parent15">
            <b className="b254">제출 인원</b>
            <b className="b255">{prop2}</b>
          </div>
          <div className="quiz-chapters">
            <div className="menu10">
              <div className="div335">학번 순</div>
              <div className="class-number1">
                <div className="bxsdown-arrow11">
                  <img
                    className="search-bar-icon"
                    alt=""
                    src="/vector-53.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default StudentItemTitle;
