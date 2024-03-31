import Sidebars8 from "../components/Sidebars8";
import FrameComponent4 from "../components/FrameComponent4";
import Bottom2 from "../components/Bottom2";
import styles from "./ProfStudentAssignInfo.module.css";

const ProfStudentAssignInfo = () => {
  return (
    <div className={styles.profstudentassigninfo}>
      <Sidebars8 />
      <main className={styles.padding}>
        <section className={styles.content}>
          <FrameComponent4 />
          <Bottom2 />
        </section>
      </main>
    </div>
  );
};

export default ProfStudentAssignInfo;
