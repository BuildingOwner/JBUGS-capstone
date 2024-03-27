import { memo } from "react";
import Header from "./Header";
import styles from "./MakeQaModal.module.css";

const MakeQaModal = memo(() => {
  return (
    <div className={styles.makeqamodal}>
      <main className={styles.qAModal}>
        <Header qA={`Q&A 제목`} />
        <section className={styles.info}>
          <div className={styles.parent}>
            <b className={styles.b}>작성자</b>
            <div className={styles.privateMessage}>
              <b className={styles.b}>비밀글</b>
              <img
                className={styles.icroundLockIcon}
                loading="lazy"
                alt=""
                src="/icroundlock.svg"
              />
            </div>
          </div>
          <b className={styles.b2}>김아무개</b>
        </section>
        <section className={styles.group}>
          <b className={styles.b3}>설명</b>
          <b className={styles.b4}>
            <p className={styles.p}>내용</p>
            <p className={styles.p}>2</p>
            <p className={styles.p}>3</p>
            <p className={styles.p}>4</p>
            <p className={styles.p}>5</p>
            <p className={styles.p}>6</p>
            <p className={styles.p}>7</p>
            <p className={styles.p}>8</p>
            <p className={styles.p}>9</p>
            <p className={styles.p}>10</p>
          </b>
        </section>
        <section className={styles.files}>
          <div className={styles.titleParent}>
            <b className={styles.title}>첨부 파일</b>
            <div className={styles.upload}>
              <b className={styles.b5}>파일 업로드</b>
            </div>
          </div>
          <div className={styles.fileList}>
            <div className={styles.lParent}>
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
            <div className={styles.lParent}>
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
            <div className={styles.lParent}>
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
            <div className={styles.lParent}>
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
        </section>
      </main>
      <div className={styles.navBtnParent}>
        <div className={styles.navBtn}>
          <div className={styles.text}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>질문하기</b>
        </div>
      </div>
    </div>
  );
});

export default MakeQaModal;
