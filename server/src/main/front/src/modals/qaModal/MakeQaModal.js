import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../quizModal/QuizInfoModal.module.css"
import styles2 from "../assignModal/AssignmentModal.module.css"
import styles3 from "./QaModal.module.css"
import Info from "../modalComponents/Info";
import { LuFilePlus2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { RxLockClosed } from "react-icons/rx";
import { RxLockOpen2 } from "react-icons/rx";

const MakeQaModal = (props) => {
  Modal.setAppElement("#root")
  const [qnA, setQnA] = useState("")
  const [title, setTitle] = useState("")
  const [memberInfoDto, setMemberInfoDto] = useState({})
  const [memberName, setMemberName] = useState("")
  const [secret, setSecret] = useState(true)

  const uploadQnA = async () => {
    try {
      const response = await axios.post(`api/course/${enrollmentId}/qna/create`)
      console.log(response)
    } catch (error) {

    }
  }

  useEffect(() => {
    setMemberInfoDto(props.memberInfoDto)
    setMemberName(props.memberInfoDto.memberName)
  }, [])

  useEffect(() => {
    console.log(title)
    console.log(qnA)
    console.log(secret)
  }, [title, qnA, secret])

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
        <h3 className={styles.title}>질문 하기</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={props.onRequestClose}><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"제목"} content={
            <input type="text" className={`form-control ${styles3.title}`} onChange={(e) => { setTitle(e.target.value) }} />
          } />
        </div>
        <div className={styles.contents}>
          <Info title={"공개 여부"} content={
            <button type="button" className={`btn btn-primary ${styles3.secretBtn} ${secret ? styles3.on : styles3.off}`} onClick={() => { setSecret(!secret) }}>{secret ?
              <span>
                <RxLockClosed size={20} />
                비밀글
              </span> :
              <span>
                <RxLockOpen2 size={20} />
                공개글
              </span>}
            </button>
          } />
        </div>
        <div className={styles.contents}>
          <Info title={"질문 내용"} content={
            <textarea className={`form-control ${styles3.content}`} onChange={(e) => { setQnA(e.target.value) }} rows={5} />
          } />
        </div>
        <div className={styles2.contents}>
          <div className={styles2.fileTop}>
            <h3 className={styles2.title}>첨부 파일</h3>
            <label htmlFor="fileInput" className={`btn btn-primary ${styles2.fileBtn}`}>
              <LuFilePlus2 size={20} />
            </label>
            <input type="file"
              accept="*"
              id="fileInput"
              className={`form-control ${styles.imageInput}`}
              style={{ display: "none" }}
              multiple></input>
          </div>
          <div className={styles2.fileItem}>
            <h3 style={{ fontSize: "1.25rem" }}>L 파일 이름</h3>
            <button type="button" className={`btn btn-primary ${styles2.fileDeleteBtn}`}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={props.onRequestClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`}>등록 하기</button>
      </div>
    </Modal>
  );
};

export default MakeQaModal;
