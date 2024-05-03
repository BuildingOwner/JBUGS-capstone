import styles from "./QuizListItem.module.css"

const QuizListItem = (props) => {
  return (
    <div className={styles.quizListItem}>
      <div className={`${styles.idSubmitBox} ${props.quizScore != undefined ? styles.done : styles.yet}`}>
        {props.submissionStatus === true ?
          <h3 className={styles.idSubmitText}>응시 완료</h3>
          : <h3 className={styles.idSubmitText}>미응시</h3>}
      </div>
      {props.quizType === "PRACTICE" ? <h3 className={styles.text}>연습 문제</h3> :
        props.quizType === "EXAM" ? <h3 className={styles.text}>시험</h3> :
          <h3 className={styles.text}>실습 문제</h3>
      }
      <h3 className={styles.title}>{props.quizName}</h3>
      <h3 className={styles.text}>{props.timeLimit}</h3>
      <h3 className={styles.text}>{props.quizScore}</h3>
      <h3 className={styles.text}>{props.deadline}</h3>
      <button className={`btn btn-primary ${styles.feedbackBtn}`}>
        <h3 className={styles.feedbackText}>피드백 보기</h3>
      </button>
    </div>
  )
}

export default QuizListItem