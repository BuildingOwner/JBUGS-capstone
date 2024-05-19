import { useEffect, useState } from "react";
import styles from "./ListItem.module.css"
import { useNavigate } from "react-router-dom";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";
import axios from "axios";

const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileColor, setfileColor] = useState('');
  const [byte, setByte] = useState(0)
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

  const checkURL = () => {
    if (props.url === "assignmentlist") {
      moveToAssignmentList();
    } else if (props.url === "quizlist") {
      openModal();
    } else if (props.url === "video") {

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

  const downloadFile = async () => {
    try {
      // axios.get 메소드를 사용하여 비동기 요청을 수행하고, 응답을 response 변수에 저장
      const response = await axios.get(`/api/course/files/download/${props.fileName}`
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
      console.error('Error while downloading the PDF:', error);
    }
  }


  useEffect(() => {
    if (props.url === "assignmentlist") {
      const dueDate = new Date(props.dueDate);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      setDaysRemaining(Math.ceil(timeDiff / (1000 * 3600 * 24)));
    } else if (props.url === "quizlist") {
      const dueDate = new Date(props.deadline);
      const currentDate = new Date();
      const timeDiff = dueDate.getTime() - currentDate.getTime();
      setDaysRemaining(Math.ceil(timeDiff / (1000 * 3600 * 24)));
    } else if (props.url === "file") {
      // console.log("file")
      const extension = props.fileName.split('.')
      const last = extension.length - 1

      if (extension[last].includes('pdf')) {
        setfileColor(styles.yellow);
      } else if (extension[last].includes('ppt')) {
        setfileColor(hear = styles.red);
      } else if (extension[last].includes('xl')) {
        setfileColor(hear = styles.green);
      } else if (extension[last].includes('doc') || extension[last].includes('hwp')) {
        setfileColor(hear = styles.blue);
      }

      setFileExtension(extension[last])
    }
    calcByte()
  }, []);

  return (
    <div className={styles.listItem} onClick={checkURL}>
      <QuizInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props} />
      <div className={styles.flex}>
        <div className={styles.first}>
          {props.url === 'assignmentlist' && (
            props.status === "NOT_SUBMITTED" ? (
              <h3 className={`${styles.fontSize} ${styles.red}`}>
                미제출
              </h3>
            ) : (
              <h3 className={`${styles.fontSize} ${styles.green}`}>
                제출
              </h3>
            )
          )}
          {props.url === 'quizlist' && (
            props.submissionStatus === true ? (
              <h3 className={`${styles.fontSize} ${styles.green}`}>
                응시
              </h3>
            ) : (
              <h3 className={`${styles.fontSize} ${styles.red}`}>
                미응시
              </h3>
            )
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
          {console.log(props)}
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
          <h3 className={styles.fontSize}>{byte}
          </h3>
        )}
        {props.url === 'video' && (
          <h3 className={styles.fontSize}>{byte}</h3>
        )}
      </div>
    </div>
  )
}

export default ListItem