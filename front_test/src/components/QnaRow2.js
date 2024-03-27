import { memo } from "react";
import styles from "./QnaRow2.module.css";

const QnaRow2 = memo(() => {
  return (
    <div className={styles.qnaRow}>
      <div className={styles.line}>
        <div className={styles.num}>
          <div className={styles.div}>123</div>
        </div>
        <div className={styles.status}>
          <b className={styles.b}>답변 예정</b>
        </div>
        <div className={styles.secret}>
          <img
            className={styles.icroundLockIcon}
            alt=""
            src="/icroundlock1.svg"
          />
        </div>
        <div className={styles.title}>
          <div className={styles.titleText}>
            <span>
              <p className={styles.p}>이거슨 제목</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </span>
          </div>
          <div className={styles.comment}>[3]</div>
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

export default QnaRow2;
