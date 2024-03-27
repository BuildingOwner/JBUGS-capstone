import { memo, useMemo } from "react";
import styles from "./Header1.module.css";

const Header1 = memo(({ qA, questionSymbolDisplay }) => {
  const qAStyle = useMemo(() => {
    return {
      display: questionSymbolDisplay,
    };
  }, [questionSymbolDisplay]);

  return (
    <section className={styles.header}>
      <h3 className={styles.qa} style={qAStyle}>
        {qA}
      </h3>
      <div className={styles.questionSymbol}>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.nestedFilesIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
    </section>
  );
});

export default Header1;
