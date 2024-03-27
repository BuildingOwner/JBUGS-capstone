import { memo, useMemo } from "react";
import styles from "./LFileItemList.module.css";

const LFileItemList = memo(({ propMinWidth }) => {
  const txtStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <section className={styles.lFileItemList}>
      <div className={styles.top}>
        <div className={styles.uploadButton}>
          <b className={styles.title}>첨부 파일</b>
        </div>
        <div className={styles.upload}>
          <b className={styles.b}>파일 업로드</b>
        </div>
      </div>
      <div className={styles.fileList}>
        <div className={styles.lFileitemName}>
          <div className={styles.l} />
          <div className={styles.fileItem}>
            <div className={styles.txt}>파일이름임.txt</div>
          </div>
        </div>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <div className={styles.fileList}>
        <div className={styles.lFileitemName}>
          <div className={styles.l} />
          <div className={styles.fileItem}>
            <div className={styles.txt}>파일이름임.txt</div>
          </div>
        </div>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <div className={styles.fileList}>
        <div className={styles.lFileitemName}>
          <div className={styles.l} />
          <div className={styles.fileItem}>
            <div className={styles.txt}>파일이름임.txt</div>
          </div>
        </div>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.vectorIcon}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <div className={styles.fileList}>
        <div className={styles.lFileitemName}>
          <div className={styles.l} />
          <div className={styles.fileItem}>
            <div className={styles.txt} style={txtStyle}>
              파일이름임.txt
            </div>
          </div>
        </div>
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

export default LFileItemList;
