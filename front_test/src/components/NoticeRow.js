import { memo } from "react";
import styles from "./NoticeRow.module.css";

const NoticeRow = memo(() => {
  return (
    <div className={styles.noticeRow}>
      <div className={styles.line}>
        <div className={styles.num}>
          <div className={styles.div}>123</div>
        </div>
        <div className={styles.status}>
          <b className={styles.b}>온라인</b>
        </div>
        <div className={styles.secret}>
          <div className={styles.pinFill}>
            <img className={styles.vectorIcon} alt="" src="/vector-7.svg" />
          </div>
        </div>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <span className={styles.titleTextTxt}>
              <p className={styles.p}>온라인 강의 바꼈다~</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </span>
          </div>
        </div>
        <div className={styles.writer}>
          <div className={styles.b}>김아무개</div>
        </div>
        <div className={styles.uploadDate}>
          <div className={styles.b}>2024-10-10</div>
        </div>
        <div className={styles.view}>
          <div className={styles.b}>50000</div>
        </div>
      </div>
    </div>
  );
});

export default NoticeRow;
