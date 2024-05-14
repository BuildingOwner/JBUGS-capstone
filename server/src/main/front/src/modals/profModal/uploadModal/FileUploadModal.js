import axios from "axios";
import "./FileUploadModal.css";
import Modal from "react-modal";
import { useState } from "react";
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
  const [shortAnswer, setShortAnswer] = useState(null)
  const [choice, setChoice] = useState(null)
  const [description, setDescription] = useState(null)
  const [quizType, setQuizType] = useState("")
  const [fileDescription, setFileDescription] = useState('');
  const [videoDescription, setVideoDescription] = useState('');

  const changeDescription = (e) => {
    setDescription(e.target.value)
    console.log(e.target.value)
  }

  const handleTypeChange = (e) => {
    setQuizType(e.target.value)
    console.log(e.target.value)
  }

  const handleFileChange = (e) => {
    setAttachFile(e.target.files[0])
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

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0])
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

  const uploadFiles = async () => {
    const formData = new FormData();
    formData.append("weekNumber", weekNumber)
    formData.append("fileTitle", fileTitle)
    formData.append("videoTitle", videoTitle)
    formData.append("shortAnswer", shortAnswer)
    formData.append("choice", choice)
    formData.append("videoFiles", videoFiles)
    formData.append("attachFiles", attachFiles)
    formData.append("description", description)
    formData.append("quizType", quizType)

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
    } catch (error) {
      console.log(error);
      alert('파일 업로드에 실패했습니다.'); // 사용자에게 알림
    }
  }

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
        <h3 className={styles.title}>파일 업로드</h3>
        <button type="button"
          className={`btn btn-primary ${styles.closeBtn}`}
          onClick={props.onRequestClose}>X</button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>

        {/* <div className="car-wrapper">
          <div className="car">
            <b className="b75">{`주차 : `}</b>
            <div className="menu-wrapper">
              <select
                aria-label="Small select example"
                onChange={handleWeekChange}>
                <option value={null}>주차 선택</option>
                {Array.from({ length: 16 }).map((_, i) => {
                  return (
                    <option value={i + 1} key={`weekKey${i}`}>{i + 1} 주차</option>
                  )
                })}
              </select>
            </div>
          </div>
        </div> */}

        <div className={styles.contents}>
          <Info title={"주차 선택"} content={
            <select
              className={`form-select form-select-sm`}
              onChange={handleWeekChange}>
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
              <input type="text" className={`form-control`} placeholder="자료명을 입력해주세요" onChange={changeVideoTitle}></input>
              <label htmlFor="videoInput" className={`btn btn-primary`}>
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
              <input type="text" className={`form-control`} placeholder="자료명을 입력해주세요" onChange={changeFileTitle}></input>
              <label htmlFor="fileInput" className={`btn btn-primary`}>
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

        <div className={`${styles.contents} ${styles2.contents}`}>
          <Info title={"객관식 개수"} content={
            <select
              className={`form-select form-select-sm`}
              onChange={changeChoice}>
              <option value={null}>객관식 개수</option>
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
              <option value={null}>주관식 개수</option>
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



        {/* <section className="fileinput-parent">
          <div className="fileinput"> */}
        {/* <div className="file-name">
              <b className="b76">{`자료명 : `}</b>
              <textarea placeholder="자료명을 입력해주세요" onChange={changeFileTitle}></textarea>
            </div>
            <div className="navbtn">
              <div className="wrapper16">
                <input
                  className='file-input'
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div> */}
        {/* <select
              aria-label="Small select example"
              onChange={changeChoice}>
              <option value={null}>객관식 개수</option>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                )
              })}
            </select>
            <select
              aria-label="Small select example"
              onChange={changeShortAnswer}>
              <option value={null}>주관식 개수</option>
              {Array.from({ length: 10 }).map((_, i) => {
                return (
                  <option value={i + 1} key={`weekKey${i}`}>{i + 1}개</option>
                )
              })}
            </select>
            <select
              aria-label="Small select example"
              value={quizType}
              onChange={handleTypeChange}>
              <option value={null}>문제 유형</option>
              <option value={"EXERCISE"}>연습 문제</option>
              <option value={"PRACTICE"} >실습 문제</option>
            </select> */}
        {/* <textarea placeholder="퀴즈 설명" onChange={changeDescription}></textarea> */}

        {/* </div>
          <div className="fileinput1">
            <div className="parent1">
              <b className="b77">동영상명 :</b>
              <textarea placeholder="자료명을 입력해주세요" onChange={changeVideoTitle}></textarea>
            </div>
            <div className="fileinput-inner">
              <div className="wrapper17">
                <input
                  className='file-input'
                  type="file"
                  accept=".mp4, .mov"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
          </div>
        </section> */}
      </div>
      {/* <div className="fileuploadmodal-child" /> */}
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`}
          onClick={props.onRequestClose}>닫기
        </button>
        <button className={`btn btn-primary ${styles.goBtn}`} onClick={uploadFiles}>업로드</button>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
