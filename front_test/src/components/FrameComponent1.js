import { memo } from "react";
import styles from "./FrameComponent1.module.css";

const FrameComponent1 = memo(() => {
  return (
    <header className={styles.contentInner}>
      <div className={styles.titleBarParent}>
        <div className={styles.titleBar}>
          <div className={styles.titleWrapper}>
            <h2 className={styles.title}>과제</h2>
          </div>
          <div className={styles.symbolInstance}>
            <div className={styles.menu}>
              <div className={styles.div}>제목</div>
              <div className={styles.bxsdownArrow}>
                <img className={styles.vectorIcon} alt="" src="/vector-1.svg" />
              </div>
            </div>
            <div className={styles.search}>
              <div className={styles.searchInput} />
              <div className={styles.icon}>
                <img
                  className={styles.foregroundIcon}
                  alt=""
                  src="/vector-6.svg"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.background}>
          <div className={styles.tabItem2}>
            <div className={styles.text}>전체보기</div>
          </div>
          <div className={styles.tabItem21}>
            <div className={styles.text1}>제출 완료</div>
          </div>
          <div className={styles.tabItem22}>
            <div className={styles.text2}>미제출</div>
          </div>
          <div className={styles.tabItem21}>
            <div className={styles.text1}>체점 완료</div>
          </div>
        </div>
      </div>
    </header>
  );
});

export default FrameComponent1;
