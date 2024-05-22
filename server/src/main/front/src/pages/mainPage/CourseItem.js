import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CourseItem.css";
import { FaUser } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";

const CourseItem = (props) => {
  const navigate = useNavigate()
  const moveToCourse = () => {
    // state를 넘겨줄 때 네브바에서 넘어올때와 충돌이 나기 때문에 from으로 state를 보내준 url을 확인
    console.log("enrollmentId : ", props.enrollmentId)
    navigate('/course', { state: { from: '/main', enrollmentId: props.enrollmentId } })

  }

  return (
    <div className="course-item3" onClick={moveToCourse}>
      <div className="course-left3">
        <div className="personicon3">
          <FaUser size={60} />
        </div>
        <div className="info8">
          <h2 className="h27">{props.lectureName}</h2>
          <div className="shape-setter">
            <div className="parent8">
              <div className="div158">{props.professorName}</div>
              <div className="div159">{props.classification}</div>
            </div>
            <div className="div160">{props.lectureTime}</div>
          </div>
        </div>
      </div>
      <div className="couese-right3">
        <div className="division4">
          <h2 className="a3">{props.division}</h2>
        </div>
        <IoArrowForwardOutline size={25} />
      </div>
    </div>
  );
};

export default CourseItem;
