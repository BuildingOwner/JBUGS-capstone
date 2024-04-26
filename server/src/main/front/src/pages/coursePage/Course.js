import Sidebar from "../../sidebar/Sidebar";
import FileItem from "./FileItem";
import QuizItem from "./QuizItem";
import VideoItem from "./VideoItem";
import AssignmentItem from "./AssignmentItem";
import WeekItem from "./WeekItem";
import ListItem from "./ListItem";
import "./Course.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";


const Course = () => {
  const location = useLocation()
  const enrollmentId = location.state

  const [lectureName, setLectureName] = useState();
  const [division, setDivision] = useState();
  const [assignments, setAssignments] = useState([]);
  const assignmentlist = "assignmentlist"


  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/course/${enrollmentId}`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요

        });
        const lectureName1 = response.data.courseDto.lectureName
        const division1 = response.data.courseDto.division
        console.log(lectureName1)
        setLectureName(lectureName1)
        setDivision(division1)
        const assignmentData = response.data.weeklyContents.map((week) => week.assignments).flat();
        setAssignments(assignmentData);
        console.log(assignmentData)
      }
      catch (error) {
        console.error("Error fetching course info:", error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="course1">
      <Sidebar lectureName={lectureName} division={division}/>
      <main className="serializer">
        <section className="content">
          <div className="nav">
            <nav className="weeklist">
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
              <WeekItem />
            </nav>
          </div>
          <div className="container-cjw">
            <div className="list-container-cjw">
              <div className="name-cjw">
                <h2>온라인 강의</h2>
              </div>
              <div className="list-cjw no-scroll-bar">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </div>
            </div>
            <div className="list-container-cjw">
              <div className="name-cjw">
                <h2>과제</h2>
              </div>
              <div className="list-cjw no-scroll-bar">
              {assignments.map((assignment) => (
                  <ListItem
                    key={assignment.id}
                    title={assignment.title}
                    contents={assignment.contents}
                    dueDate={assignment.dueDate}
                    weekId={assignment.weekId}
                    status={assignment.status}
                    enrollmentId={enrollmentId}
                    url={assignmentlist}
                  />
                ))}
              </div>
            </div>
            <div className="list-container-cjw">
              <div className="name-cjw">
                <h2>자료</h2>
              </div>
              <div className="list-cjw no-scroll-bar">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </div>
            </div>
            <div className="list-container-cjw">
              <div className="name-cjw">
                <h2>퀴즈</h2>
              </div>
              <div className="list-cjw no-scroll-bar">
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
                <ListItem />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Course;
