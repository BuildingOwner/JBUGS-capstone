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
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";

const Course = () => {
  const location = useLocation()
  const enrollmentId = location.state

  const [lectureName, setLectureName] = useState();
  const [division, setDivision] = useState();
  const [assignments, setAssignments] = useState([]);
  const [quizs, setQuizs] = useState([]);
  const assignmentlist = "assignmentlist"
  const quizlist = "quizlist"

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/course/${enrollmentId}`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });
        console.log("response : ", response)
        const lectureName1 = response.data.courseDto.lectureName
        const division1 = response.data.courseDto.division
        console.log("lectureName : ", lectureName1)
        setLectureName(lectureName1)
        setDivision(division1)
        const assignmentData = response.data.weeklyContents.map((week) => week.assignments).flat()
        const quizData = response.data.weeklyContents.map((week) => week.quizzes).flat()
        console.log("quiz Data : ", quizData)
        setAssignments(assignmentData)
        setQuizs(quizData)
        console.log("assignmentData : ", assignmentData)
      }
      catch (error) {
        console.error("Error fetching course info:", error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className="course1">
      <Sidebar lectureName={lectureName} division={division} />
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

              </div>
            </div>
            <div className="list-container-cjw">
              <div className="name-cjw">
                <h2>퀴즈</h2>
              </div>
              <div className="list-cjw no-scroll-bar">
                {quizs.map((quiz, i) => (
                  <ListItem
                    key={`quiz${i}`}
                    quizName={quiz.quizName}
                    quizType={quiz.quizType}
                    deadline={quiz.deadline}
                    weekId={quiz.weekId}
                    submissionStatus={quiz.submissionStatus}
                    enrollmentId={enrollmentId}
                    url={quizlist}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Course;
