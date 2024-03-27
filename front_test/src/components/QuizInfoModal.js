import { memo } from "react";
import Top from "./Top";
import Info from "./Info";
import styles from "./QuizInfoModal.module.css";

const QuizInfoModal = memo(() => {
  return (
    <div className={styles.quizinfomodal}>
      <Top />
      <main className={styles.scroll}>
        <div className={styles.deadline}>
          <div className={styles.deadline1}>
            <b className={styles.b}>종료 기한</b>
            <b className={styles.minutes}>2024-00-00 00 : 00</b>
          </div>
          <div className={styles.time}>
            <b className={styles.b}>제한 시간</b>
            <b className={styles.b2}>60 분</b>
          </div>
        </div>
        <Info prop="점수" prop1="- 점 / 100 점" />
        <section className={styles.discription}>
          <b className={styles.b3}>설명</b>
          <b className={styles.b4}>
            <p className={styles.p}>이거슨 설명입니다</p>
            <p className={styles.p}>2</p>
            <p className={styles.p}>3</p>
            <p className={styles.p}>4</p>
            <p className={styles.p}>5</p>
            <p className={styles.p}>6</p>
            <p className={styles.p}>7</p>
            <p className={styles.p}>8</p>
            <p className={styles.p}>9</p>
            <p className={styles.p}>
              10ㅗㅓㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ
            </p>
            <p className={styles.p}>11</p>
            <p className={styles.p}>
              12 ㅁㄴㅇㄹㄴㅇㄻㄴㅇㄹㄻㄴㅇㄻㄻㄴㅇㄻㄴㄹ
            </p>
          </b>
        </section>
      </main>
      <div className={styles.bottom}>
        <div className={styles.navBtn}>
          <div className={styles.text}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>응시 하기</b>
        </div>
      </div>
    </div>
  );
});

export default QuizInfoModal;
