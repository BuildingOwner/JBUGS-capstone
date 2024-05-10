import { useEffect, useState } from "react";
import Info from "../modalComponents/Info";
import "./QuizInfoModal.css";
import Modal from 'react-modal';
import { Navigate, useNavigate } from "react-router-dom";

const QuizInfoModal = (props) => {
  Modal.setAppElement('#root');
  const [formattedDate, setFormattedDate] = useState()
  const navigate = useNavigate()

  const moveToDoQuiz = () => {
    navigate('/doquiz', {
      state: {
        props: props.props
      },
    })
  }

  const moveToQuizAnswer = () => {
    navigate('/quizanswer', {
      state: {
        props: props.props
      },
    })
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(-2); // 연도의 마지막 두 자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 월
    const day = date.getDate().toString().padStart(2, '0'); // 일
    const hours = date.getHours().toString().padStart(2, '0'); // 시간
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분

    // 최종 포맷팅된 문자열 생성
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const inputDate = props.props.deadline
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])

  return (
    <Modal className="quizinfomodal"
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <div className="top7">
        <h3 className="h38">{props.props.quizName}</h3>
        <div className="heroicons-outlinex27" onClick={props.onRequestClose}>
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
            <b className="minutes">{formattedDate}</b>
          </div>
          <div className="time1">
            <b className="b79">제한 시간</b>
            <b className="b80">60 분</b>
          </div>
        </div>
        <Info prop="점수"
          score={props.props.quizScore}
          props={props.props} />
        <section className="discription">
          <b className="b81">설명</b>
          <b className="b82">
            <p className="p25">{props.props.description}</p>
          </b>
        </section>
      </main>
      <div className="bottom3">
        <button className='close-btn' onClick={props.onRequestClose}>닫기</button>
        {props.props.submissionStatus === true
          ? <button className="nav-btn5" onClick={moveToQuizAnswer}>
            <b className="text4">해설 보기</b>
          </button>
          : <button className="nav-btn5" onClick={moveToDoQuiz}>
            <b className="text4">응시 하기</b>
          </button>

        }

      </div>
    </Modal>
  );
};

export default QuizInfoModal;
