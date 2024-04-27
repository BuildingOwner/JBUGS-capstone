import Sidebar from "../../../sidebar/Sidebar";
import QuizInfo from "../quizComponents/QuizInfo";
import Option1 from "../quizComponents/Option1";
import InfoPanel from "./InfoPanel";
import styles from "../doQuiz/DoQuiz.module.css";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'

const QuizAnswer = () => {

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
              <div className={styles.answerQuizContainer}>
                <h3 className={styles.question}>문제 나갑니다.</h3>
                <h3 className={styles.questionNumber}>1 of 10</h3>
                <div className={styles.choice}>
                  {optionIcon.map((num, i) => {
                    return (
                      <div className={styles.answerOption}>
                        {num}
                        {/* {i번째 보기가 정답인 경우 style.correct, 오답인 경우 style.wrong 클래스 넣으면 됨 유저가 찍은 답을 먼저 wrong클래스 넣고 그다음 정답을 correct넣으면 알아서 초록색으로 될껴} */}
                        <h3 className={styles.optionText}>{i}번 보기</h3>
                      </div>
                    )
                  })}
                </div>
                <p className={styles.answerContainer}>해설 생성 가능</p>
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
            <div className={styles.answerFeatureBtns}>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`}>해설 생성</button>
              <button type="button" className={`btn btn-primary ${styles.featureBtn}`}>관련 문제 더 풀어보기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="quizanswer">
    //   <Sidebar />
    //   <main className="content-wrap-wrapper">
    //     <section className="content-wrap1">
    //       <div className="content5">
    //         <QuizInfo propDisplay="inline-block" propWidth="16rem" />
    //         <div className="quiz-content1">
    //           <div className="question1">
    //             <h3 className="h32">문제 나갑니다.</h3>
    //             <div className="question-1-of1">question 1 of 10</div>
    //           </div>
    //           <Option1 propBackgroundColor="#b4d9f0" propBorderBottom="unset" />
    //           <textarea
    //             className="explane"
    //             placeholder="해설이용"
    //             rows={15}
    //             cols={38}
    //           />
    //           <div className="bottom2">
    //             <button className="quiz-nav-btn2">
    //               <div className="div52">이전 문제</div>
    //             </button>
    //             <button className="quiz-nav-btn3">
    //               <b className="b73">다음 문제</b>
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //       <InfoPanel />
    //     </section>
    //   </main>
    // </div>
  );
};

export default QuizAnswer;
