import styles from "./QuizListItem.module.css"
import { useState, useEffect } from "react"
import QuizInfoModal from "../../../modals/quizModal/QuizInfoModal"
const QuizListItem = (props) => {
  const [formattedDate, setFormattedDate] = useState()
  console.log(" listitem", props)
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = (event) => {
    setModalIsOpen(false)
    // 이벤트 버블링을 막음
    event.stopPropagation()
  }

  const checkDueDate = (dueDateString) => {
    // 현재 날짜 및 시간
    const now = new Date();

    // 마감 날짜를 나타내는 Date 객체 생성
    const dueDate = new Date(dueDateString);

    // dueDate가 now보다 미래인지 확인
    if (dueDate > now) {
      return true;
    } else {
      return false;
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().substring(2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = date.getDate().toString().padStart(2, '0'); // 일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    // 포맷팅된 문자열 생성
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const inputDate = props.deadline
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])
  return (
    <div className={styles.quizListItem} onClick={openModal}>
      <QuizInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props} />
      {console.log(props.deadline)}
      {props.memberInfoDto.memberType === "PROFESSOR" ?
        <div className={`${styles.idSubmitBox} ${checkDueDate(props.deadline) ? styles.yet : styles.done}`}>
          {checkDueDate(props.deadline) ?
            <h3 className={styles.idSubmitText}>진행중</h3>
            : <h3 className={styles.idSubmitText}>마감</h3>}
        </div>
        : <div className={`${styles.idSubmitBox} ${props.submissionStatus != 0 ? styles.done : styles.yet}`}>
          {props.submissionStatus === true ?
            <h3 className={styles.idSubmitText}>응시 완료</h3>
            : <h3 className={styles.idSubmitText}>미응시</h3>}
        </div>}
      {props.quizType === "EXERCISE" ? <h3 className={styles.text}>연습 문제</h3> :
        props.quizType === "EXAM" ? <h3 className={styles.text}>시험</h3> :
          <h3 className={styles.text}>실습 문제</h3>
      }
      <h3 className={styles.title}>{props.quizName}</h3>
      <h3 className={styles.text}>{props.timeLimit}</h3>
      <h3 className={styles.text}>{props.submissionStatus != 0 ? props.quizScore : "-"}</h3>
      <h3 className={styles.deadline}>{formattedDate}</h3>
      {props.submissionStatus || props?.memberInfoDto.memberType === "PROFESSOR" ?
        <button className={`btn btn-primary ${styles.feedbackBtn}`} onClick={openModal}>
          <h3 className={styles.feedbackText}>피드백 보기</h3>
        </button> : <h3 style={{ minWidth: "125px", textAlign: "center" }}>-</h3>
      }
    </div>
  )
}

export default QuizListItem