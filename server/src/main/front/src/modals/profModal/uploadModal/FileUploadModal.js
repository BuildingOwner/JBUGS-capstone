import axios from "axios";
import "./FileUploadModal.css";
import Modal from "react-modal";
import { useState } from "react";

const FileUploadModal = (props) => {
  Modal.setAppElement('#root')
  const [weekNumber, setWeekNumber] = useState(null)
  const [fileTitle, setFileTitle] = useState(null)
  const [videoTitle, setVideoTitle] = useState(null)
  const [videoFiles, setVideoFile] = useState(null)
  const [attachFiles, setAttachFile] = useState(null)
  const [shortAnswer, setShortAnswer] = useState(null)
  const [choice, setChoice] = useState(null)


  const handleFileChange = (e) => {
    setAttachFile(e.target.files[0])
    console.log("attachFile : ",e.target.files[0])
  }

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0])
    console.log("videoFile : ",e.target.files[0])
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
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
      className="fileuploadmodal">
      <div className="group">
        <b className="b74">파일 업로드</b>
        <div className="title6">
          <div className="heroicons-outlinex5" onClick={props.onRequestClose}>
            <img
              className="vector-icon12"
              loading="lazy"
              alt=""
              src="/vector1.svg"
            />
          </div>
        </div>
      </div>
      <main className="frame-group">
        <div className="car-wrapper">
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
        </div>
        <section className="fileinput-parent">
          <div className="fileinput">
            <div className="file-name">
              <b className="b76">{`자료명 : `}</b>
              <textarea placeholder="자료명을 입력해주세요" onChange={changeFileTitle}></textarea>
            </div>
            <div className="navbtn">
              <div className="wrapper16">
                {/* 파일 input */}
                <input
                  className='file-input'
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </div>
            <select
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
          </div>
          <div className="fileinput1">
            <div className="parent1">
              <b className="b77">동영상명 :</b>
              <textarea placeholder="자료명을 입력해주세요" onChange={changeVideoTitle}></textarea>
            </div>
            <div className="fileinput-inner">
              <div className="wrapper17">
                {/* 비디오 input */}
                <input
                  className='file-input'
                  type="file"
                  accept=".mp4, .mov"
                  onChange={handleVideoChange}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="fileuploadmodal-child" />
      <div className="nav-btn-group">
        <button className="nav-btn2" onClick={props.onRequestClose}>
          <div className="file-inputfile-input">취소</div>
        </button>
        <button className="nav-btn3" onClick={uploadFiles}>
          <b className="text2">업로드</b>
        </button>
      </div>
    </Modal>
  );
};

export default FileUploadModal;
