import { memo } from "react";
import Filelist from "./Filelist";
import styles from "./AssignmentInfoModal1.module.css";

const AssignmentInfoModal = memo(() => {
  return (
    <div className={styles.assignmentinfomodal}>
      <div className={styles.header}>
        <h3 className={styles.h3}>과제 제목</h3>
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
      <main className={styles.scroll}>
        <div className={styles.dateInfo}>
          <div className={styles.date}>
            <b className={styles.b}>종료 일시</b>
            <b className={styles.b1}>2024-10-10</b>
          </div>
          <div className={styles.dateParent}>
            <div className={styles.date1}>
              <b className={styles.b}>마감 기한</b>
              <b className={styles.b1}>2024-10-10</b>
            </div>
            <div className={styles.date2}>
              <b className={styles.b4}>최종 수정 일시</b>
              <b className={styles.b5}>2024-10-10</b>
            </div>
          </div>
        </div>
        <section className={styles.submitInfo}>
          <b className={styles.b}>제출 현황</b>
          <b className={styles.b7}>-</b>
        </section>
        <section className={styles.parent}>
          <b className={styles.b8}>설명</b>
          <b className={styles.b9}>
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
        <Filelist propMinWidth="unset" />
      </main>
      <div className={styles.navBtnParent}>
        <div className={styles.navBtn}>
          <div className={styles.text}>취소</div>
        </div>
        <div className={styles.navBtn1}>
          <b className={styles.text1}>수정하기</b>
        </div>
      </div>
    </div>
  );
});

export default AssignmentInfoModal;
