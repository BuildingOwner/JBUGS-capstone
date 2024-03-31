import { memo } from "react";
import styles from "./QuizContent.module.css";

const QuizContent = memo(() => {
  return (
    <div className={styles.quizContent}>
      <div className={styles.question}>
        <h3 className={styles.h3}>문제 나갑니다.</h3>
        <div className={styles.question1Of}>question 1 of 10</div>
      </div>
      <div className={styles.option}>
        <div className={styles.optionItem}>
          <img className={styles.numberIcon} alt="" src="/number.svg" />
          <div className={styles.optionText}>보기에용</div>
        </div>
        <div className={styles.optionItem1}>
          <img className={styles.numberIcon} alt="" src="/number.svg" />
          <div className={styles.optionText}>보기에용</div>
        </div>
        <div className={styles.optionItem1}>
          <img className={styles.numberIcon} alt="" src="/number.svg" />
          <div className={styles.optionText}>보기에용</div>
        </div>
        <div className={styles.optionItem1}>
          <img className={styles.numberIcon} alt="" src="/number.svg" />
          <div className={styles.optionText}>보기에용</div>
        </div>
      </div>
      <div className={styles.explane}>
        <div className={styles.div}>해설이용</div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.quizNavBtn}>
          <div className={styles.b}>이전 문제</div>
        </div>
        <div className={styles.quizNavBtn1}>
          <div className={styles.b}>해설 생성</div>
        </div>
        <div className={styles.quizNavBtn2}>
          <b className={styles.b}>다음 문제</b>
        </div>
      </div>
    </div>
  );
});

export default QuizContent;
