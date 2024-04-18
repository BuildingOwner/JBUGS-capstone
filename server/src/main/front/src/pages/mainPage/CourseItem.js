import { useEffect, useState } from "react";
import "./CourseItem.css";

const CourseItem = (props) => {
  return (
    <div className="course-item3">
      <div className="course-left3">
        <div className="personicon3">
          <img className="vector-icon36" alt="" src="/vector-41.svg" />
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
        <div className="right-arrow3">
          <img className="group-icon5" loading="lazy" alt="" src="/group.svg" />
        </div>
      </div>
    </div>
  );
};

export default CourseItem;
