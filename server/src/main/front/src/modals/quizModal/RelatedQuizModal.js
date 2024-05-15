import ReactModal from "react-modal";
import styles2 from "./QuizInfoModal.module.css";
import styles from "../quizModal/QuizInfoModal.module.css"
import LoadingPage from "../../pages/mainPage/LoadingPage";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'
import { useEffect, useState } from "react";

const RelatedQuizModal = (props) => {
  ReactModal.setAppElement("#root")
  const [selectedOption, setSelectedOption] = useState("")
  const [answerFlag, setAnswerFlag] = useState(false)
  const quiz = props.relatedQuiz
  const optionIcon = [<Bs1Square size={25} />, <Bs2Square size={25} />, <Bs3Square size={25} />, <Bs4Square size={25} />]
  const handleClose = () => {
    setAnswerFlag(false);
    setSelectedOption("");
    props.onRequestClose(); // 괄호를 추가하여 함수가 호출되도록 수정
  }
  useEffect(() => {
    console.log(props.relatedQuiz)
  }, [])
  return (
    <ReactModal
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
      }}
      className={styles.modalContainer}
      isOpen={props.isOpen}
      onRequestClose={handleClose}>
      {quiz.question ?
        <>
          <div className={styles.top}>
            <h3 className={styles.title}>관련 문제</h3>
            <button type="button"
              className={`btn btn-primary ${styles.closeBtn}`}
              onClick={handleClose}>X</button>
          </div>

          <div className={`no-scroll-bar ${styles.gap}`}>
            <h4 className={styles2.question}>{quiz.question}</h4>
            <div className={styles2.options}>
              {
                quiz.options?.length > 0 ?
                  optionIcon.map((option, i) =>
                    // 정답 플래그가 작동하면
                    <div className={`${styles2.option} ${answerFlag === true ?
                      //현재옵션이 정답이면 무조건 초록색
                      quiz.options[i] === quiz.answer ?
                        styles2.green :
                        quiz.options[i] === selectedOption ?
                          styles2.red : ''
                      : ''
                      }`} onClick={() => {
                        console.log('Option clicked, answerFlag:', answerFlag);
                        if (!answerFlag) { // answerFlag가 false일 때만 selectedOption 업데이트
                          console.log(quiz.options[i])
                          setSelectedOption(quiz.options[i])
                        }
                      }} key={i}>
                      {option}
                      <div>{quiz.options[i]}</div>
                    </div>
                  ) :
                  <>
                    <input type="text" className={`form-control ${answerFlag === true ?
                      selectedOption === quiz.answer ?
                        styles2.green : styles2.red
                      : ''
                      }`}
                      onChange={(e) => {
                        if (!answerFlag) { // answerFlag가 false일 때만 selectedOption 업데이트
                          console.log(e.target.value)
                          setSelectedOption(e.target.value)
                        }
                      }}
                    ></input>
                    {
                      answerFlag === true ?
                        <div className={styles2.green}>정답: {quiz.answer}</div> : null
                    }
                  </>

              }
            </div>
          </div>
          <div className={styles.bottom}>
            <button className={`btn btn-primary ${styles.closeBtn}`}
              onClick={handleClose}>닫기
            </button>
            <button className={`btn btn-primary ${styles.goBtn}`}
              onClick={() => setAnswerFlag(true)}>정답 확인
            </button>
          </div>
        </> : <LoadingPage />
      }

    </ReactModal>
  )
}

export default RelatedQuizModal