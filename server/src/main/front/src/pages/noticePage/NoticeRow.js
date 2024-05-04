import "./NoticeRow.css";
import { useState, useEffect } from "react";
const NoticeRow = (props) => {
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
    <div className="notice-row2">
      <div className="line14">
        <div className="num6">
          <div className="div204">123</div>
        </div>
        <div className="status22">
          {props.noticeStatus === "EXAM" ?
            <b className="b199">시험</b> :
            props.noticeStatus === "ONLINE" ? <b className="b199">온라인</b> :
             <b className="b199">대면 수업</b>}
        </div>
        <div className="secret5">
          <div className="pin-fill2">
            <img className="vector-icon51" alt="" src="/vector-71.svg" />
          </div>
        </div>
        <div className="title24">
          <div className="title-text4">
            <span className="title-text-txt">
              <p className="p121">{props.title}</p>
            </span>
          </div>
        </div>
        <div className="writer6">
          <div className="div205">{props.writer}</div>
        </div>
        <div className="upload-date6">
          <div className="div206">{formattedDate}</div>
        </div>
        <div className="view8">
          <div className="div207">{props.views}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRow;
