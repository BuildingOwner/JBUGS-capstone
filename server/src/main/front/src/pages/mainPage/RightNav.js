import { useState, useEffect } from "react";
import MainAssignItem from "./MainAssignItem"
import axios from "axios";
import "./RightNav.css";
import { useNavigate } from "react-router-dom"
import { Scheduler } from "@aldabil/react-scheduler";
import Schedule from "./Schedule"
import styles from "./RightNav.module.css"


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

  return (
    <div className="rightnav">
      <div className="righttop">
        <div className="info9">
          <div className="parent9">
            <b className="b176">{props.memberName}</b>
            <div className="div161">{props.firstTrack}</div>
          </div>
          <img
            className="personicon4"
            loading="lazy"
            alt=""
            src="/personicon1.svg"
          />
          <button type="button" className={`btn btn-primary ${styles.logoutBtn}`} onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      </div>
      <div className="homework">
        <div className="hw-top">
          <h1 className="title17">미제출 과제</h1>
        </div>
        <div className="hw-item no-scroll-bar">
          {mainLectures &&
            mainLectures.map((lecture) => (
              lecture.assignments
                .filter((assignment) => assignment.status === 'NOT_SUBMITTED')
                .map((assignment) => (
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
            ))}
        </div>
        
      </div>
    </div>
  );
};

export default RightNav;
