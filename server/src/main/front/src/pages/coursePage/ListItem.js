import { useEffect, useState } from "react";
import "./ListItem.css"
import { useNavigate } from "react-router-dom";
const ListItem = (props) => {
  const navigate = useNavigate()
  const [daysRemaining, setDaysRemaining] = useState()

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
  }
}, [props.url, props.dueDate, props.deadline]);
  const checkURL = () => {
    if (props.url === "assignmentlist") {
      moveToAssignmentList();
    } else if (props.url === "quizlist") {
      moveToQuizList();
    }
  }

  const moveToAssignmentList = () => {
    navigate('/assignmentlist', { state: props.enrollmentId })
  }

  return (
    
    <div className="list-item-cjw" onClick={checkURL}>
      <div className="flex-cjw">
        <div className="first">
          {/* type에 따라 다른 UI를 렌더링 */}
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
      {props.url === 'material' && (
        <p>This is a material</p>
      )}
      {props.url === 'video' && (
        <p>This is a video</p>
      )}
          
        </div>
        <div className="second">
        {props.url === 'assignmentlist' && (
        <h4>{props.title}</h4>
      )}
      {props.url === 'quizlist' && (
       <h4>{props.quizName}</h4>
      )}
      {props.url === 'material' && (
        <p>This is a material</p>
      )}
      {props.url === 'video' && (
        <p>This is a video</p>
      )}
        </div>
        <div className="third">
          <div className="prograss-bar"></div>
          <h4>{props.contents}</h4>
          
        </div>
      </div>
      <div className="fourth">
        <h4>{daysRemaining}일 남음</h4>
      </div>
    </div>
  )
}

export default ListItem