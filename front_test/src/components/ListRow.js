import { memo, useMemo } from "react";
import styles from "./ListRow.module.css";

const ListRow = memo(({ prop, propBackgroundColor, propPadding }) => {
  const submitStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
      padding: propPadding,
    };
  }, [propBackgroundColor, propPadding]);

  return (
    <div className={styles.listRow}>
      <div className={styles.submit} style={submitStyle}>
        <b className={styles.b}>{prop}</b>
      </div>
      <div className={styles.div}>
        <span>
          <p className={styles.p}>3주차 과제</p>
          <p className={styles.p}>2</p>
          <p className={styles.p}>3</p>
        </span>
      </div>
      <div className={styles.div1}>3 주차</div>
      <div className={styles.div2}>24-03-24 23:59</div>
      <div className={styles.div3}>-</div>
    </div>
  );
});

export default ListRow;
