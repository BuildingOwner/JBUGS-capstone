import { memo, useMemo } from "react";
import styles from "./Info.module.css";

const Info = memo(({ prop, prop1, propMinWidth, propMinWidth1 }) => {
  const bStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const b1Style = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <section className={styles.info}>
      <div className={styles.score}>
        <b className={styles.b} style={bStyle}>
          {prop}
        </b>
        <b className={styles.b1} style={b1Style}>
          {prop1}
        </b>
      </div>
      <div className={styles.percent}>
        <b className={styles.b2}>반영 비율</b>
        <b className={styles.b3}>5 % / 20 %</b>
      </div>
      <div className={styles.time}>
        <b className={styles.b}>분류</b>
        <b className={styles.b5}>연습 문제</b>
      </div>
    </section>
  );
});

export default Info;
