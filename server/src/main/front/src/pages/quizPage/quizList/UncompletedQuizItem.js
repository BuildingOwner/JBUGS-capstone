import styles from "./UncompletedQuizItem.module.css"
import { FaCaretRight } from "react-icons/fa";

const UncompleteQuizItem = ({data}) => {
  return(
    <div className={styles.container}>
      <h3 className={styles.title}>ㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹ</h3>
      <div className={styles.duration}>
        <h3>기간</h3>
        <h3>24-05-12</h3>
      </div>
      <h3 className={styles.description}>ㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹㅁㄴㅇㄹㄴㄹㄴㅁㅇㄻㄴㅇㄹ</h3>
      <div className={styles.bottom}>
        <div className={styles.bottomInfo}>
          <div className={styles.time}>
            <h3>제한 시간</h3>
            <h3>10분</h3>
          </div>
          <div className={styles.score}>
            <h3>점수</h3>
            <h3>100w점</h3>
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