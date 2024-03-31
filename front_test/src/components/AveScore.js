import { memo } from "react";
import styles from "./AveScore.module.css";

const AveScore = memo(({ prop, prop1 }) => {
  return (
    <div className={styles.aveScore}>
      <div className={styles.div}>{prop}</div>
      <div className={styles.div1}>{prop1}</div>
      <div className={styles.grade}>
        <div className={styles.fluentEmojiHighContrastred}>
          <img className={styles.vectorIcon} alt="" src="/vector-71.svg" />
        </div>
        <div className={styles.dataCollector}>23%</div>
      </div>
    </div>
  );
});

export default AveScore;
