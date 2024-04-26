import Sidebar from "../../sidebar/Sidebar";
import FileItem from "./FileItem";
import QuizItem from "./QuizItem";
import VideoItem from "./VideoItem";
import AssignmentItem from "./AssignmentItem";
import WeekItem from "./WeekItem";
import ListItem from "./ListItem";
import "./Course.css";

const Course = () => {
  return (
    <div className="course1">
      <Sidebar />
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
