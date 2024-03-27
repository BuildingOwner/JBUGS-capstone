import Sidebars1 from "../components/Sidebars1";
import FrameComponent from "../components/FrameComponent";
import Bottom from "../components/Bottom";
import styles from "./QuizList.module.css";

const QuizList = () => {
  return (
    <div className={styles.quizlist}>
      <Sidebars1 />
      <main className={styles.contentWrapper}>
        <section className={styles.content}>
          <FrameComponent />
          <Bottom />
        </section>
      </main>
    </div>
  );
};

export default QuizList;
