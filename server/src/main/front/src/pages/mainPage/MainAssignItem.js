import { useNavigate } from "react-router-dom";
import "./MainAssignItem.css"
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";
import { useState } from "react";
const MainAssignItem = (props) => {
  const navigate = useNavigate()
  console.log("MainAssignItem의 props", props)
  // dueDate 문자열을 Date 객체로 변환합니다
  const dueDate = new Date(props.dueDate);
  // 현재 날짜를 가져옵니다
  const currentDate = new Date();
  // 남은 시간을 계산합니다 (밀리초 단위)
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  // 남은 일수를 계산합니다
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  const moveToPage = () => {
    if (props.url === "quiz") {
      navigate("/quizList", {
        state: props
      })
    } else {
      navigate("/assignmentlist", {
        state: props
      })
    }

  }

  return (
    <div className="homeworkitem" onClick={moveToPage}>
      <QuizInfoModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        props={props} />
      <div className="week">
        <div className="div162">{props.weekNumber}주차</div>
      </div>
      <div className="name2">
        <b className="b177">{props.lectureName}</b>
        <div className="div163">{props.title}</div>
      </div>
      <div className="info10">
        <div className="star-styles">
          <div className="n9">{daysRemaining}일 남음</div>
        </div>
      </div>
    </div>
  );
}

export default MainAssignItem;