import { memo } from "react";
import styles from "./FileUploadModal1.module.css";

const FileUploadModal = memo(() => {
  return (
    <div className={styles.fileuploadmodal}>
      <div className={styles.parent}>
        <b className={styles.b}>파일 업로드</b>
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
      </div>
      <main className={styles.frameParent}>
        <div className={styles.carWrapper}>
          <div className={styles.car}>
            <b className={styles.b1}>{`주차 : `}</b>
            <div className={styles.menuWrapper}>
              <div className={styles.menu}>
                <div className={styles.div}>주차</div>
                <div className={styles.bxsdownArrowWrapper}>
                  <div className={styles.bxsdownArrow}>
                    <img
                      className={styles.vectorIcon1}
                      alt=""
                      src="/vector-1.svg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className={styles.fileInput}>
          <div className={styles.fileinput}>
            <div className={styles.fileInputfileInput}>
              <b className={styles.b2}>{`자료명 : `}</b>
              <div className={styles.div1}>자료명을 입력해주세요</div>
            </div>
            <div className={styles.fileAddButton}>
              <div className={styles.wrapper}>
                <div className={styles.div2}>파일추가</div>
              </div>
            </div>
          </div>
          <div className={styles.fileinput}>
            <div className={styles.fileInputfileInput}>
              <b className={styles.b}>동영상명 :</b>
              <div className={styles.div3}>영상 제목을 입력해주세요</div>
            </div>
            <div className={styles.fileAddButton}>
              <div className={styles.wrapper}>
                <div className={styles.div2}>영상추가</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className={styles.fileuploadmodalChild} />
      <div className={styles.navbtn}>
        <div className={styles.navBtn}>
          <div className={styles.text}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>업로드</b>
        </div>
      </div>
    </div>
  );
});

export default FileUploadModal;
