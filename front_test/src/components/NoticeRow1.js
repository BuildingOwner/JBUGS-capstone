import { memo, useMemo } from "react";
import styles from "./NoticeRow1.module.css";

const NoticeRow1 = memo(
  ({
    prop,
    prop1,
    propBackgroundColor,
    propPadding,
    propMinWidth,
    propPadding1,
    propPadding2,
    propMinWidth1,
  }) => {
    const statusStyle = useMemo(() => {
      return {
        backgroundColor: propBackgroundColor,
        padding: propPadding,
      };
    }, [propBackgroundColor, propPadding]);

    const b2Style = useMemo(() => {
      return {
        minWidth: propMinWidth,
      };
    }, [propMinWidth]);

    const secretStyle = useMemo(() => {
      return {
        padding: propPadding1,
      };
    }, [propPadding1]);

    const pinFillStyle = useMemo(() => {
      return {
        padding: propPadding2,
      };
    }, [propPadding2]);

    const titleStyle = useMemo(() => {
      return {
        minWidth: propMinWidth1,
      };
    }, [propMinWidth1]);

    return (
      <div className={styles.noticeRow}>
        <div className={styles.line}>
          <div className={styles.num}>
            <div className={styles.writerLabel}>123</div>
          </div>
          <div className={styles.status} style={statusStyle}>
            <b className={styles.b} style={b2Style}>
              {prop}
            </b>
          </div>
          <div className={styles.secret} style={secretStyle}>
            <div className={styles.pinFill} style={pinFillStyle}>
              <img
                className={styles.noticeRowData}
                alt=""
                src="/vector-7.svg"
              />
            </div>
          </div>
          <div className={styles.title} style={titleStyle}>
            <div className={styles.titleText}>
              <p className={styles.p}>{prop1}</p>
              <p className={styles.p}>2줄임</p>
              <p className={styles.p}>3줄임</p>
            </div>
          </div>
          <div className={styles.writer}>
            <div className={styles.div}>김아무개</div>
          </div>
          <div className={styles.uploadDate}>
            <div className={styles.div1}>2024-10-10</div>
          </div>
          <div className={styles.view}>
            <div className={styles.tableColumnName}>50000</div>
          </div>
        </div>
      </div>
    );
  },
);

export default NoticeRow1;
