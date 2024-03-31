import { memo } from "react";
import styles from "./QuizRow.module.css";

const QuizRow = memo(() => {
  return (
    <div className={styles.quizRow}>
      <div className={styles.line}>
        <div className={styles.status}>
          <b className={styles.b}>미응시</b>
        </div>
        <div className={styles.secret}>
          <div className={styles.b}>심화 문제</div>
        </div>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <span className={styles.titleTextTxt}>
              <p className={styles.p}>이거슨 제목</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </span>
          </div>
        </div>
        <div className={styles.writer}>
          <div className={styles.b}>10 분</div>
        </div>
        <div className={styles.score}>
          <div className={styles.b}>-</div>
        </div>
        <div className={styles.deadline}>
          <div className={styles.b}>2024-10-10</div>
        </div>
        <div className={styles.feedback}>
          <div className={styles.b}>비활성화</div>
        </div>
      </div>
    </div>
  );
});

export default QuizRow;
