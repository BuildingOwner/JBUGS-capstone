import { useState, useEffect } from "react";
import MainAssignItem from "./MainAssignItem";
import axios from "axios";
import "./RightNav.css";
import { useNavigate } from "react-router-dom";
import styles from "./RightNav.module.css";
import NoItem from "./NoItem";
import { FaUser } from "react-icons/fa";

const RightNav = (props) => {
  const navigate = useNavigate();
  console.log("RightNav의 props", props);
  const mainLectures = props.mainLectures;

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
    navigate("/login");
  }

  const checkDueDate = (dueDateString) => {
    const now = new Date();
    const dueDate = new Date(dueDateString);
    return dueDate > now;
  };

  const findPendingAssignments = () => {
    if (!mainLectures) return [];
    return mainLectures.flatMap((lecture) =>
      lecture.assignments
        .filter((assignment) => assignment.status === 'NOT_SUBMITTED')
        .filter((assignment) => checkDueDate(assignment.dueDate))
        .map((assignment) => ({
          ...assignment,
          lectureName: lecture.lectureName,
          enrollmentId: lecture.enrollmentId,
        }))
    ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  };

  const findPendingQuizzes = () => {
    if (!mainLectures) return [];
    return mainLectures.flatMap((lecture) =>
      lecture.quizDtoList
        .filter((quiz) => !quiz.submissionStatus)
        .filter((quiz) => checkDueDate(quiz.deadline))
        .map((quiz) => ({
          ...quiz,
          lectureName: lecture.lectureName,
          enrollmentId: lecture.enrollmentId,
        }))
    ).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  };

  const assignments = findPendingAssignments();
  const quizzes = findPendingQuizzes();

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
            <h1 className="title17">{props.memberType === "PROFESSOR" ? "진행 중인 과제" : "미제출 과제"}</h1>
          </div>
          <div className={`hw-item no-scroll-bar ${styles.hwItem}`}>
            {assignments.length === 0 ? (
              <NoItem title={props.memberType === "PROFESSOR" ? "진행 중인 과제가" : "기한 내 미제출 과제가"} />
            ) : (
              assignments.map((assignment) => (
                <MainAssignItem
                  lectureName={assignment.lectureName}
                  key={assignment.id}
                  title={assignment.title}
                  contents={assignment.contents}
                  dueDate={assignment.dueDate}
                  weekNumber={assignment.weekNumber}
                  status={assignment.status}
                  enrollmentId={assignment.enrollmentId}
                />
              ))
            )}
          </div>
        </div>
        <div className={`homework ${styles.yetContainer}`}>
          <div className="hw-top">
            <h1 className="title17">{props.memberType === "PROFESSOR" ? "진행 중인 퀴즈" : "미응시 퀴즈"}</h1>
          </div>
          <div className={`hw-item no-scroll-bar ${styles.hwItem}`}>
            {quizzes.length === 0 ? (
              <NoItem title={props.memberType === "PROFESSOR" ? "진행 중인 퀴즈가" : "기한 내 미응시 퀴즈가"} />
            ) : (
              quizzes.map((quiz) => (
                <MainAssignItem
                  lectureName={quiz.lectureName}
                  url={"quiz"}
                  key={quiz.quizId}
                  title={quiz.quizName}
                  contents={quiz.description}
                  dueDate={quiz.deadline}
                  weekNumber={quiz.week}
                  status={quiz.submissionStatus}
                  enrollmentId={quiz.enrollmentId}
                  timeLimit={quiz.timeLimit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightNav;