import styles from "./QnaRow.module.css"
import { useState, useEffect } from "react";
import { FiLock } from "react-icons/fi";

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
    <div className={styles.row}>
      <h4 className={styles.num}>1</h4> {/*여기 날짜 순으로 번호 매겨놔 */}
      {props.qnAStatus === "COMPLETE" ?
        <div className={`${styles.answer} ${styles.answerDone}`}>
          <h4>답변 완료</h4>
        </div> :
        <div className={`${styles.answer} ${styles.answerYet}`}>
          <h4>답변 예정</h4>
        </div>}
      <div className={styles.secret}>
        <FiLock size={20}/>
      </div>
      <h4 className={styles.title}>{props.title}</h4>
      <h4 className={styles.writer}>{props.writer}</h4>
      <h4 className={styles.date}>{formattedDate}</h4>
      <h4 className={styles.views}>{props.views}</h4>
    </div>
  );
};

export default QnaRow;
