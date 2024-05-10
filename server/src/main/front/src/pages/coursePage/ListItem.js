import { useEffect, useState } from "react";
import styles from "./ListItem.module.css"
import { useNavigate } from "react-router-dom";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";

const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    console.log("닫혀야함")
    setModalIsOpen(false);
  }

  const checkURL = () => {
    if (props.url === "assignmentlist") {
      moveToAssignmentList();
    } else if (props.url === "quizlist") {
      openModal();
    }
  }

  const moveToAssignmentList = () => {
    navigate('/assignmentlist', { state: props })
  }

  const [fileColor, setfileColor] = useState('');

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
            <h3 className={styles.fontSize}>{props.fileName}</h3>
          )}
          {props.url === 'video' && (
            <h3 className={styles.fontSize}>This is a video</h3>
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
          <h3 className={styles.fontSize}>sizeOfFile</h3>
        )}
        {props.url === 'video' && (
          <h3 className={styles.fontSize}>progressPercent</h3>
        )}
      </div>
    </div>
  )
}

export default ListItem