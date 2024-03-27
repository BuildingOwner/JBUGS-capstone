import { memo, useMemo } from "react";
import styles from "./NoticeRow3.module.css";

const NoticeRow3 = memo(
  ({
    prop,
    prop1,
    propBackgroundColor,
    propPadding,
    propMinWidth,
    propMinWidth1,
  }) => {
    const status2Style = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
        padding: propPadding,
      };
    }, [propBackgroundColor, propPadding]);

    const b5Style = useMemo(() => {
      return {
        minWidth: propMinWidth,
      };
    }, [propMinWidth]);

    const title1Style = useMemo(() => {
      return {
        minWidth: propMinWidth1,
      };
    }, [propMinWidth1]);

    return (
      <div className={styles.noticeRow}>
        <div className={styles.line}>
          <div className={styles.num}>
            <div className={styles.div}>123</div>
          </div>
          <div className={styles.status} style={status2Style}>
            <b className={styles.b} style={b5Style}>
              {prop}
            </b>
          </div>
          <div className={styles.secret}>
            <div className={styles.pinFill}>
              <img className={styles.addQNA} alt="" src="/vector-7.svg" />
            </div>
          </div>
          <div className={styles.title} style={title1Style}>
            <div className={styles.titleText}>
              <p className={styles.p}>{prop1}</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </div>
          </div>
          <div className={styles.writer}>
            <div className={styles.div1}>김아무개</div>
          </div>
          <div className={styles.uploadDate}>
            <div className={styles.collapseButton}>2024-10-10</div>
          </div>
          <div className={styles.view}>
            <div className={styles.noticeItem}>50000</div>
          </div>
        </div>
      </div>
    );
  },
);

export default NoticeRow3;
