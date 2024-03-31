import { memo, useMemo } from "react";
import styles from "./QnaRow1.module.css";

const QnaRow1 = memo(
  ({ prop, propBackgroundColor, propPadding, propMinWidth }) => {
    const status1Style = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
        padding: propPadding,
      };
    }, [propBackgroundColor, propPadding]);

    const b3Style = useMemo(() => {
      return {
        minWidth: propMinWidth,
      };
    }, [propMinWidth]);

    return (
      <div className={styles.qnaRow}>
        <div className={styles.line}>
          <div className={styles.num}>
            <div className={styles.commentArea}>123</div>
          </div>
          <div className={styles.status} style={status1Style}>
            <b className={styles.b} style={b3Style}>
              {prop}
            </b>
          </div>
          <div className={styles.secret}>
            <img
              className={styles.icroundLockIcon}
              loading="lazy"
              alt=""
              src="/icroundlock1.svg"
            />
          </div>
          <div className={styles.title}>
            <div className={styles.titleText}>
              <p className={styles.p}>이거슨 제목</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </div>
            <div className={styles.comment}>[3]</div>
          </div>
          <div className={styles.writer}>
            <div className={styles.div}>김아무개</div>
          </div>
          <div className={styles.uploadDate}>
            <div className={styles.div1}>2024-10-10</div>
          </div>
          <div className={styles.view}>
            <div className={styles.div2}>50000</div>
          </div>
        </div>
      </div>
    );
  },
);

export default QnaRow1;
