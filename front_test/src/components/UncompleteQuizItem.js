import { memo, useMemo } from "react";
import styles from "./UncompleteQuizItem.module.css";

const UncompleteQuizItem = memo(({ propDisplay, propHeight }) => {
  const divStyle = useMemo(() => {
    return {
      display: propDisplay,
      height: propHeight,
    };
  }, [propDisplay, propHeight]);

  return (
    <div className={styles.uncompleteQuizItem}>
      <div className={styles.tltle}>
        <div className={styles.div}>3주차 연습문제</div>
      </div>
      <div className={styles.discreption}>
        <div className={styles.deadline}>
          <div className={styles.div1}>기간</div>
          <div className={styles.div2}>24 - 05 - 12</div>
        </div>
        <div className={styles.div3}>
          <p className={styles.p}>퀴즈에 대한 설명</p>
          <p className={styles.p}>2줄</p>
          <p className={styles.p}>3줄</p>
          <p className={styles.p}>4줄</p>
          <p className={styles.p}>5줄 긴거 ㅁㄴㅇㄹㄴㅇㄻ</p>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.info}>
          <div className={styles.time}>
            <div className={styles.div4}>제한 시간</div>
            <div className={styles.div5}>10 분</div>
          </div>
          <div className={styles.score}>
            <div className={styles.div6}>점수</div>
            <div className={styles.div7}>100 점</div>
          </div>
        </div>
        <div className={styles.goBtn}>
          <div className={styles.div8} style={divStyle}>
            퀴즈로 가기
          </div>
          <div className={styles.bxsrightArrow}>
            <img className={styles.vectorIcon} alt="" src="/vector-9.svg" />
          </div>
        </div>
      </div>
    </div>
  );
});

export default UncompleteQuizItem;
