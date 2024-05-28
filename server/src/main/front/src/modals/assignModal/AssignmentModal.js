import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal"
import styles from "../quizModal/QuizInfoModal.module.css"
import styles2 from "./AssignmentModal.module.css"
import Info from "../modalComponents/Info";
import { LuFilePlus2 } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import axios from "axios";

const AssignmentModal = (props) => {
  Modal.setAppElement("#root")
  const data = props?.props
  const [fileDescription, setFileDescription] = useState('');
  const [formattedDate, setFormattedDate] = useState()
  const [remainDate, setRemainDate] = useState('')
  const [attachFiles, setAttachFiles] = useState([])
  const [comment, setComment] = useState("")

  const uploadAssign = async () => {
    console.log("업로드 시작")
    try {
      const formData = new FormData()

      // attachFiles 배열의 각 파일을 formData에 추가
      if (attachFiles) {
        for (let i = 0; i < attachFiles.length; i++) {
          formData.append("attachFiles", attachFiles[i]);
        }
      }

      const response = await axios.post(`/api/course/${data.enrollmentId}/assignment/submit`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log("upload response : ", response)
    } catch (error) {
      console.log(error)
    }

  }

  const handleFileChange = (event) => {
    const filesArray = Array.from(event.target.files) // FileList를 배열로 변환
    setAttachFiles(filesArray)
    const files = event.target.files;
    const fileCount = files.length;

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(files[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setFileDescription(`파일 ${fileCount}개`);
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

  const onAnswerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const handleClose = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setFileDescription('')
    setAttachFiles([])
    props.onRequestClose() // 괄호를 추가하여 함수가 호출되도록 수정
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

  const remainDates = (dateString) => {
    // 현재 날짜
    const now = new Date()

    // 마감 날짜
    const dueDate = new Date(dateString)

    // 남은 시간(밀리초 단위)
    const diff = dueDate - now

    // 밀리초를 일, 시간, 분 단위로 변환
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    let remainingTime

    if (days > 0) {
      remainingTime = `${days}일 ${hours}시간`
    } else if (hours > 0) {
      remainingTime = `${hours}시간 ${minutes}분`
    } else if (minutes > 0) {
      remainingTime = `${minutes}분`
    } else {
      remainingTime = `마감`
    }
    return remainingTime
  }

  useEffect(() => {
    const inputDate = data?.dueDate
    const data1 = formatDate(inputDate) // 종료 일시
    const data2 = remainDates(inputDate) // 남은 시간
    setRemainDate(data2)
    setFormattedDate(data1)
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
        <h3 className={styles.title}>{data.title}</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`}
          onClick={handleClose}><IoClose />
        </button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"마감 기한"} content={formattedDate} />
          <Info title={"마감 여부"} content={remainDate} />
        </div>
        <div className={styles.contents}>
          <Info title={"제출 여부"} content={<h3 className={`${styles.box} ${styles.red}`}>미제출</h3>} /> {/*미제출은 red, 제출완료는 green*/}
          <Info title={"최종 수정 일시"} content={"2024-10-10"} />
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={data.contents} />
        </div>
        <div className={styles2.contents}>
          <div className={styles2.fileTop}>
            <h3 className={styles2.title}>첨부 파일</h3>
            <label htmlFor="fileInput" className={`btn btn-primary ${styles2.fileBtn}`}>
              <LuFilePlus2 size={20} />
              {fileDescription && <span>{fileDescription}</span>}
            </label>
            <input type="file"
              accept="*"
              id="fileInput"
              className={`form-control ${styles.imageInput}`}
              onChange={handleFileChange}
              style={{ display: "none" }}
              multiple></input>
          </div>
          {
            attachFiles.length > 0 ?
              attachFiles.map((file, i) => (
                <div className={styles2.fileItem} key={i}>
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
        <div className={styles2.contents}>
          <div className={styles2.fileTop}>
            <h3 className={styles2.title}>댓글</h3>
          </div>
          <div className={styles2.commentList}>
            {/* <h3 className={styles2.comment}></h3> */}
          </div>
        </div>
      </div>
      <textarea
        rows={1}
        className="form-control"
        placeholder="댓글을 입력하세요..."
        style={{ overflowY: "hidden" }} // 세로 스크롤 제거
      />
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={handleClose}>닫기</button>
        <button className={`btn btn-primary ${styles.goBtn}`}
          onClick={
            remainDate === "마감" ? null : uploadAssign
          }>과제 제출</button>
      </div>
    </Modal>
  )
}

export default AssignmentModal;
