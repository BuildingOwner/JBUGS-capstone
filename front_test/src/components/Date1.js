import { memo } from "react";
import styles from "./Date1.module.css";

const Date1 = memo(() => {
  return (
    <div className={styles.date}>
      <b className={styles.b}>제출 여부</b>
      <div className={styles.submit}>
        <b className={styles.b1}>제출 완료</b>
      </div>
    </div>
  );
});

export default Date1;
