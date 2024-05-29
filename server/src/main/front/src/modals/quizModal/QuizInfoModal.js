import { useEffect, useState } from "react";
import Info from "../modalComponents/Info";
import Modal from 'react-modal';
import { Navigate, useNavigate } from "react-router-dom";
import styles from "./QuizInfoModal.module.css"
import { IoClose } from "react-icons/io5";

const QuizInfoModal = (props) => {
  Modal.setAppElement('#root')
  const { reRender, ...restProps } = props.props;
  const [formattedDate, setFormattedDate] = useState()
  const navigate = useNavigate()
  const data = props.props
  const moveToDoQuiz = () => {
    navigate('/doquiz', {
      state: {
        props: restProps
      },
    })
  }

  const moveToQuizAnswer = () => {
    navigate('/quizanswer', {
      state: {
        props: restProps,
        courseDto: props.courseDto,
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
    const inputDate = props?.props.deadline
    const data = formatDate(inputDate);
    setFormattedDate(data)
  }, [])

  return (
    <Modal className={styles.modalContainer}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)'
        }
      }}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <div className={styles.top}>
        <h3 className={styles.title}>{props.props.quizName}</h3>
        <button type="button" className={`btn btn-primary ${styles.closeBtn} ${styles.closeBtn2}`} onClick={props.onRequestClose}><IoClose /></button>
      </div>
      <div className={`no-scroll-bar ${styles.gap}`}>
        <div className={styles.contents}>
          <Info title={"종료 기한"} content={formattedDate} />
          <Info title={"제한 시간"} content={`${data.timeLimit}분`} />
        </div>
        <div className={styles.contents}>
          {
            data.quizScore === undefined ? <Info title={"점수"} content={`- 점 / 100점`} /> :
              <Info title={"점수"} content={`${data?.quizScore === null || props.props.submissionStatus == 0 ? "- " : data?.quizScore}점 / 100점`} />
          }
          <Info title={"반영 비율"} content={`${data.reflectionRatio == undefined ? "없음" : `${data.reflectionRatio == undefined}%`} / 20%`} />
          {
            data.quizType === "PRACTICE" ? <Info title={"분류"} content={"실습 문제"} /> :
              data.quizType === "EXAM" ? <Info title={"분류"} content={"시험"} /> :
                <Info title={"분류"} content={"연습 문제"} />
          }
        </div>
        <div className={styles.contents}>
          <Info title={"설명"} content={data.description} />
        </div>
      </div>
      <div className={styles.bottom}>
        <button className={`btn btn-primary ${styles.closeBtn}`} onClick={props.onRequestClose}>닫기</button>
        {props.props.submissionStatus === true ||
          props.props.memberInfoDto?.memberType === "PROFESSOR" ||
          props.checkDueDate < 0
          ? <button className={`btn btn-primary ${styles.goBtn}`} onClick={moveToQuizAnswer}>
            {props.props.memberInfoDto?.memberType === "PROFESSOR" ? "퀴즈 보기" : "해설 보기"}
          </button>
          : <button className={`btn btn-primary ${styles.goBtn}`} onClick={moveToDoQuiz}>
            응시 하기
          </button>
        }
      </div>
    </Modal>
  );
};

export default QuizInfoModal;
