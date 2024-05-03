import styles from "./QuizListItem.module.css"

const QuizListItem = ({data}) => {
  return (
    <div className={styles.quizListItem}>
      <div className={styles.idSubmitBox}>
        <h3 className={styles.idSubmitText}>응시 완료</h3>
      </div>
      <h3 className={styles.text}>연습 문제</h3>
      <h3 className={styles.title}>이거슨 제목 ㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹㅁㄴㅇㄹ</h3>
      <h3 className={styles.text}>제한 시간</h3>
      <h3 className={styles.text}>점수</h3>
      <h3 className={styles.text}>기한</h3>
      <button className={`btn btn-primary ${styles.feedbackBtn}`}>
        <h3 className={styles.feedbackText}>피드백 보기</h3>
      </button>
    </div>
  )
}

export default QuizListItem