import { useEffect, useState } from "react";
import "./ListItem.css"
import { useNavigate } from "react-router-dom";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";

const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()
  const [fileExtension, setFileExtension] = useState()
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);

  // 모달창 노출
  const showModal = () => {
      setModalOpen(true);
  };

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
      console.log("file")
      const extension = props.fileName.split('.')
      const last = extension.length - 1

      setFileExtension(extension[last])
    }
  }, [modalOpen]);
  
  const checkURL = () => {
    if (props.url === "assignmentlist") {
      moveToAssignmentList();
    } else if (props.url === "quizlist") {
      openQuizmodal();
    }
  }

  const moveToAssignmentList = () => {
    navigate('/assignmentlist', { state: props.enrollmentId })
  }

  const openQuizmodal = () => {
    showModal()
  }

  const closeModal = (bool) => {
    setModalOpen(bool)
    console.log("돼야한다")
  }
  return (

    <div className="list-item-cjw" onClick={checkURL}>
      <div className="flex-cjw">
        <div className="first">
          {props.url === 'assignmentlist' && (
            props.status === "NOT_SUBMITTED" ? (
              <h4>
                미제출
              </h4>
            ) : (
              <h4>
                제출
              </h4>
            )
          )}
          {props.url === 'quizlist' && (
            props.submissionStatus === true ? (
              <h4>
                응시
              </h4>
            ) : (
              <h4>
                미응시
              </h4>
            )
          )}
          {props.url === 'file' && (
            
            <h4>{fileExtension}</h4>
          )}
          {props.url === 'video' && (
            <h4>length</h4>
          )}

        </div>
        <div className="second">
          {props.url === 'assignmentlist' && (
            <h4>{props.title}</h4>
          )}
          {props.url === 'quizlist' && (
            <h4>{props.quizName}</h4>
          )}
          {props.url === 'file' && (
            <h4>{props.fileName}</h4>
          )}
          {props.url === 'video' && (
            <h4>This is a video</h4>
          )}
        </div>
        <div className="third">
          <div className="prograss-bar"></div>
          <h4>{props.contents}</h4>

        </div>
      </div>
      <div className="fourth">
        {props.url === 'assignmentlist' && (
            <h4>{daysRemaining}일 남음</h4>
          )}
          {props.url === 'quizlist' && (
            <h4>{daysRemaining}일 남음</h4>
          )}
          {props.url === 'file' && (
            <h4>sizeOfFile</h4>
          )}
          {props.url === 'video' && (
            <h4>progressPercent</h4>
          )}
      </div>
      {modalOpen === true ? <QuizInfoModal
        modalChange={closeModal}
        modalOpen={modalOpen}
        props={props}
        /> : null}
    </div>
  )
}

export default ListItem