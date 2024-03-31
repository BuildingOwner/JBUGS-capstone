import { memo } from "react";
import Header1 from "./Header1";
import Filelist from "./Filelist";
import styles from "./MakeAssignmentModal1.module.css";

const MakeAssignmentModal = memo(() => {
  return (
    <div className={styles.makeassignmentmodal}>
      <main className={styles.headerParent}>
        <Header1 qA="과제 제목" questionSymbolDisplay="inline-block" />
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
        <section className={styles.parent}>
          <b className={styles.b6}>설명</b>
          <b className={styles.b7}>
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
        <Filelist />
      </main>
      <div className={styles.navBtnParent}>
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

export default MakeAssignmentModal;
