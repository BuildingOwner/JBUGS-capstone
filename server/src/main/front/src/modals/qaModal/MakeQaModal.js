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

  const handleClose = (event) => {
    setAttachFiles([])
    event.stopPropagation()
    props.onRequestClose() // 괄호를 추가하여 함수가 호출되도록 수정
  }

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files) // FileList를 배열로 변환
    setAttachFiles(filesArray)
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

  // 파일 삭제 함수
  const handleDeleteFile = (index) => {
    // 배열에서 index에 해당하는 요소를 제거합니다.
    const newFiles = attachFiles.filter((_, i) => i !== index)
    const fileCount = newFiles.length
    setAttachFiles(newFiles) // 상태를 업데이트합니다.

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(newFiles[0].name);
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

      // attachFiles 배열의 각 파일을 formData에 추가
      if (attachFiles) {
        for (let i = 0; i < attachFiles.length; i++) {
          formData.append("attachFiles", attachFiles[i]);
        }
      }

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
    // 부모 컴포넌트를 다시 렌더링
    props.reRender()
    // 프로세스가 끝나면 모달 닫기
    props.onRequestClose(null)
  }

  useEffect(() => {
    setMemberInfoDto(props.memberInfoDto)
    setMemberName(props.memberInfoDto.memberName)
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
      onRequestClose={handleClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>질문 하기</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={handleClose}><IoClose /></button>
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
          {
            attachFiles.length > 0 ?
              attachFiles.map((file, i) => (
                <div className={styles2.fileItem}>
                  <h3 style={{ fontSize: "1.25rem" }}>L {file.name}</h3>
                  <button type="button"
                    className={`btn btn-primary ${styles2.fileDeleteBtn}`}
                    onClick={() => handleDeleteFile(i)}>
                    <IoClose size={20} />
                  </button>
                </div>
              )) : null
          }
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={handleClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={uploadQnA}>등록 하기</button>
      </div>
    </Modal>
  )
}

export default MakeQaModal;
