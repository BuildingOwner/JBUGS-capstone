import { memo, useMemo } from "react";
import styles from "./Top3.module.css";

const Top3 = memo(({ title, prop, propMinWidth, propWidth, propMinWidth1 }) => {
  const title2Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const frameDivStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const b6Style = useMemo(() => {
    return {
      minWidth: propMinWidth1,
    };
  }, [propMinWidth1]);

  return (
    <div className={styles.top}>
      <h1 className={styles.title} style={title2Style}>
        {title}
      </h1>
      <div className={styles.topInner} style={frameDivStyle}>
        <div className={styles.menuParent}>
          <div className={styles.menu}>
            <div className={styles.div}>제목</div>
            <div className={styles.bxsdownArrow}>
              <img className={styles.vectorIcon} alt="" src="/vector-1.svg" />
            </div>
          </div>
          <div className={styles.search}>
            <div className={styles.searchInput} />
            <div className={styles.icon}>
              <img className={styles.vectorIcon1} alt="" src="/vector-61.svg" />
            </div>
          </div>
          <div className={styles.addQna}>
            <b className={styles.b} style={b6Style}>
              {prop}
            </b>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Top3;
