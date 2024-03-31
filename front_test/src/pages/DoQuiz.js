import Sidebars3 from "../components/Sidebars3";
import styles from "./DoQuiz.module.css";

const DoQuiz = () => {
  return (
    <form className={styles.doquiz}>
      <Sidebars3 />
      <main className={styles.contentParent}>
        <section className={styles.content}>
          <div className={styles.quizInfo}>
            <div className={styles.quizName}>이건 무슨 퀴즈 일까용??!!??</div>
            <nav className={styles.courceInfo}>
              <b className={styles.courceName}>과목명</b>
              <b className={styles.division}>분반</b>
              <b className={styles.division}>이름</b>
            </nav>
          </div>
          <div className={styles.quizContent}>
            <div className={styles.question}>
              <h3 className={styles.h3}>문제 나갑니다.</h3>
              <div className={styles.question1Of}>question 1 of 10</div>
            </div>
            <div className={styles.option}>
              <div className={styles.optionItem}>
                <img className={styles.numberIcon} alt="" src="/number.svg" />
                <div className={styles.optionText}>보기에용</div>
              </div>
              <div className={styles.optionItem}>
                <img className={styles.numberIcon} alt="" src="/number.svg" />
                <div className={styles.optionText}>보기에용</div>
              </div>
              <div className={styles.optionItem}>
                <img className={styles.numberIcon} alt="" src="/number.svg" />
                <div className={styles.optionText}>보기에용</div>
              </div>
              <div className={styles.optionItem}>
                <img className={styles.numberIcon} alt="" src="/number.svg" />
                <div className={styles.optionText}>보기에용</div>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.quizNavBtn}>
                <div className={styles.div}>이전 문제</div>
              </div>
              <div className={styles.quizNavBtn1}>
                <b className={styles.b1}>다음 문제</b>
              </div>
            </div>
          </div>
        </section>
        <div className={styles.infoPanel}>
          <div className={styles.time}>
            <div className={styles.div1}>남은 시간</div>
            <div className={styles.timeInfo}>3 : 17</div>
          </div>
          <div className={styles.navigator}>
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-4.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
            <img
              className={styles.numberIcon4}
              loading="lazy"
              alt=""
              src="/number-5.svg"
            />
          </div>
          <div className={styles.notice}>
            <div className={styles.infoPanelContent}>주의 사항</div>
          </div>
        </div>
      </main>
    </form>
  );
};

export default DoQuiz;
