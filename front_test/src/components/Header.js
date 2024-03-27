import { memo } from "react";
import styles from "./Header.module.css";

const Header = memo(({ qA }) => {
  return (
    <section className={styles.header}>
      <h3 className={styles.qa}>{qA}</h3>
      <div className={styles.heroiconsOutlinexWrapper}>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
    </section>
  );
});

export default Header;
