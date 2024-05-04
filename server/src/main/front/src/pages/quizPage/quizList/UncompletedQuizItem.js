import styles from "./UncompletedQuizItem.module.css"
import { FaCaretRight } from "react-icons/fa";
import { useState, useEffect } from "react";
const UncompleteQuizItem = (props) => {
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
    const inputDate = props.deadline
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])
  return(
    <div className={styles.container}>
      <h3 className={styles.title}>{props.quizName}</h3>
      <div className={styles.duration}>
        <h3>기간</h3>
        <h3>{formattedDate}</h3>
      </div>
      <h3 className={styles.description}>{props.description}</h3>
      <div className={styles.bottom}>
        <div className={styles.bottomInfo}>
          <div className={styles.time}>
            <h3>제한 시간</h3>
            <h3>{props.timeLimit}</h3>
          </div>
          <div className={styles.score}>
            <h3>점수</h3>
            <h3>{props.quizScore}</h3>
          </div>
        </div>
        <button type="button" className={`btn btn-primary ${styles.goBtn}`}>
          <h3>퀴즈로 가기</h3>
          <FaCaretRight size={20} />
        </button>
      </div>
    </div>
  )
}

export default UncompleteQuizItem;