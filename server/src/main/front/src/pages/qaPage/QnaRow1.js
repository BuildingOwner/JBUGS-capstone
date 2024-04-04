import { useMemo } from "react";
import "./QnaRow1.css";

const QnaRow1 = ({
  prop,
  propPadding,
  propBackgroundColor,
  propWidth,
  propDisplay,
  propMinWidth,
  propFlex,
}) => {
  const statusStyle = useMemo(() => {
    return {
      padding: propPadding,
      backgroundColor: propBackgroundColor,
      width: propWidth,
    };
  }, [propPadding, propBackgroundColor, propWidth]);

  const bStyle = useMemo(() => {
    return {
      display: propDisplay,
      minWidth: propMinWidth,
      flex: propFlex,
    };
  }, [propDisplay, propMinWidth, propFlex]);

  return (
    <div className="qna-row">
      <div className="line10">
        <div className="num3">
          <div className="comment-area">123</div>
        </div>
        <button className="status19" style={statusStyle}>
          <b className="b194" style={bStyle}>
            {prop}
          </b>
        </button>
        <div className="secret2">
          <img
            className="icround-lock-icon2"
            loading="lazy"
            alt=""
            src="/icroundlock.svg"
          />
        </div>
        <div className="title20">
          <div className="title-text1">
            <p className="p112">이거슨 제목</p>
            <p className="p113">2줄임</p>
            <p className="p114">3줄임</p>
          </div>
          <div className="comment3">[3]</div>
        </div>
        <div className="writer3">
          <div className="div189">김아무개</div>
        </div>
        <div className="upload-date3">
          <div className="div190">2024-10-10</div>
        </div>
        <div className="view5">
          <div className="div191">50000</div>
        </div>
      </div>
    </div>
  );
};

export default QnaRow1;
