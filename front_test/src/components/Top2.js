import { memo } from "react";
import styles from "./Top2.module.css";

const Top2 = memo(() => {
  return (
    <div className={styles.top}>
      <h1 className={styles.title}>QnA</h1>
      <div className={styles.topInner}>
        <div className={styles.menuParent}>
          <div className={styles.menu}>
            <div className={styles.div}>제목</div>
            <div className={styles.bxsdownArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector-1.svg" />
            </div>
          </div>
          <div className={styles.search}>
            <div className={styles.searchInput} />
            <div className={styles.icon}>
              <img className={styles.vectorIcon1} alt="" src="/vector-61.svg" />
            </div>
          </div>
          <div className={styles.addQna}>
            <b className={styles.b}>질문하기</b>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Top2;
