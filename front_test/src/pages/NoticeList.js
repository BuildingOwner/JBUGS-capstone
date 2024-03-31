import Sidebars from "../components/Sidebars";
import Top1 from "../components/Top1";
import NoticeRow1 from "../components/NoticeRow1";
import NoticeRow from "../components/NoticeRow";
import styles from "./NoticeList.module.css";

const NoticeList = () => {
  return (
    <div className={styles.noticelist}>
      <Sidebars />
      <main className={styles.contentWrapper}>
        <section className={styles.content}>
          <Top1 />
          <div className={styles.list}>
            <nav className={styles.tab}>
              <div className={styles.tabItem}>
                <div className={styles.my}>전체 공지</div>
              </div>
              <div className={styles.tabItem1}>
                <div className={styles.my1}>시험</div>
              </div>
              <div className={styles.tabItem2}>
                <div className={styles.my2}>온라인</div>
              </div>
              <div className={styles.tabItem3}>
                <div className={styles.my3}>대면수업</div>
              </div>
            </nav>
            <div className={styles.colName}>
              <div className={styles.num} />
              <div className={styles.status}>
                <div className={styles.div}>구분</div>
              </div>
              <div className={styles.pin} />
              <div className={styles.title}>
                <div className={styles.div}>제목</div>
              </div>
              <div className={styles.writer}>
                <div className={styles.div2}>작성자</div>
              </div>
              <div className={styles.uploadDate}>
                <div className={styles.div2}>작성일</div>
              </div>
              <div className={styles.view}>
                <div className={styles.div2}>조회수</div>
              </div>
            </div>
            <div className={styles.table}>
              <NoticeRow1 prop="시험" prop1="시험공지임" />
              <NoticeRow1
                prop="시험"
                prop1="시험공지임"
                propBackgroundColor="#39a7ff"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
                propPadding1="2.128rem 1.011rem 2.122rem 1.017rem"
                propPadding2="3.5px 3px"
                propMinWidth1="5rem"
              />
              <NoticeRow1
                prop="시험"
                prop1="시험공지임"
                propBackgroundColor="#39a7ff"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
                propPadding1="2.128rem 1.011rem 2.122rem 1.017rem"
                propPadding2="3.5px 3px"
                propMinWidth1="5rem"
              />
              <NoticeRow1
                prop="대면 수업"
                prop1="대면수업 제끼겠습니다. ^^"
                propBackgroundColor="#b4d9f0"
                propPadding="var(--padding-3xs) 0.861rem"
                propMinWidth="4.389rem"
                propPadding1="2.122rem 1.011rem 2.128rem 1.017rem"
                propPadding2="3.5px 3px"
                propMinWidth1="12.333rem"
              />
              <NoticeRow1
                prop="대면 수업"
                prop1="대면수업 제끼겠습니다. ^^"
                propBackgroundColor="#b4d9f0"
                propPadding="var(--padding-3xs) 0.861rem"
                propMinWidth="4.389rem"
                propPadding1="2.122rem 1.011rem 2.128rem 1.017rem"
                propPadding2="3.5px 3px"
                propMinWidth1="12.333rem"
              />
              <NoticeRow1
                prop="대면 수업"
                prop1="대면수업 제끼겠습니다. ^^"
                propBackgroundColor="#b4d9f0"
                propPadding="var(--padding-3xs) 0.861rem"
                propMinWidth="4.389rem"
                propPadding1="2.122rem 1.011rem 2.128rem 1.017rem"
                propPadding2="3.5px 3px"
                propMinWidth1="12.333rem"
              />
              <NoticeRow1
                prop="온라인"
                prop1="온라인 강의 바꼈다~"
                propBackgroundColor="#87c4ff"
                propPadding="var(--padding-3xs) var(--padding-9xl)"
                propMinWidth="3rem"
                propPadding1="2.122rem 1.011rem 2.128rem 1.017rem"
                propPadding2="0.172rem var(--padding-10xs) 0.161rem"
                propMinWidth1="9.444rem"
              />
              <NoticeRow />
              <NoticeRow />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NoticeList;
