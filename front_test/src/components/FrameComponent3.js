import { memo } from "react";
import styles from "./FrameComponent3.module.css";

const FrameComponent3 = memo(() => {
  return (
    <div className={styles.contentInner}>
      <div className={styles.titleBarParent}>
        <div className={styles.titleBar}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>퀴즈 현황</h2>
          </div>
          <div className={styles.menuParent}>
            <div className={styles.menu}>
              <div className={styles.div}>제목</div>
              <div className={styles.bxsdownArrowWrapper}>
                <div className={styles.bxsdownArrow}>
                  <img
                    className={styles.vectorIcon}
                    alt=""
                    src="/vector-1.svg"
                  />
                </div>
              </div>
            </div>
            <div className={styles.search}>
              <div className={styles.searchInput} />
              <div className={styles.icon}>
                <img
                  className={styles.vectorIcon1}
                  alt=""
                  src="/vector-6.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <nav className={styles.dateInfo}>
          <div className={styles.date}>
            <b className={styles.b}>연습문제 평균</b>
            <b className={styles.b1}>90 점</b>
          </div>
          <div className={styles.date}>
            <b className={styles.b}>실습문제 평균</b>
            <b className={styles.b1}>80 점</b>
          </div>
          <div className={styles.date}>
            <b className={styles.b4}>퀴즈 수</b>
            <b className={styles.b5}>12</b>
          </div>
          <div className={styles.date}>
            <b className={styles.b6}>참여율</b>
            <b className={styles.b7}>89 %</b>
          </div>
        </nav>
      </div>
    </div>
  );
});

export default FrameComponent3;
