import { useEffect, useState } from "react";
import styles from "./ListItem.module.css"
import { useNavigate } from "react-router-dom";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";
import axios from "axios";
import { IoClose } from "react-icons/io5";

const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileColor, setfileColor] = useState('');
  const [byte, setByte] = useState(0)
  const [memberInfoDto, setMemberInfoDto] = useState();

  const openModal = () => {
    console.log('modal open')
    setModalIsOpen(true);
  }

  const closeModal = (event) => {
    console.log("modal close")
    setModalIsOpen(false)
    // 이벤트 버블링을 막음
    event.stopPropagation()
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
      moveToAssignmentList();
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

      const videoWindow = window.open('', '_blank') // 새 창을 엽니다.
      videoWindow.document.write(
        `<video controls autoplay style="width:100%;height:auto;">
          <source src="${videoUrl}" type="${mimeType}">
          Your browser does not support the video tag.
        </video>`
      ) // 새 창에 비디오 태그를 작성합니다.
    } catch (error) {
      alert("동영상을 불러올 수 없습니다.")
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
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const remainDate = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysRemaining(remainDate >= 0 ? remainDate : 0);
    } else if (props.url === "quizlist") {
      const dueDate = new Date(props.deadline);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      const remainDate = Math.ceil(timeDiff / (1000 * 3600 * 24))
      setDaysRemaining(remainDate >= 0 ? remainDate : 0);
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
    }
    calcByte()
    setMemberInfoDto(props.memberInfoDto)
  });

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
    <div className={styles.listItem} onClick={checkURL}>
      <QuizInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props} />
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
            props.memberInfoDto?.memberType == "STUDENT" ?
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
            <h3 className={`${styles.fontSize} ${styles.blue}`}>length</h3>
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
            <h3 className={styles.fontSize}>{props.contents}</h3>}
        </div>
      </div>
      <div className={styles.fourth}>
        {props.url === 'assignmentlist' && (
          <h3 className={styles.fontSize}>{daysRemaining}일 남음</h3>
        )}
        {props.url === 'quizlist' && (
          <h3 className={styles.fontSize}>{daysRemaining}일 남음</h3>
        )}
        {props.url === 'file' && (
          <>
            <h3 className={styles.fontSize}>{byte}</h3>
            {
              props.memberInfoDto.memberType === "STUDENT" ? null :
                <button type="button"
                  className={`btn btn-primary ${styles.deleteBtn}`}
                  onClick={(e) => handleDeleteFile(e)}>
                  <IoClose size={25} />
                </button>
            }
          </>
        )}
        {props.url === 'video' && (
          <>
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
  )
}

export default ListItem