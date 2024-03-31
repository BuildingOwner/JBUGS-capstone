import { memo } from "react";
import styles from "./Component.module.css";

const Component = memo(() => {
  return (
    <div className={styles.div}>
      <b className={styles.b}>이름</b>
    </div>
  );
});

export default Component;
