import { memo, useMemo } from "react";
import styles from "./Filelist.module.css";

const Filelist = memo(({ propMinWidth }) => {
  const txt1Style = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  return (
    <section className={styles.filelist}>
      <div className={styles.top}>
        <div className={styles.titleWrapper}>
          <b className={styles.title}>첨부 파일</b>
        </div>
        <div className={styles.upload}>
          <b className={styles.b}>파일 업로드</b>
        </div>
      </div>
      <div className={styles.fileList}>
        <div className={styles.fileitem}>
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
        <div className={styles.fileitem}>
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
        <div className={styles.fileitem}>
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
        <div className={styles.fileitem}>
          <div className={styles.l} />
          <div className={styles.fileItem}>
            <div className={styles.txt} style={txt1Style}>
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

export default Filelist;
