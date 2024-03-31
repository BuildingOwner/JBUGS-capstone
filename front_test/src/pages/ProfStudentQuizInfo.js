import Sidebars7 from "../components/Sidebars7";
import FrameComponent3 from "../components/FrameComponent3";
import Bottom1 from "../components/Bottom1";
import styles from "./ProfStudentQuizInfo.module.css";

const ProfStudentQuizInfo = () => {
  return (
    <div className={styles.profstudentquizinfo}>
      <Sidebars7 />
      <main className={styles.padding}>
        <section className={styles.content}>
          <FrameComponent3 />
          <Bottom1 />
        </section>
      </main>
    </div>
  );
};

export default ProfStudentQuizInfo;
