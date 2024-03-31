import { memo } from "react";
import styles from "./Top1.module.css";

const Top1 = memo(() => {
  return (
    <div className={styles.top}>
      <h1 className={styles.title}>공지사항</h1>
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
            <div className={styles.iconWrapper}>
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
      </div>
    </div>
  );
});

export default Top1;
