import styles from "./NoticeRow.module.css"
import { useState, useEffect } from "react";
import { BsPinFill } from "react-icons/bs";
import NoticeModal from "../../modals/noticeModal/NoticeModal"
const QnaRow = (props) => {
  const [formattedDate, setFormattedDate] = useState()
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    console.log("open")
    setModalIsOpen(true)
  }

  const closeModal = (event) => {
    console.log("close")
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
    return `${year}-${month}-${day}`;
  }

  useEffect(() => {
    const inputDate = props.createdAt
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])
  return (
    <div className={styles.row} onClick={openModal}>
      <NoticeModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal} />
      <h4 className={styles.num}>{props.noticeNumber}</h4>
      {props.noticeStatus === "EXAM" ?
        <div className={`${styles.category} ${styles.exam}`}>
          <h4>시험</h4>
        </div> :
        props.noticeStatus === "ONLINE" ?
          <div className={`${styles.category} ${styles.online}`}>
            <h4>온라인</h4>
          </div> :
          <div className={`${styles.category} ${styles.offline}`}>
            <h4>대면 수업</h4>
          </div>

      }
      <div className={styles.secret}>
        <BsPinFill size={20} />
      </div>
      <h4 className={styles.title}>{props.title}</h4>
      <h4 className={styles.writer}>{props.writer}</h4>
      <h4 className={styles.date}>{formattedDate}</h4>
      <h4 className={styles.views}>{props.views}</h4>
    </div>
  );
};

export default QnaRow;
