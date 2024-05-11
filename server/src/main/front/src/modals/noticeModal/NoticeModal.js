import { useEffect } from "react";
import Modal from "react-modal"
import styles from "../quizModal/QuizInfoModal.module.css"
import Info from "../modalComponents/Info";
import { IoClose } from "react-icons/io5";

const NoticeModal = (props) => {
  Modal.setAppElement('#root')

  useEffect(() => {

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
        <h3 className={styles.title}>공지 제목</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} ><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"작성자"} content={"교수님"} />
          <Info title={"작성일"} content={"2024-10-10"} />
          <Info title={"조회수"} content={"50000"} />
          <Info title={"구분"} content={<h3 className={`${styles.box} ${styles.yellow}`}>대면 수업</h3>} />{/*대면은 yellow, 시험은 green, 온라인은 blue*/}
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={"설명임"} />
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`}>해설 보기</button>
      </div>
    </Modal>
  );
};

export default NoticeModal;
