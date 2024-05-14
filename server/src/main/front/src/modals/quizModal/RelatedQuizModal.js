import ReactModal from "react-modal";
import styles2 from "./QuizInfoModal.module.css";
import styles from "../quizModal/QuizInfoModal.module.css"
import LoadingPage from "../../pages/mainPage/LoadingPage";
import { Bs1Square, Bs2Square, Bs3Square, Bs4Square } from 'react-icons/bs'

const RelatedQuizModal = (props) => {
  ReactModal.setAppElement("#root")

  const quiz = props.relatedQuiz
  const optionIcon = [<Bs1Square size={25} />, <Bs2Square size={25} />, <Bs3Square size={25} />, <Bs4Square size={25} />]

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
      onRequestClose={props.onRequestClose}>
      {quiz.question ?
        <>
          <div className={styles.top}>
            <h3 className={styles.title}>관련 문제</h3>
            <button type="button"
              className={`btn btn-primary ${styles.closeBtn}`}
              onClick={props.onRequestClose}>X</button>
          </div>

          <div className={`no-scroll-bar ${styles.gap}`}>
            <h4 className={styles2.question}>{quiz.question}</h4>
            <div className={styles2.options}>
              {
                quiz.options?.length > 0 ?
                  optionIcon.map((option, i) =>
                    <div className={styles2.option}>
                      {option}
                      <div>{quiz.options[i]}</div>
                    </div>
                  ) : <input type="text" className={`form-control`}></input>
              }
            </div>
          </div>

          <div className={styles.bottom}>
            <button className={`btn btn-primary ${styles.closeBtn}`}
              onClick={props.onRequestClose}>닫기
            </button>
            <button className={`btn btn-primary ${styles.goBtn}`}>정답 확인</button>
          </div>
        </> : <LoadingPage />
      }

    </ReactModal>
  )
}

export default RelatedQuizModal