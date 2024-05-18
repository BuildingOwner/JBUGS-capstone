import { useState, useEffect } from "react";
import MainAssignItem from "./MainAssignItem"
import axios from "axios";
import "./RightNav.css";
import { useNavigate } from "react-router-dom"
import styles from "./RightNav.module.css"
import NoItem from "./NoItem";
import { FaUser } from "react-icons/fa";


const RightNav = (props) => {
  const navigate = useNavigate()
  console.log("RightNav의 props", props)
  const mainLectures = props.mainLectures

  const handleLogout = () => {
    axios.post('/logout', null, { withCredentials: true }) // withCredentials를 설정하여 쿠키를 서버로 전송합니다.
      .then(response => {
        // 로그아웃 성공 시 처리
        console.log("로그아웃 성공");

      })
      .catch(error => {
        // 오류 처리
        console.error("로그아웃 실패", error);
      });
    navigate("/");
  }

  const checkDueDate = (dueDateString) => {
    // 현재 날짜 및 시간
    const now = new Date();

    // 마감 날짜를 나타내는 Date 객체 생성
    const dueDate = new Date(dueDateString);

    // dueDate가 now보다 미래인지 확인
    if (dueDate > now) {
      console.log("dueDate는 현재 시간보다 미래입니다.");
      return true;
    } else {
      console.log("dueDate는 현재 시간보다 과거입니다.");
      return false;
    }
  }

  return (
    <div className="rightnav">
      <div className="righttop">
        <div className="info9">
          <div className="parent9">
            <b className="b176">{props.memberName}</b>
            <div className="div161">{props.firstTrack}</div>
          </div>
          <div className={styles.userBg}>
            <FaUser size={30} />
          </div>
          <button type="button" className={`btn btn-primary ${styles.logoutBtn}`} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className={styles.contants}>
        <div className={`homework ${styles.yetContainer}`}>
          <div className="hw-top">
            <h1 className="title17">미제출 과제</h1>
          </div>
          <div className={`hw-item no-scroll-bar ${styles.hwItem}`}>
            {
              mainLectures ?
                mainLectures.map((lecture) => (
                  lecture.assignments
                    .filter((assignment) => assignment.status === 'NOT_SUBMITTED')
                    .filter((assignment) => checkDueDate(assignment.dueDate))
                    .map((assignment) => ( // 이거 남은날짜가 적은거 부터 나왔으면 좋겠음 밑에꺼도 똑같이
                      <MainAssignItem
                        lectureName={lecture.lectureName}
                        key={assignment.id}
                        title={assignment.title}
                        contents={assignment.contents}
                        dueDate={assignment.dueDate}
                        weekNumber={assignment.weekNumber}
                        status={assignment.status}
                        enrollmentId={lecture.enrollmentId}
                      />
                    ))
                )) : <NoItem title={"미제출 과제가"} />
            }
          </div>
        </div>
        <div className={`homework ${styles.yetContainer}`}>
          <div className="hw-top">
            <h1 className="title17">미응시 퀴즈</h1>
          </div>
          <div className={`hw-item no-scroll-bar ${styles.hwItem}`}>
            {mainLectures ?
              mainLectures.map((lecture) => (
                lecture.quizDtoList
                  .filter((quiz) => quiz.submissionStatus === false)
                  .filter((quiz) => checkDueDate(quiz.deadline))
                  .map((quiz) => (
                    <MainAssignItem
                      lectureName={lecture.lectureName}
                      url={"quiz"}
                      key={quiz.quizId}
                      title={quiz.quizName}
                      contents={quiz.description} // 퀴즈 설명
                      dueDate={quiz.deadline}
                      weekNumber={quiz.week}
                      status={quiz.submissionStatus}
                      enrollmentId={lecture.enrollmentId}
                      timeLimit={quiz.timeLimit}
                    />
                  ))
              )) : <NoItem title={"미응시 퀴즈가"} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNav;
