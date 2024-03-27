import { memo } from "react";
import Top from "./Top";
import Info from "./Info";
import styles from "./ProfEditQuizModal.module.css";

const ProfEditQuizModal = memo(() => {
  return (
    <div className={styles.profeditquizmodal}>
      <Top />
      <main className={styles.scroll}>
        <div className={styles.deadline}>
          <div className={styles.deadline1}>
            <b className={styles.b}>종료 기한</b>
            <b className={styles.quizLimitedPerson}>2024-00-00 00 : 00</b>
          </div>
          <div className={styles.time}>
            <b className={styles.b}>제한 시간</b>
            <b className={styles.b2}>60 분</b>
          </div>
        </div>
        <Info
          prop="응시 인원"
          prop1="0/14"
          propMinWidth="96px"
          propMinWidth1="44px"
        />
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
          <div className={styles.bottomNavigationBar}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text}>수정 하기</b>
        </div>
      </div>
    </div>
  );
});

export default ProfEditQuizModal;
