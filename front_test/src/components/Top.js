import { memo } from "react";
import styles from "./Top.module.css";

const Top = memo(() => {
  return (
    <div className={styles.top}>
      <h3 className={styles.h3}>퀴즈 제목</h3>
      <div className={styles.heroiconsOutlinex}>
        <img
          className={styles.vectorIcon}
          loading="lazy"
          alt=""
          src="/vector.svg"
        />
      </div>
    </div>
  );
});

export default Top;
