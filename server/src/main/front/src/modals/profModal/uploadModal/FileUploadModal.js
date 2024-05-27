import axios from "axios";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import styles from "../../quizModal/QuizInfoModal.module.css"
import styles2 from "./FileUploadModal.module.css"
import Info from "../../modalComponents/Info";
import { LuFilePlus2 } from "react-icons/lu";
import { LuFileVideo2 } from "react-icons/lu";

const FileUploadModal = (props) => {
  Modal.setAppElement('#root')
  const [weekNumber, setWeekNumber] = useState(null)
  const [fileTitle, setFileTitle] = useState(null)
  const [videoTitle, setVideoTitle] = useState(null)
  const [videoFiles, setVideoFile] = useState(null)
  const [attachFiles, setAttachFile] = useState(null)
  const [shortAnswer, setShortAnswer] = useState(0)
  const [choice, setChoice] = useState(0)
  const [description, setDescription] = useState(null)
  const [quizType, setQuizType] = useState(null)
  const [fileDescription, setFileDescription] = useState('')
  const [videoDescription, setVideoDescription] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [quizFlag, setQuizFlag] = useState(false)
  const [videoLength, setVideoLength] = useState('') // 영상 길이

  // Collapse 상태를 토글하는 함수
  const toggleCollapse = () => {
    const filetitle = fileTitle !== null ? fileTitle.split(".") : "null"
    const length = filetitle.length
    const extension = filetitle[length - 1]
    if (extension !== "pdf") {
      alert("pdf만 퀴즈 생성이 가능합니다.")
      return
    }
    setIsOpen(!isOpen)
    console.log(!quizFlag)
    setQuizFlag(!quizFlag)
  }

  const changeDescription = (e) => {
    setDescription(e.target.value)
    console.log(e.target.value)
  }

  const handleClose = (event) => {
    setVideoTitle(null)
    setFileTitle(null)
    setFileDescription('')
    setVideoDescription('')
    setDescription('')
    setAttachFile(null)
    setVideoFile(null)
    setChoice(null)
    setShortAnswer(null)
    setQuizType(null)
    setIsOpen(false)
    if (event) {
      event.stopPropagation()
    }
    props.onRequestClose() // 괄호를 추가하여 함수가 호출되도록 수정
  }

  // 퀴즈 타입이 변경되었을 경우
  const handleTypeChange = (e) => {
    setQuizType(e.target.value)
    console.log(e.target.value)
  }

  // 파일이 변경되었을 경우
  const handleFileChange = (e) => {
    setAttachFile(e.target.files[0])
    console.log("attachFile : ", e.target.files[0])
    setFileTitle(e.target.files[0].name)
    const files = e.target.files
    const fileCount = files.length

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

  // 비디오가 변경되었을 경우
  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0])
    setVideoTitle(e.target.files[0].name)
    console.log("videoFile : ", e.target.files[0])

    const files = e.target.files;
    const fileCount = files.length;

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setVideoDescription(files[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setVideoDescription(`이미지 ${fileCount}개`);
    } else {
      // 파일이 선택되지 않은 경우
      setVideoDescription('');
    }
    // 비디오 길이를 가져오기 위한 로직 추가
    const videoElement = document.createElement('video');
    videoElement.preload = 'metadata';

    videoElement.onloadedmetadata = () => {
      window.URL.revokeObjectURL(videoElement.src);
      const duration = videoElement.duration
      console.log("길이 : ", duration);
      // 필요 시 상태 업데이트
      setVideoLength(duration);
    }

    videoElement.src = URL.createObjectURL(e.target.files[0]);
  }

  const handleWeekChange = (e) => {
    setWeekNumber(e.target.value)
    console.log(e.target.value)
  }

  const changeFileTitle = (e) => {
    setFileTitle(e.target.value)
    console.log(e.target.value)
  }

  const changeShortAnswer = (e) => {
    setShortAnswer(e.target.value)
    console.log(e.target.value)
  }

  const changeChoice = (e) => {
    setChoice(e.target.value)
    console.log(e.target.value)
  }

  const changeVideoTitle = (e) => {
    setVideoTitle(e.target.value)
  }

  const uploadAndRender = () => {
    uploadFiles()
    handleClose()
  }

  const uploadFiles = async () => {
    // 유효성 검사 추가
    if (weekNumber === null || (fileTitle === null && videoTitle === null)) {
      alert("파일과 비디오중 하나는 업로드 되어야합니다.")
      return
    }

    if (quizFlag === true) {
      if (shortAnswer === 0) {
        alert("주관식 개수를 선택해주세요.")
        return
      }
      if (choice === 0) {
        alert("객관식 개수를 선택해주세요.")
        return
      }
      if (quizType === null) {
        alert("문제 유형을 선택해주세요.")
        return
      }
    }

    const formData = new FormData()
    formData.append("weekNumber", weekNumber)
    formData.append("fileTitle", fileTitle)
    formData.append("videoTitle", videoTitle)
    formData.append("shortAnswer", shortAnswer)
    formData.append("choice", choice)
    formData.append("videoFiles", videoFiles)
    formData.append("attachFiles", attachFiles)
    formData.append("description", description)
    formData.append("quizType", quizType)
    formData.append("quizFlag", quizFlag)
    formData.append("videoLength", videoLength)

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`/api/course/${props.enrollmentId}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log("response : ", response)
      alert('파일 업로드 되었습니다.'); // 사용자에게 알림
    } catch (error) {
      console.log(error);
      alert('파일 업로드에 실패했습니다.'); // 사용자에게 알림
    } finally {
      // 부모 컴포넌트를 다시 렌더링
      props.reRender()
    }

  }

  useEffect(() => {
    setWeekNumber(props?.selectedWeek)
  }, [props])

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
        <h3 className={styles.title}>파일 업로드</h3>
        <button type="button"
          className={`btn btn-primary ${styles.closeBtn}`}
          onClick={handleClose}>X</button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"주차 선택"} content={
            <select
              className={`form-select form-select-sm`}
              onChange={handleWeekChange}
              value={weekNumber}>
              <option value={null}>주차 선택</option>
              {Array.from({ length: 16 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1} 주차</option>
                )
              })}
            </select>} />
        </div>
        <div className={styles.contents}>
          <Info title={"동영상명"} content={
            <div className={`${styles.contents} ${styles2.contents}`}>
              <input type="text"
                className={`form-control`}
                placeholder="자료명을 입력해주세요"
                onChange={changeVideoTitle}
                value={videoTitle}
              ></input>
              <label htmlFor="videoInput" className={`btn btn-primary ${styles2.btn}`}>
                <LuFileVideo2 size={20} />
                {videoDescription && <span className={styles.fileDescription}>{videoDescription}</span>}
              </label>
              <input type="file"
                id="videoInput"
                accept=".mp4, .mov"
                className={`form-control`}
                onChange={handleVideoChange}
                style={{ display: "none" }}
              ></input>
            </div>
          } />
        </div>
        <div className={styles.contents}>
          <Info title={"파일명"} content={
            <div className={`${styles.contents} ${styles2.contents}`}>
              <input type="text"
                className={`form-control`}
                placeholder="자료명을 입력해주세요"
                onChange={changeFileTitle}
                value={fileTitle}></input>
              <label htmlFor="fileInput" className={`btn btn-primary ${styles2.btn}`}>
                <LuFilePlus2 size={20} />
                {fileDescription && <span className={styles.fileDescription}>{fileDescription}</span>}
              </label>
              <input type="file"
                accept="*"
                id="fileInput"
                className={`form-control`}
                onChange={handleFileChange}
                style={{ display: "none" }}
              ></input>
            </div>
          } />
        </div>

        <div className={`btn btn-primary ${styles2.btn}`}
          data-bs-toggle="collapse"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
          onClick={toggleCollapse}>
          퀴즈 생성하기
        </div>

        <div className={`collapse ${isOpen ? 'show' : ''} ${styles2.collepse}`} id="collapseExample">
          <div className={`${styles.contents} ${styles2.contents}`}>
            <Info title={"객관식 개수"} content={
              <select
                className={`form-select form-select-sm`}
                onChange={changeChoice}>
                <option value={0}>객관식 개수</option>
                {Array.from({ length: 10 }).map((_, i) => {
                  return (
                    <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                  )
                })}
              </select>
            } />
            <Info title={"주관식 개수"} content={
              <select
                className={`form-select form-select-sm`}
                aria-label="Small select example"
                onChange={changeShortAnswer}>
                <option value={0}>주관식 개수</option>
                {Array.from({ length: 10 }).map((_, i) => {
                  return (
                    <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                  )
                })}
              </select>
            } />
            <Info title={"문제 유형"} content={
              <select
                className={`form-select form-select-sm`}
                value={quizType}
                onChange={handleTypeChange}>
                <option value={null}>문제 유형</option>
                <option value={"EXERCISE"}>연습 문제</option>
                <option value={"PRACTICE"} >실습 문제</option>
              </select>
            } />
          </div>
          <div className={styles.contents}>
            <Info title={"퀴즈 설명"} content={<textarea className={`form-control`} rows={4} placeholder="퀴즈 설명" onChange={changeDescription}></textarea>} />
          </div>
        </div>

      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`}
          onClick={handleClose}>닫기
        </button>
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={uploadAndRender}>업로드</button>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
