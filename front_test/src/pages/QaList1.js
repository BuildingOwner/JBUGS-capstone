import Sidebars4 from "../components/Sidebars4";
import Top3 from "../components/Top3";
import QnaRow3 from "../components/QnaRow3";
import QnaRow2 from "../components/QnaRow2";
import styles from "./QaList1.module.css";

const QaList = () => {
  return (
    <div className={styles.qalist}>
      <Sidebars4 />
      <main className={styles.contentWrapper}>
        <section className={styles.content}>
          <Top3 title="QnA" prop="질문하기" />
          <div className={styles.list}>
            <nav className={styles.tab}>
              <div className={styles.tabItem}>
                <div className={styles.my}>전체 질문</div>
              </div>
              <div className={styles.tabItem1}>
                <div className={styles.my1}>내 질문</div>
              </div>
              <div className={styles.tabItem}>
                <div className={styles.my}>답변 완료</div>
              </div>
            </nav>
            <div className={styles.colName}>
              <div className={styles.num} />
              <div className={styles.status}>
                <div className={styles.div}>답변</div>
              </div>
              <div className={styles.secret}>
                <div className={styles.div1}>비밀글</div>
              </div>
              <div className={styles.title}>
                <div className={styles.div}>제목</div>
              </div>
              <div className={styles.writer}>
                <div className={styles.div1}>작성자</div>
              </div>
              <div className={styles.uploadDate}>
                <div className={styles.div1}>작성일</div>
              </div>
              <div className={styles.view}>
                <div className={styles.div1}>조회수</div>
              </div>
            </div>
            <div className={styles.table}>
              <QnaRow3 prop="완료" />
              <QnaRow3
                prop="완료"
                propBackgroundColor="#72bd92"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
              />
              <QnaRow3
                prop="완료"
                propBackgroundColor="#72bd92"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
              />
              <QnaRow3
                prop="완료"
                propBackgroundColor="#72bd92"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
              />
              <QnaRow3
                prop="완료"
                propBackgroundColor="#72bd92"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
              />
              <QnaRow3
                prop="완료"
                propBackgroundColor="#72bd92"
                propPadding="var(--padding-3xs) var(--padding-18xl)"
                propMinWidth="2rem"
              />
              <QnaRow3
                prop="답변 예정"
                propBackgroundColor="#f49e9e"
                propPadding="var(--padding-3xs) 0.861rem"
                propMinWidth="4.389rem"
              />
              <QnaRow2 />
              <QnaRow2 />
              <QnaRow2 />
              <QnaRow2 />
              <QnaRow2 />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QaList;
