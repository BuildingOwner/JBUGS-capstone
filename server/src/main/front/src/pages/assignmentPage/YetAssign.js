import { useEffect, useState } from "react";
import "./YetAssign.css";

const ListRow1 = (props) => {
  const [formattedDate, setFormattedDate] = useState()

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = date.getDate().toString().padStart(2, '0'); // 일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    // 포맷팅된 문자열 생성
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const inputDate = props.dueDate
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])
  return (
    <div className="list-row2">
      <button className="submit16">
        {props.status === "NOT_SUBMITTED" ? (
          <b className="b224">미제출</b>
        ) : <b className="b224">제출</b>
        }
      </button>
      <div className="div281">
        <span>
          <p className="p182">{props.title}</p>
        </span>
      </div>
      <div className="div282">{props.weekId}주차</div>
      <div className="div283">{formattedDate}</div>
      <div className="div284">-</div>
    </div>
  );
};

export default ListRow1;
