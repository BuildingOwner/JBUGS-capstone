import { useEffect } from "react";
import Info from "../modalComponents/Info";
import "./QuizInfoModal.css";
import Modal from 'react-modal';
import { Navigate, useNavigate } from "react-router-dom";

const QuizInfoModal = (props) => {
  const navigate = useNavigate()
  console.log("modal의 props : ", props)
  console.log(props.props.quizScore)

  const closeModal = () => {
    props.modalChange(false)
  }

  const moveToDoQuiz = () => {
    console.log("전달된 state : ", props.props.quizId)
    navigate('/doquiz', {state: props.props.quizId})
  }

  return (
    <Modal className="quizinfomodal"
      isOpen={props.modalOpen}
      onRequestClose={closeModal} // 모달을 닫는 함수를 전달
      ariaHideApp={false} >
      <div className="top7">
        <h3 className="h38">{props.props.quizName}</h3>
        <div className="heroicons-outlinex27" onClick={closeModal}>
          <img
            className="vector-icon74"
            loading="lazy"
            alt=""
            src="/vector1.svg"
          />
        </div>
      </div>
      <main className="scroll3">
        <div className="deadline">
          <div className="deadline1">
            <b className="b78">종료 기한</b>
            <b className="minutes">{props.props.deadline}</b>
          </div>
          <div className="time1">
            <b className="b79">제한 시간</b>
            <b className="b80">60 분</b>
          </div>
        </div>
        <Info prop="점수" score={props.props.quizScore}
          props={props.props} />
        <section className="discription">
          <b className="b81">설명</b>
          <b className="b82">
            <p className="p25">{props.props.description}</p>
          </b>
        </section>
      </main>
      <div className="bottom3">
        <button className='close-btn' onClick={closeModal}>닫기</button>
        <button className="nav-btn5" onClick={moveToDoQuiz}>
          <b className="text4">응시 하기</b>
        </button>
      </div>
    </Modal>
  );
};

export default QuizInfoModal;
