import "./ListItem.css"
import { useNavigate } from "react-router-dom";
const ListItem = (props) => {
  const navigate = useNavigate()
  const dueDate = new Date(props.dueDate);
  // 현재 날짜를 가져옵니다
  const currentDate = new Date();
  // 남은 시간을 계산합니다 (밀리초 단위)
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  // 남은 일수를 계산합니다
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const checkURL = () => {
    if(props.url == "assignmentlist")
      moveToAssignmentList()
  }

  const moveToAssignmentList = () => {
    navigate('/assignmentlist', { state: props.enrollmentId })
  }

  return (
    <div className="list-item-cjw" onClick={checkURL}>
      <div className="flex-cjw">
        <div className="first">
          {props.status === "NOT_SUBMITTED" ? (
          <h4>
            미제출
          </h4>
        ) : (
          <h4>
            제출
          </h4>
        )}
        </div>
        <div className="second">
          <h4>{props.title}</h4>
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