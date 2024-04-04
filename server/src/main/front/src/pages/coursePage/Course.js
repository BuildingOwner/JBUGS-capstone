import Sidebar from "../../sidebar/Sidebar";
import FileItem from "./FileItem";
import QuizItem1 from "./QuizItem1";
import QuizItem from "./QuizItem";
import VideoItem from "./VideoItem";
import AssignmentItem from "./AssignmentItem";
import WeekItem from "./WeekItem";
import "./Course.css";

const Course = () => {
  return (
    <div className="course1">
      <Sidebar />
      <main className="serializer">
        <section className="content">
          <div className="nav">
            <nav className="weeklist">
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
              <WeekItem/>
            </nav>
          </div>
          <div className="assembler">
            <div className="disassembler">
              <div className="video">
                <div className="decrypter">
                  <h2 className="h23">온라인 강의</h2>
                </div>
                <div className="vcontent">
                <VideoItem />
                <VideoItem />
                <VideoItem />
                </div>
              </div>
              <div className="assignments">
                <div className="header1">
                  <h2 className="h24">과제</h2>
                </div>
                <div className="list">
                  <AssignmentItem/>
                  <AssignmentItem/>
                  <AssignmentItem/>
                  <AssignmentItem/>
                </div>
              </div>
            </div>
            <div className="bottom">
              <div className="files">
                <div className="header2">
                  <h2 className="h25">자료</h2>
                </div>
                <div className="scroll2">
                  <FileItem fileType="PPT" />
                  <FileItem
                    fileType="DOCS"
                    propPadding="var(--padding-7xs-5) var(--padding-sm-5)"
                    propBackgroundColor="#39a7ff"
                    propWidth="2.438rem"
                    propMinWidth="2.438rem"
                  />
                  <FileItem
                    fileType="EXCEL"
                    propPadding="var(--padding-7xs-5) var(--padding-xs)"
                    propBackgroundColor="#72bd92"
                    propWidth="2.625rem"
                    propMinWidth="2.625rem"
                  />
                  <FileItem
                    fileType="PDF"
                    propPadding="var(--padding-7xs-5) 1.219rem"
                    propBackgroundColor="#f49e9e"
                    propWidth="1.688rem"
                    propMinWidth="1.688rem"
                  />
                </div>
              </div>
              <div className="quiz">
                <div className="header3">
                  <h2 className="h26">퀴즈</h2>
                </div>
                <div className="qcontent">
                  <QuizItem1 />
                  <QuizItem1 />
                  <QuizItem1 />
                  <QuizItem />
                  <QuizItem />
                  <QuizItem1 />
                  <QuizItem />
                  <QuizItem />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Course;
