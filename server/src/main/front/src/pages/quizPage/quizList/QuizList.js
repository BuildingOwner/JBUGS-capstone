import Sidebar from "../../../sidebar/Sidebar";
import FrameComponent1 from "./FrameComponent1";
import Bottom from "./Bottom";
import styles from "./QuizList.module.css"
import QuizScoreBar from "./QuizScoreBar";
import { LuTriangle } from "react-icons/lu";
import UncompleteQuizItem from "./UncompleteQuizItem";

const QuizList = () => {

  const quizScoreData = [
    { "quizName": "AD", "score": 94, },
    { "quizName": "bc", "score": 78, },
    { "quizName": "asdf", "score": 100, },
    { "quizName": "A123wqasdfasdfadfafsdfasdfade", "score": 90, },
    { "quizName": "hgf", "score": 65, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
    { "quizName": "pl", "score": 30, },
  ]

  const uncompleteQuizItem = [{ "asdf": "1" }, { asdf: "adsf" }, { asdf: "adsf" }, { asdf: "adsf" }, { asdf: "adsf" }]
  return (
    <div className={`background`}>
      <Sidebar />
      <div className={`mycontainer`}>
        <div className={`bg`}>
          <div className={`${styles.top}`}>
            <div className={styles.myInfo}>
              <h3 className={styles.title}>퀴즈</h3>
              <div className={styles.scoreBoard}>
                {quizScoreData.map((data, i) => {
                  return (
                    <QuizScoreBar quizScoreData={data} key={`quizScoreBar${i}`} />
                  )
                })}
              </div>
              <div className={styles.aveInfo}>
                <div className={styles.aveScore}>
                  <h3 className={styles.textSmallGray}>평균 점수</h3>
                  <h3>40 점</h3>
                  <div className={styles.myPosition}>
                    <LuTriangle />
                    <h3>23%</h3>
                  </div>
                </div>
                <div className={styles.aveScore}>
                  <h3 className={styles.textSmallGray}>평균 등수</h3>
                  <h3>19 등</h3>
                  <div className={styles.myPosition}>
                    <LuTriangle />
                    <h3>23%</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.topRight}>
              <div className={styles.uncompleteQuizs}>
                <h3>미응시 퀴즈</h3>
                <div className={styles.uncompleteQuizsContainer}>
                </div>
              </div>
              <div className={styles.weeks}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="quizlist">
    //   <Sidebar />
    //   <main className="content-container">
    //     <section className="content6">
    //       <FrameComponent1 />
    //       <Bottom />
    //     </section>
    //   </main>
    // </div>
  );
};

export default QuizList;
