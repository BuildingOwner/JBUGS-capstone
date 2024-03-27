import { memo } from "react";
import styles from "./CourseItem.module.css";

const CourseItem = memo(() => {
  return (
    <div className={styles.courseItem}>
      <div className={styles.courseLeft}>
        <div className={styles.personicon}>
          <img className={styles.vectorIcon} alt="" src="/vector-41.svg" />
        </div>
        <div className={styles.info}>
          <h2 className={styles.h2}>강좌명</h2>
          <div className={styles.logicBranch}>
            <div className={styles.valueComparator}>
              <div className={styles.div}>교수님성함</div>
              <div className={styles.div1}>전공선택</div>
            </div>
            <div className={styles.div2}>월 13 ~ 14.5</div>
          </div>
        </div>
      </div>
      <div className={styles.coueseRight}>
        <div className={styles.division}>
          <h2 className={styles.a}>A</h2>
        </div>
        <div className={styles.rightArrow}>
          <img
            className={styles.groupIcon}
            loading="lazy"
            alt=""
            src="/group1.svg"
          />
        </div>
      </div>
    </div>
  );
});

export default CourseItem;
