import { useEffect, useState } from "react";
import styles from "./ListItem.module.css"
import { useNavigate } from "react-router-dom";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import { HiOutlineSquaresPlus } from "react-icons/hi2";
import QuizUploadModal from "../../modals/profModal/uploadModal/QuizUploadModal"
import AssignmentModal from "../../modals/assignModal/AssignmentModal.js"

const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [assignIsOpen, setAssignIsOpen] = useState(false)
  const [uploadModalIsOpen, setUploadModalIsOpen] = useState(false);
  const [fileColor, setfileColor] = useState('');
  const [byte, setByte] = useState(0)
  const [memberInfoDto, setMemberInfoDto] = useState();
  const [timeDifference, setTimeDifference] = useState(null)
  const [videoLength, setVideoLength] = useState("00:00")

  // 과제모달
  const openAssignModal = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setAssignIsOpen(true)
  }
  // 과제모달
  const closeAssignModal = (event) => {
    if (event) {
      // 이벤트 버블링을 막음
      event.stopPropagation()
    }
    setAssignIsOpen(false)
  }

  // 퀴즈 업로드 모달
  const openUploadModal = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setUploadModalIsOpen(true);
  }

  // 퀴즈 업로드 모달
  const closeUploadModal = (event) => {
    if (event) {
      // 이벤트 버블링을 막음
      event.stopPropagation()
    }
    setUploadModalIsOpen(false)
  }

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = (event) => {
    setModalIsOpen(false)
    // 이벤트 버블링을 막음
    event.stopPropagation()
  }

  const handleDeleteQuiz = async (event) => {
    if (event) {
      event.stopPropagation()
    }
    if (confirm("삭제 하시겠습니까?") === true) {
      try {
        const response = await axios.delete(`/api/quiz/${props.quizId}`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    props.reRender()
  }

  const handleDeleteVideoFile = async (event) => {
    if (event) {
      event.stopPropagation()
    }
    if (confirm("삭제 하시겠습니까?") === true) {
      try {
        const response = await axios.delete(`/api/videoMaterial/${props.videoId}`)
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }
    props.reRender()
  }

  const handleDeleteFile = async (event) => {
    if (event) {
      event.stopPropagation()
    }
    if (confirm("삭제 하시겠습니까?") === true) {
      try {
        const response = await axios.delete(`/api/material/${props.fileId}`);
        console.log(response.data); // 서버로부터의 응답을 처리합니다.
      } catch (error) {
        console.error('Error deleting material:', error);
      }
    }
    props.reRender()
  }

  const checkURL = () => {
    if (props.url === "assignmentlist") {
      openAssignModal()
      // moveToAssignmentList();
    } else if (props.url === "quizlist") {
      openModal();
    } else if (props.url === "video") {
      watchVideo()
    } else {
      downloadFile()
    }
  }

  const moveToAssignmentList = () => {
    navigate('/assignmentlist', { state: props })
  }

  const calcByte = () => {
    let byte = props.fileSize
    let count = 0
    while (byte > 1000) {
      if (byte > 1000) {
        byte /= 1000
        count += 1
      }
    }
    if (count === 0) {
      setByte(`${Math.round(byte * 10) / 10}B`)
    } else if (count === 1) {
      setByte(`${Math.round(byte * 10) / 10}KB`)
    } else if (count === 2) {
      setByte(`${Math.round(byte * 10) / 10}MB`)
    }

  }

  const removeExtension = (filename) => {
    const lastIndex = filename.lastIndexOf('.');
    if (lastIndex === -1) return filename; // 확장자가 없다면 그대로 반환
    return filename.substring(0, lastIndex);
  }

  const watchVideo = async () => {
    const videoName = props.videoName.split('.')
    const length = videoName.length
    const extension = videoName[length - 1].toLowerCase() // 확장자명 추출

    // 확장자에 따른 MIME 타입 매핑
    const mimeTypes = {
      'mp4': 'video/mp4',
      'mov': 'video/quicktime',
      'webm': 'video/webm',
      'ogg': 'video/ogg',
      'avi': 'video/x-msvideo',
      'wmv': 'video/x-ms-wmv',
      'flv': 'video/x-flv',
      'mkv': 'video/x-matroska',
    }
    const mimeType = mimeTypes[extension] || 'video/mp4'

    try {
      const response = await axios.get(`/api/course/stream/${props.videoId}`, {
        responseType: 'blob' // 바이너리 데이터로 응답 받기
      })
      const videoBlob = new Blob([response.data], { type: mimeType }) // Blob 객체 생성
      const videoUrl = URL.createObjectURL(videoBlob) // Blob URL 생성
      console.log("response", response)
      const newWindow = window.open("/videoplayer", "_blank", "width=800,height=600");

      // 새 창이 로드된 후 메시지 전송
      newWindow.onload = function () {
        // response.headers에서 'playback-time' 헤더의 값을 안전하게 가져오기
        const playbackTime = response.headers['playback-time'] ? response.headers['playback-time'] : null;

        // postMessage를 사용하여 새 창에 메시지 전송
        newWindow.postMessage({
          videoUrl: videoUrl,
          videoName: videoName,
          videoId: props.videoId,
          memberId: memberInfoDto.memberId,
          playbackTime: playbackTime
        }, '*');
      }
      newWindow.onclose = props.reRender()

    } catch (error) {
      alert("동영상을 불러올 수 없습니다.")
      console.log(error)
    }
  }

  const downloadFile = async () => {

    try {
      console.log(" fileExtension", fileExtension)
      // axios.get 메소드를 사용하여 비동기 요청을 수행하고, 응답을 response 변수에 저장
      const response = await axios.get(`/api/course/files/download/${props.enrollmentId}/${props.fileName}`
        , {
          responseType: 'blob', // 파일 다운로드를 위해 응답 타입을 blob으로 설정
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data], { type: `application/${fileExtension}` }));

      // 서버에서 받은 응답 데이터를 Blob 객체로 감싸고, 그 객체를 사용하여 다운로드할 수 있는 URL 생성
      const link = document.createElement('a');
      // 'a' 요소를 생성하여 link라는 이름의 상수에 할당 (이 요소는 다운로드 링크를 나타냄)

      link.href = downloadUrl;
      // 'a' 요소의 href 속성을 다운로드할 URL인 downloadUrl로 설정

      link.setAttribute('download', `${props.title}`);
      // 'a' 요소의 download 속성을 설정하여 파일 이름을 지정

      document.body.appendChild(link);
      // 'a' 요소를 문서의 본문(body)에 추가

      link.click();
      // 'a' 요소를 클릭하여 다운로드를 시작

      link.remove();
      // 'a' 요소를 문서에서 제거
    } catch (error) {
      console.error(`Error while downloading the ${fileExtension}}:`, error);
      alert("파일을 받을 수 없습니다.")
    }
  }

  useEffect(() => {
    if (props.url === "assignmentlist") {
      const dueDate = new Date(props.dueDate);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime()
      const remainDate = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysRemaining(remainDate >= 0 ? remainDate : 0)
      if (timeDiff < 0) {
        setTimeDifference(timeDiff)
      }
    } else if (props.url === "quizlist") {
      const dueDate = new Date(props.deadline);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const remainDate = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysRemaining(remainDate >= 0 ? remainDate : 0)
      if (timeDiff < 0) {
        setTimeDifference(timeDiff)
      }
    } else if (props.url === "file") {
      // console.log("file")
      const extension = props.fileName.split('.')
      const last = extension.length - 1

      if (extension[last].includes('pdf')) {
        setfileColor(styles.red);
      } else if (extension[last].includes('ppt')) {
        setfileColor(styles.yellow);
      } else if (extension[last].includes('xl')) {
        setfileColor(styles.green);
      } else if (extension[last].includes('doc') || extension[last].includes('hwp')) {
        setfileColor(styles.blue);
      } else {
        setfileColor(styles.common);
      }

      setFileExtension(extension[last])
    } else if (props.url === "video") {
      const duration = props.videoLength
      let minute
      let second
      if (Math.floor(duration / 60) / 10 === 0) {
        minute = `0${Math.floor(duration / 60)}`
      } else {
        minute = Math.floor(duration / 60)
      }
      if (Math.floor(duration % 60) / 10 === 0) {
        second = `0${Math.floor(duration % 60)}`
      } else {
        second = Math.floor(duration % 60)
      }


      setVideoLength(`${minute}:${second}`)
    }
    calcByte()
    setMemberInfoDto(props.memberInfoDto)
  })

  const checkDueDate = (dueDateString) => {
    // 현재 날짜 및 시간
    const now = new Date();
    // 마감 날짜를 나타내는 Date 객체 생성
    const dueDate = new Date(dueDateString);
    // dueDate가 now보다 미래인지 확인
    if (dueDate > now) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <>
      <div className={styles.listItem} onClick={checkURL}>
        <div className={styles.flex}>
          <div className={styles.first}>
            {props.url === 'assignmentlist' && (
              props.memberInfoDto?.memberType == "STUDENT" ?
                (props.submissionStatus === true ? (
                  <h3 className={`${styles.fontSize} ${styles.green}`}>
                    제출
                  </h3>
                ) : (
                  <h3 className={`${styles.fontSize} ${styles.red}`}>
                    미제출
                  </h3>
                )) :
                (checkDueDate(props.dueDate) === true ? (
                  <h3 className={`${styles.fontSize} ${styles.red}`}>
                    진행중
                  </h3>
                ) : (
                  <h3 className={`${styles.fontSize} ${styles.green}`}>
                    마감
                  </h3>
                ))
            )}
            {props.url === 'quizlist' && (
              props.memberInfoDto?.memberType === "STUDENT" ?
                (props.submissionStatus === true ? (
                  <h3 className={`${styles.fontSize} ${styles.green}`}>
                    응시
                  </h3>
                ) : (
                  <h3 className={`${styles.fontSize} ${styles.red}`}>
                    미응시
                  </h3>
                )) :
                (checkDueDate(props.deadline) === true ? (
                  <h3 className={`${styles.fontSize} ${styles.red}`}>
                    진행중
                  </h3>
                ) : (
                  <h3 className={`${styles.fontSize} ${styles.green}`}>
                    마감
                  </h3>
                ))
            )}
            {props.url === 'file' && (
              <h3 className={`${styles.fontSize} ${fileColor}`}>{fileExtension}</h3>
            )}
            {props.url === 'video' && (
              <h3 className={`${styles.fontSize} ${styles.blue}`}>{videoLength !== null ? videoLength : `00:00`}</h3>
            )}
          </div>
          <div className={styles.second}>
            {props.url === 'assignmentlist' && (
              <h3 className={styles.fontSize}>{props.title}</h3>
            )}
            {props.url === 'quizlist' && (
              <h3 className={styles.fontSize}>{props.quizName}</h3>
            )}
            {props.url === 'file' && (
              <h3 className={styles.fontSize}>{removeExtension(props.title)}</h3>
            )}
            {props.url === 'video' && (
              <h3 className={styles.fontSize}>{removeExtension(props.title)}</h3>
            )}
          </div>
          <div className={styles.third}>
            {props.url === 'video' ?
              <div className="prograss-bar"></div> :
              <h3 className={`${styles.fontSize} ${styles.width}`}>{props.contents}</h3>}
          </div>
        </div>
        <div className={styles.fourth}>
          {
            props.url === 'assignmentlist' ? (
              checkDueDate(props.dueDate) === true ?
                (
                  <h3 className={styles.fontSize}>{daysRemaining}일 남음</h3>
                ) : (
                  <h3 className={styles.fontSize}>마감</h3>
                )
            ) : null // 'assignmentlist'가 아닐 경우 아무 것도 출력x
          }

          {props.url === 'quizlist' && (
            <>
              {
                checkDueDate(props.deadline) === true ?
                  <h3 className={styles.fontSize}>{daysRemaining}일 남음</h3> :
                  <h3 className={styles.fontSize}>마감</h3>
              }
              {
                props.memberInfoDto.memberType === "STUDENT" ? null :
                  <div className={styles.modBtns}>
                    <button type="button"
                      className={`btn btn-primary ${styles.deleteBtn}`}
                      onClick={(e) => handleDeleteQuiz(e)}>
                      <IoClose size={25} />
                    </button>
                  </div>
              }
            </>
          )}
          {props.url === 'file' && (
            <>
              <h3 className={styles.fontSize}>{byte}</h3>
              {
                props.memberInfoDto.memberType === "STUDENT" ? null :
                  <div className={styles.modBtns}>
                    {fileExtension === "pdf" ?
                      <button type="button"
                        className={`btn btn-primary ${styles.modBtn}`}
                        onClick={(e) => openUploadModal(e)}>
                        <HiOutlineSquaresPlus size={25} />
                      </button> : null
                    }
                    <button type="button"
                      className={`btn btn-primary ${styles.deleteBtn}`}
                      onClick={(e) => handleDeleteFile(e)}>
                      <IoClose size={25} />
                    </button>
                  </div>
              }
            </>
          )}
          {props.url === 'video' && (
            <>
              <h3 className={styles.fontSize}>{props.percent}%</h3>
              <h3 className={styles.fontSize}>{byte}</h3>
              {
                props.memberInfoDto.memberType === "STUDENT" ? null :
                  <button type="button"
                    className={`btn btn-primary ${styles.deleteBtn}`}
                    onClick={(e) => handleDeleteVideoFile(e)}>
                    <IoClose size={25} />
                  </button>
              }
            </>
          )}
        </div>
      </div>
      <QuizInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props}
        checkDueDate={checkDueDate(props.deadline)} />
      <QuizUploadModal
        isOpen={uploadModalIsOpen}
        onRequestClose={closeUploadModal}
        props={props}
        timeDifference={timeDifference} />
      <AssignmentModal
        isOpen={assignIsOpen}
        onRequestClose={closeAssignModal}
        props={props}
        timeDifference={timeDifference} />
    </>
  )
}

export default ListItem