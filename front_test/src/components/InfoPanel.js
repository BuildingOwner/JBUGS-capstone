import { memo } from "react";
import styles from "./InfoPanel.module.css";

const InfoPanel = memo(() => {
  return (
    <div className={styles.infoPanel}>
      <div className={styles.time}>
        <div className={styles.myScore}>
          <div className={styles.div}>나의 점수</div>
        </div>
        <div className={styles.div1}>75 점</div>
      </div>
      <div className={styles.navigator}>
        <img
          className={styles.numberIcon}
          loading="lazy"
          alt=""
          src="/number-4.svg"
        />
        <img
          className={styles.numberIcon1}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon2}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon3}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon4}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon5}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon6}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon7}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon8}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
        <img
          className={styles.numberIcon9}
          loading="lazy"
          alt=""
          src="/number-5.svg"
        />
      </div>
      <div className={styles.notice}>
        <div className={styles.infopanelTitle}>주의 사항</div>
      </div>
    </div>
  );
});

export default InfoPanel;
