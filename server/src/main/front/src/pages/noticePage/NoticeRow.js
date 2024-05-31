import styles from "./NoticeRow.module.css"
import { useState, useEffect } from "react";
import { BsPinFill } from "react-icons/bs";
import NoticeModal from "../../modals/noticeModal/NoticeModal"
import { IoClose } from "react-icons/io5";
import axios from "axios";

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

  const handleDeleteNotice = async (event) => {
    if (event) {
      event.stopPropagation()
    }
    if (confirm("삭제 하시겠습니까?") === true) {
      try {
        const response = await axios.delete(`/api/notice/${props.noticeId}`);
        console.log(response.data); // 서버로부터의 응답을 처리합니다.
        alert("삭제되었습니다.")
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
    props.reRender()
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
        onRequestClose={closeModal}
        props={props} />
      <h4 className={styles.num}>{props.noticeNumber + 1}</h4>
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
      {
        props.memberType === "PROFESSOR" && props.editFlag === true ?
          <button type="button"
            className={`btn btn-primary ${styles.deleteBtn}`}
            onClick={(e) => handleDeleteNotice(e)}>
            <IoClose data-tooltip-content='삭제' data-tooltip-id='tooltip' size={25} />
          </button>
          : null
      }
    </div>
  );
};

export default QnaRow;
