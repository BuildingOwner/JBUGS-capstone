import CourseSidebar from "../../sidebar/CourseSidebars";
import FileItem from "./FileItem";
import QuizItem from "./QuizItem";
import VideoItem from "./VideoItem";
import AssignmentItem from "./AssignmentItem";
import WeekItem from "./WeekItem";
import ListItem from "./ListItem";
import styles from "./Course.module.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import QuizInfoModal from "../../modals/quizModal/QuizInfoModal";

const Course = () => {
  const location = useLocation()
  const enrollmentId = location.state

  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [assignments, setAssignments] = useState([])
  const [quizs, setQuizs] = useState([])
  const [lectureVideos, setLectureVideos] = useState([])
  const [classFiles, setClassFiles] = useState([])
  const [courseDto, setCourseDto] = useState()
  const [memberInfoDto, setMemberInfoDto] = useState()

  const assignmentUrl = "assignmentlist"
  const quizUrl = "quizlist"
  const videoUrl = "video"
  const fileUrl = "file"

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/course/${enrollmentId}`, {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });

        const lectureName1 = response.data.courseDto.lectureName
        const division1 = response.data.courseDto.division
        const assignmentData = response.data.weeklyContents.map((week) => week.assignments).flat()
        const quizData = response.data.weeklyContents.map((week) => week.quizzes).flat()
        const videoData = response.data.weeklyContents.map((week) => week.lectureVideos).flat()
        const fileData = response.data.weeklyContents.map((week) => week.classFiles).flat()
        const memberInfo = response.data.memberInfoDto

        setLectureName(lectureName1)
        setDivision(division1)
        setCourseDto(response.data.courseDto)
        setLectureVideos(videoData)
        setAssignments(assignmentData)
        setQuizs(quizData)
        setClassFiles(fileData)
        setMemberInfoDto(memberInfo)

        // console.log("Course response : ", response)
        // console.log("lectureName : ", lectureName1)
        // console.log("video Data: ", videoData)
        // console.log("quiz Data : ", quizData)
        // console.log("assignmentData : ", assignmentData)
        // console.log("file Data : ", fileData)
        // console.log("courseDto : ", courseDto)
      }
      catch (error) {
        console.error("Error fetching course info:", error);
      }
    };

    fetchCourse();
  }, []);

  return (
    <div className={`background`}>
      <CourseSidebar lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.nav}>
            <div className={styles.courseTitle}>
              <h3>{lectureName}</h3>
              <h3>{division}</h3>
            </div>
            <nav className={styles.weekList}>
              {Array.from({ length: 16 }).map((_, index) => (
                <button type="button" key={index} className={`btn btn-primary ${styles.weekBtn}`}>{index}</button>
              ))}
            </nav>
          </div>
          <div className={styles.container}>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h2>온라인 강의</h2>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {lectureVideos.map((video, i) => (
                  <ListItem
                    key={`lectureVideo${i}`}
                    title={video.title}
                    videoName={video.videoName}
                    videoPath={video.videoPath}
                    url={videoUrl}
                  />
                ))}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h2>과제</h2>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {assignments.map((assignment, i) => (
                  <ListItem
                    key={`assignment${i}`}
                    title={assignment.title}
                    contents={assignment.contents}
                    dueDate={assignment.dueDate}
                    weekId={assignment.weekId}
                    status={assignment.status}
                    enrollmentId={enrollmentId}
                    courseDto={courseDto}
                    url={assignmentUrl}
                  />
                ))}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h2>자료</h2>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {classFiles.map((file, i) => (
                  <ListItem
                    key={`file${i}`}
                    fileName={file.fileName}
                    filePath={file.filePath}
                    title={file.title}
                    url={fileUrl}
                  />
                ))}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h2>퀴즈</h2>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {quizs.map((quiz, i) => (
                  <ListItem
                    key={`quiz${i}`}
                    quizName={quiz.quizName}
                    quizType={quiz.quizType}
                    quizId={quiz.quizId}
                    jsonData={quiz.jsonData}
                    description={quiz.description}
                    deadline={quiz.deadline}
                    weekId={quiz.weekId}
                    quizScore={quiz.quizScore}
                    submissionStatus={quiz.submissionStatus}
                    enrollmentId={enrollmentId}
                    courseDto={courseDto}
                    url={quizUrl}
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
