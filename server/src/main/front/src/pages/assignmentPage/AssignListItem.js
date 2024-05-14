import styles from "./AssignListItem.module.css"
import { useEffect, useState } from "react"
import AssignmentModal from "../../modals/assignModal/AssignmentModal"

const AssignListItem = (props) => {
  const [formattedDate, setFormattedDate] = useState()
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
    const inputDate = props.dueDate
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])

  return (
    <div className={styles.row} onClick={openModal}>
      <AssignmentModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props}
      />

      <div className={styles.submitBox}>
        {props.status === "NOT_SUBMITTED" ? <h4 className={styles.red}>미제출</h4> : <h4 className={styles.green}>제출 완료</h4>}
      </div>
      <h4 className={styles.title}>{props.title}</h4>
      <h4>{props.weekId}주차</h4>
      <h4>{formattedDate}</h4>
      <h4>-</h4>
    </div>
  );
};

export default AssignListItem;
