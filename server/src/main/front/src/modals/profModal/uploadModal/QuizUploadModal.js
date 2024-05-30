import Modal from "react-modal";
import { useEffect, useState } from "react";
import styles from "../../quizModal/QuizInfoModal.module.css"
import styles2 from "./FileUploadModal.module.css"
import Info from "../../modalComponents/Info";
import axios from "axios";
const QuizUploadModal = (props) => {
  const data = props.props
  Modal.setAppElement('#root')
  const [shortAnswer, setShortAnswer] = useState(0)
  const [choice, setChoice] = useState(0)
  const [quizType, setQuizType] = useState(null)
  const [description, setDescription] = useState(null)
  const [selectedWekk, setSelectedWeek] = useState(null)
  // 컴포넌트 클릭시 모든 이벤트 버블링 막음
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

  const uploadAndRender = () => {
    uploadQuiz()
    if (shortAnswer === 0 || choice === 0 || description === null || quizType === null) {
      alert("한 곳도 비어있어선 안됩니다.")
      return;
    }
    alert("퀴즈 생성중입니다.")
    handleClose()
  }

  const uploadQuiz = async () => {
    try {
      const formData = new FormData()
      const materialId = data.fileId
      console.log("materialId : ", materialId)
      formData.append("shortAnswer", shortAnswer)
      formData.append("choice", choice)
      formData.append("description", description)
      formData.append("quizType", quizType)

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(`/api/course/uploadMaterial/${materialId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log("response : ", response)
      alert(`${data.selectedWeek}퀴즈가 생성되었습니다.`) // 타이밍이 중요
    } catch (error) {
      console.log(error)
    } finally {
      data.reRender()
    }
  }
  useEffect(() => {
    setSelectedWeek(data.selectedWeek)
  }, [data])

  return (
    <div onClick={stopPropagation}>
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
        <div className={styles.top}>
          <h3 className={styles.title}>퀴즈 생성</h3>
          <button type="button"
            className={`btn btn-primary ${styles.closeBtn}`}
            onClick={handleClose}>X</button>
        </div>
        <div className={`no-scroll-bar ${styles.gap}`}>
          <div className={styles.contents}>
            <Info title={"주차"} content={`${data.selectedWeek}주차`} />
            <Info title={"파일명"} content={data.fileName} />
          </div>
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
                  rows={15} placeholder="퀴즈 설명"
                  onChange={changeDescription}>
                </textarea>} />
          </div>
        </div>
        <div className={styles.bottom}>
          <button className={`btn btn-primary ${styles.closeBtn}`}
            onClick={handleClose}>닫기
          </button>
          <button className={`btn btn-primary ${styles.goBtn}`}
            onClick={uploadAndRender}>퀴즈 생성</button>
        </div>
      </Modal>
    </div>
  )
}

export default QuizUploadModal