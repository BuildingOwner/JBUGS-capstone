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
import axios from "axios";

const MakeQaModal = (props) => {
  Modal.setAppElement("#root")
  const enrollmentId = props.enrollmentId
  const [qnA, setQnA] = useState("")
  const [memberInfoDto, setMemberInfoDto] = useState({})
  const [memberName, setMemberName] = useState("")
  const [secret, setSecret] = useState(true)
  const [attachFiles, setAttachFiles] = useState("")
  const [fileDescription, setFileDescription] = useState('');
  const [title, setTitle] = useState("")

  const handleFileChange = (e) => {
    setAttachFiles(e.target.files[0])
    console.log("attachFile : ", e.target.files[0])

    const files = e.target.files;
    const fileCount = files.length;

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(files[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setFileDescription(`이미지 ${fileCount}개`);
    } else {
      // 파일이 선택되지 않은 경우
      setFileDescription('');
    }
  }

  const uploadQnA = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title)
      formData.append("description", qnA)
      formData.append("secret", secret)
      formData.append("attachFiles", attachFiles)

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await axios.post(`api/course/${enrollmentId}/qna/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    props.reRender()
    props.onRequestClose(null)
  }

  useEffect(() => {
    setMemberInfoDto(props.memberInfoDto)
    setMemberName(props.memberInfoDto.memberName)
  }, [])

  // useEffect(() => {
  //   console.log(title)
  //   console.log(qnA)
  //   console.log(secret)
  // }, [title, qnA, secret])

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
            <button type="button"
              className={`btn btn-primary ${styles3.secretBtn} ${secret ? styles3.on : styles3.off}`}
              onClick={() => { setSecret(!secret) }}>{secret ?
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
              onChange={handleFileChange}
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
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={uploadQnA}>등록 하기</button>
      </div>
    </Modal>
  );
};

export default MakeQaModal;
