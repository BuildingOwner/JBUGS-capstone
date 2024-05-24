import Modal from "react-modal";
import { useEffect, useState } from "react";
import styles from "../../quizModal/QuizInfoModal.module.css"
import styles2 from "./FileUploadModal.module.css"
import Info from "../../modalComponents/Info";
const QuizUploadModal = (props) => {
  Modal.setAppElement('#root')
  const [shortAnswer, setShortAnswer] = useState(0)
  const [choice, setChoice] = useState(0)
  const [quizType, setQuizType] = useState(null)
  const [description, setDescription] = useState(null)

  // 컴포넌트 클릭시 모든 이벤트 버블링 막음 (밑에는 안막힘)
  const stopPropagation = (e) => {
    e.stopPropagation()
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
    console.log(e.target.value)
  }

  const changeShortAnswer = (e) => {
    setShortAnswer(e.target.value)
    console.log(e.target.value)
  }

  const changeChoice = (e) => {
    setChoice(e.target.value)
    console.log(e.target.value)
  }

  const handleTypeChange = (e) => {
    setQuizType(e.target.value)
    console.log(e.target.value)
  }

  const handleClose = (event) => {
    if (event) {
      event.stopPropagation()
    }
    props.onRequestClose() // 괄호를 추가하여 함수가 호출되도록 수정
  }
  return (
    <Modal className={styles.modalContainer}
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
      isOpen={props.isOpen}
      onRequestClose={handleClose}>
      <div onClick={stopPropagation}>
        <div className={`${styles.contents} ${styles2.contents}`}
          onClick={stopPropagation}>
          <Info title={"객관식 개수"} content={
            <select
              className={`form-select form-select-sm`}
              onChange={changeChoice}>
              <option value={0}>객관식 개수</option>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                )
              })}
            </select>
          } />
          <Info title={"주관식 개수"} content={
            <select
              className={`form-select form-select-sm`}
              aria-label="Small select example"
              onChange={changeShortAnswer}>
              <option value={0}>주관식 개수</option>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                )
              })}
            </select>
          } />
          <Info title={"문제 유형"} content={
            <select
              className={`form-select form-select-sm`}
              value={quizType}
              onChange={handleTypeChange}>
              <option value={null}>문제 유형</option>
              <option value={"EXERCISE"}>연습 문제</option>
              <option value={"PRACTICE"} >실습 문제</option>
            </select>
          } />
        </div>
        <div className={styles.contents}>
          <Info title={"퀴즈 설명"}
            content={
              <textarea className={`form-control`}
                rows={4} placeholder="퀴즈 설명"
                onChange={changeDescription}>
              </textarea>} />
        </div>
      </div>
    </Modal>
  )
}

export default QuizUploadModal