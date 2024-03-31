import Sidebars2 from "../components/Sidebars2";
import Component from "../components/Component";
import QuizContent from "../components/QuizContent";
import InfoPanel from "../components/InfoPanel";
import styles from "./QuizAnswer.module.css";

const QuizAnswer = () => {
  return (
    <div className={styles.quizanswer}>
      <Sidebars2 />
      <main className={styles.contentParent}>
        <section className={styles.content}>
          <div className={styles.quizInfo}>
            <div className={styles.quizName}>이건 무슨 퀴즈 일까용??!!??</div>
            <nav className={styles.courceNameParent}>
              <b className={styles.courceName}>과목명</b>
              <b className={styles.division}>분반</b>
              <Component />
            </nav>
          </div>
          <QuizContent />
        </section>
        <InfoPanel />
      </main>
    </div>
  );
};

export default QuizAnswer;
