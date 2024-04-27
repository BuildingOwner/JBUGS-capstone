import Sidebar from "../../../sidebar/Sidebar";
import QuizInfo from "../quizComponents/QuizInfo";
import Option1 from "../quizComponents/Option1";
import styles from "./DoQuiz.module.css";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'

const DoQuiz = () => {

  const optionIcon = [<Bs1Square size={27} />, <Bs2Square size={27} />, <Bs3Square size={27} />, <Bs4Square size={27} />]

  return (
    <div className={`background`}>
      <Sidebar />
      <div className={`mycontainer`}>
        <div className={`bg`}>
          <div className={styles.right}>
            <div className={styles.quizInfo}>
              <h3 className={styles.fontSize5xl}>이건 무슨 문제일까용?</h3>
              <div className={styles.quizInfoRight}>
                <h3 className={styles.fontSize5xl}>과목명</h3>
                <h3 className={styles.fontSize5xl}>분반</h3>
                <button type="button" className={`btn btn-primary ${styles.backBtn}`}>나가기</button>
              </div>
            </div>
            <div className={styles.rightBottom}>
              <div className={styles.quizContainer}>
                <h3 className={styles.question}>문제 나갑니다.</h3>
                <h3 className={styles.questionNumber}>1 of 10</h3>
                <div className={styles.choice}>
                  {optionIcon.map((num, i) => {
                    return (
                      <div className={styles.option}>
                        {num}
                        <h3 className={styles.optionText}>{i}번 보기</h3>
                      </div>
                    )
                  })}
                </div>
                <div className={styles.buttons}>
                  <button type="button" className={`btn btn-secondary`} style={{border: 'none'}}>이전 문제</button>
                  <button type="button" className={`btn btn-primary ${styles.featureBtn}`}>다음 문제</button>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.left}>
            <div className={styles.leftTime}>
              <h3 className={styles.fontSize5xl}>남은 시간</h3>
              <h3 className={styles.fontSize31xl}>3 : 17</h3>
            </div>
            <div className={styles.numberNav}>
              {/* 문제 받아오는 코드 작성 후 만들 예정 */}
              asd
            </div>
            <div className={styles.notice}>
              <h3 className={styles.fontSizeBase}>주의 사항</h3>
              <h3 className={styles.fontSizeBase}>asdf</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <form className="doquiz">
    //   <Sidebar />
    //   <main className="quiz-wrapper">
    //     <section className="content-wrap">
    //       <div className="content4">
    //         <QuizInfo />
    //         <div className="quiz-content">
    //           <div className="question">
    //             <h3 className="h31">문제 나갑니다.</h3>
    //             <div className="question-1-of">question 1 of 10</div>
    //           </div>
    //           <Option1 />
    //           <div className="bottom1">
    //             <button className="quiz-nav-btn">
    //               <div className="div50">이전 문제</div>
    //             </button>
    //             <button className="quiz-nav-btn1">
    //               <b className="b72">다음 문제</b>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="info-panel">
    //         <div className="time">
    //           <div className="div51">남은 시간</div>
    //           <div className="time-info">3 : 17</div>
    //         </div>
    //         <div className="navigator">
    //           <img
    //             className="number-icon"
    //             loading="lazy"
    //             alt=""
    //             src="/number-4.svg"
    //           />
    //           <img
    //             className="number-icon1"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon2"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon3"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon4"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon5"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon6"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon7"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon8"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //           <img
    //             className="number-icon9"
    //             loading="lazy"
    //             alt=""
    //             src="/number-5.svg"
    //           />
    //         </div>
    //         <div className="notice">
    //           <div className="info-panel-content">주의 사항</div>
    //         </div>
    //       </div>
    //     </section>
    //   </main>
    // </form>
  );
};

export default DoQuiz;
