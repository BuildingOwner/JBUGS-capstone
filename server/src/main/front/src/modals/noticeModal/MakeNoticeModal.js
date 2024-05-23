import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "../quizModal/QuizInfoModal.module.css"
import styles2 from "./makeNoticeModal.module.css"
import styles3 from "../qaModal/QaModal.module.css"
import Info from "../modalComponents/Info";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const MakeNoticeModal = (props) => {
  Modal.setAppElement("#root")
  const enrollmentId = props.enrollmentId
  const [notice, setNotice] = useState("")
  const [memberInfoDto, setMemberInfoDto] = useState({})
  const [memberName, setMemberName] = useState("")
  const [attachFiles, setAttachFiles] = useState([])
  const [fileDescription, setFileDescription] = useState('');
  const [title, setTitle] = useState("")
  const [noticeType, setNoticeType] = useState("선택해주세요")


  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files) // FileList를 배열로 변환
    setAttachFiles(filesArray)
    console.log("attachFile : ", e.target.files)

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

  const handleTypeChange = (e) => {
    setNoticeType(e.target.value)
    console.log(e.target.value)
  }

  const uploadNotice = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title)
      formData.append("content", notice)
      formData.append("noticeStatus", noticeType)
      formData.append("writer", memberName)
      // formData.append("attachFiles", attachFiles)

      const jsonData = {
        "title": title,
        "content": notice,
        "noticeStatus": noticeType,
        "writer": memberName,
        // "attachFiles": attachFiles,
      }

      console.log(jsonData)

      const response = await axios.post(`api/course/${enrollmentId}/notice`, jsonData, {
        headers: {
          'Content-Type': 'application/json'
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
      onRequestClose={props.onRequestClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>공지 작성</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={props.onRequestClose}><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <Info className={styles2.noGap} title={"공지 유형"} content={
          <select
            className={`form-select form-select-sm`}
            value={noticeType}
            onChange={handleTypeChange}>
            <option value={null}>선택해주세요..</option>
            <option value={"ONLINE"}>온라인</option>
            <option value={"EXAM"}>시험</option>
            <option value={"FACE_TO_FACE_CLASSES"}>대면수업</option>
          </select>
        } />
        <Info className={styles2.noGap} title={"제목"} content={
          <input type="text" className={`form-control ${styles3.title}`} onChange={(e) => { setTitle(e.target.value) }} />
        } />
        <div style={{ flexGrow: "1" }}>
          <Info className={styles2.noGap} title={"공지 내용"} content={
            <textarea className={`form-control ${styles3.content}`} onChange={(e) => { setNotice(e.target.value) }} rows={14} />
          } />
        </div>

      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={props.onRequestClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={uploadNotice}>등록 하기</button>
      </div>
    </Modal>
  );
};

export default MakeNoticeModal;
