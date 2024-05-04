import "./QnaRow.css";
import { useState, useEffect } from "react";
const QnaRow = (props) => {
  const [formattedDate, setFormattedDate] = useState()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = date.getDate().toString().padStart(2, '0'); // 일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    // 포맷팅된 문자열 생성
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const inputDate = props.createdAt
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])
  return (
    <div className="qna-row1">
      <div className="line11">
        <div className="num4">
          <div className="div192">{props.qnaId}</div>
        </div>
        <div className="status20">
          {props.qnAStatus === "RESPONSE_EXPECTED" ? <b className="b195">답변 예정</b> :
            <b className="b195">답변 완료</b>
          }

        </div>
        <div className="secret3">
          <img className="icround-lock-icon3" alt="" src="/icroundlock.svg" />
        </div>
        <div className="title21">
          <div className="title-text2">
            <span>
              <p className="p115">{props.title}</p>
            </span>
          </div>
          <div className="comment4">[3]</div>
        </div>
        <div className="writer4">
          <div className="div193">{props.writer}</div>
        </div>
        <div className="upload-date4">
          <div className="div194">{formattedDate}</div>
        </div>
        <div className="view6">
          <div className="div195">{props.views}</div>
        </div>
      </div>
    </div>
  );
};

export default QnaRow;
