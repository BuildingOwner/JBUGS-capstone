import { memo } from "react";
import styles from "./NoticeModal1.module.css";

const NoticeModal = memo(() => {
  return (
    <div className={styles.noticemodal}>
      <div className={styles.header}>
        <h3 className={styles.h3}>공지사항 제목</h3>
        <div className={styles.heroiconsOutlinex}>
          <img
            className={styles.iconX}
            loading="lazy"
            alt=""
            src="/vector.svg"
          />
        </div>
      </div>
      <main className={styles.scroll}>
        <nav className={styles.info}>
          <div className={styles.owner}>
            <b className={styles.b}>작성자</b>
            <b className={styles.b1}>교수님</b>
          </div>
          <div className={styles.date}>
            <b className={styles.b}>작성일</b>
            <b className={styles.b3}>2024-10-10</b>
          </div>
          <div className={styles.owner}>
            <b className={styles.b}>조회수</b>
            <b className={styles.b5}>50000</b>
          </div>
          <div className={styles.answer}>
            <b className={styles.b6}>구분</b>
            <div className={styles.status}>
              <b className={styles.b7}>시험</b>
            </div>
          </div>
        </nav>
        <section className={styles.discription}>
          <b className={styles.b6}>설명</b>
          <b className={styles.b9}>
            <p className={styles.p}>시험 준비물은 ~~</p>
            <p className={styles.p}>5</p>
            <p className={styles.p}>&nbsp;</p>
            <p className={styles.p}>3467</p>
            <p className={styles.p}>7</p>
            <p className={styles.p}>8</p>
            <p className={styles.p}>9</p>
            <p className={styles.p}>9</p>
            <p className={styles.p}>4</p>
            <p className={styles.p}>64</p>
            <p className={styles.p}>&nbsp;</p>
            <p className={styles.p}>4</p>
            <p className={styles.p}>&nbsp;</p>
          </b>
        </section>
      </main>
      <div className={styles.btunsection}>
        <div className={styles.navBtn}>
          <div className={styles.text}>닫기</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>작성하기</b>
        </div>
      </div>
    </div>
  );
});

export default NoticeModal;
