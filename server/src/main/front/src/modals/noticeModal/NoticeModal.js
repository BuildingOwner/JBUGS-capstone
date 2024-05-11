import { useEffect, useState } from "react";
import Modal from "react-modal"
import styles from "../quizModal/QuizInfoModal.module.css"
import Info from "../modalComponents/Info";

const NoticeModal = (props) => {
  Modal.setAppElement('#root')
  const [formattedDate, setFormattedDate] = useState()
  const data = props.props

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
    console.log(props)
    const inputDate = props.props.createdAt
    const data = formatDate(inputDate)
    setFormattedDate(data)
  }, [])

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
      onRequestClose={props.onRequestClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>{data.title}</h3>
        <button type="button"
          className={`btn btn-primary ${styles.closeBtn}`}
          onClick={props.onRequestClose}>X</button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"작성자"} content={data.writer} />
          <Info title={"작성일"} content={formattedDate} />
          <Info title={"조회수"} content={data.views} />
          {
            data.noticeStatus === "ONLINE" ?
              <Info title={"구분"} content={<h3 className={`${styles.box} ${styles.blue}`}>온라인</h3>} />
              : data.noticeStatus === "EXAM" ?
                <Info title={"구분"} content={<h3 className={`${styles.box} ${styles.green}`}>시험</h3>} />
                : <Info title={"구분"} content={<h3 className={`${styles.box} ${styles.yellow}`}>대면 수업</h3>} />
          }
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={data.content} />
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`}
          onClick={props.onRequestClose}>닫기
        </button>
        {/* <button className={`btn btn-primary ${styles.goBtn}`}>해설 보기</button> */}
      </div>
    </Modal>
  );
};

export default NoticeModal;
