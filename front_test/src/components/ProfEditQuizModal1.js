import { memo } from "react";
import styles from "./ProfEditQuizModal1.module.css";

const ProfEditQuizModal = memo(() => {
  return (
    <div className={styles.profeditquizmodal}>
      <div className={styles.top}>
        <h3 className={styles.h3}>퀴즈 제목</h3>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <main className={styles.scroll}>
        <div className={styles.deadline}>
          <div className={styles.deadline1}>
            <b className={styles.b}>종료 기한</b>
            <b className={styles.minutesMarker}>2024-00-00 00 : 00</b>
          </div>
          <div className={styles.time}>
            <b className={styles.b}>제한 시간</b>
            <b className={styles.b2}>60 분</b>
          </div>
        </div>
        <section className={styles.info}>
          <div className={styles.score}>
            <b className={styles.b}>응시 인원</b>
            <b className={styles.practicingQuizProblem}>0/14</b>
          </div>
          <div className={styles.percent}>
            <b className={styles.b}>반영 비율</b>
            <b className={styles.b5}>5 % / 20 %</b>
          </div>
          <div className={styles.time1}>
            <b className={styles.b6}>분류</b>
            <b className={styles.b7}>연습 문제</b>
          </div>
        </section>
        <section className={styles.discription}>
          <b className={styles.b6}>설명</b>
          <b className={styles.b9}>
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
          <div className={styles.bottomNavBar}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text}>수정 하기</b>
        </div>
      </div>
    </div>
  );
});

export default ProfEditQuizModal;
