import CourseSidebar from "../../sidebar/CourseSidebars";
import ListItem from "./ListItem";
import styles from "./Course.module.css"
import FileUploadModal from "../../modals/profModal/uploadModal/FileUploadModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NoItem from "../mainPage/NoItem";

const Course = () => {
  const navigate = useNavigate()
  const location = useLocation()
  let enrollmentId

  if (location.state.from === '/main') {
    console.log("main에서 옴")
    enrollmentId = location.state.enrollmentId
  } else {
    enrollmentId = location.state?.enrollmentId
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  const currentDate = new Date();
  const startDate = new Date('2024-03-01'); // 개강일 적는 곳
  const calculateWeek = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수

    // startDate와 endDate 사이의 경과 일수 계산
    const diffDays = Math.round((endDate - startDate) / oneDay);

    // 개강일로부터 경과한 일수를 7로 나누어서 주차를 계산
    const week = Math.ceil(diffDays / 7);

    return week;
  }
  const cureentWeek = calculateWeek(startDate, currentDate)



  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [assignments, setAssignments] = useState([])
  const [quizs, setQuizs] = useState([])
  const [lectureVideos, setLectureVideos] = useState([])
  const [classFiles, setClassFiles] = useState([])
  const [courseDto, setCourseDto] = useState()
  const [weeklyContents, setWeeklyContents] = useState([])
  const [selectedWeek, setSelectedWeek] = useState(cureentWeek)

  const assignmentUrl = "assignmentlist"
  const quizUrl = "quizlist"
  const videoUrl = "video"
  const fileUrl = "file"

  const changeWeek = (week) => {
    setSelectedWeek(week)
  }

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}`, {
        withCredentials: true // 세션 쿠키를 사용하기 위해 필요
      });
      console.log("course의 response", response)
      setWeeklyContents(response.data.weeklyContents)
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
    }
    catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }
    }
  };

  // 첫 렌더링 시에만 정보를 받아옴
  useEffect(() => {
    fetchCourse()
  }, [])

  useEffect(() => {
    const selectedWeekData = weeklyContents.find(week => week.week === selectedWeek);
    if (selectedWeekData) {
      setLectureVideos(selectedWeekData.lectureVideos)
      setAssignments(selectedWeekData.assignments)
      setQuizs(selectedWeekData.quizzes)
      setClassFiles(selectedWeekData.classFiles)
    }
  }, [selectedWeek, weeklyContents]);

  return (
    <div className={`background`}>
      <FileUploadModal isOpen={modalIsOpen} onRequestClose={closeModal} enrollmentId={enrollmentId} />
      <CourseSidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.nav}>
            <div className={styles.courseTitle}>
              <h3 style={{ fontWeight: "bold", fontSize: "2.2rem" }}>{lectureName}</h3>
              <h3 style={{ fontWeight: "bold", fontSize: "2.2rem" }}>{division}</h3>
            </div>
            <div className={styles.topRight}>
              <nav className={styles.weekList}>
                {Array.from({ length: 16 }).map((_, index) => (
                  <button type="button"
                    key={index}
                    className={`btn btn-primary ${styles.weekBtn} ${weeklyContents[index]?.lectureVideos.length > 0 ||
                      weeklyContents[index]?.classFiles.length > 0 ||
                      weeklyContents[index]?.quizzes.length > 0 ||
                      weeklyContents[index]?.assignments.length > 0
                      ? styles.blue : null
                      } ${selectedWeek - 1 == index ? styles.cureentWeek : null}`}
                    style={{ fontWeight: "bold", fontSize: "1.25rem" }}
                    onClick={() => (changeWeek(index + 1))}
                  >{index + 1}</button>
                ))}
              </nav>
              <button type="button" className={`btn btn-primary 
              ${memberInfoDto?.memberType == "STUDENT" ? styles.hidden : null}
              ${styles.addBtn}`} onClick={openModal}>
                <h3 style={{ fontSize: "1rem" }}>강의 자료 추가하기</h3>
              </button>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h3 style={{ fontWeight: "bold", fontSize: "1.6rem", paddingBottom: "1rem" }}>온라인 강의</h3>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {lectureVideos[0] ? lectureVideos.map((video, i) => (
                  <ListItem
                    key={`lectureVideo${i}`}
                    title={video.title}
                    videoName={video.videoName}
                    videoPath={video.videoPath}
                    url={videoUrl}
                  />
                )) : <NoItem title={"온라인 강의가"} />}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h3 style={{ fontWeight: "bold", fontSize: "1.6rem", paddingBottom: "1rem" }}>과제</h3>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {assignments[0] ? assignments.map((assignment, i) => (
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
                )) : <NoItem title={"과제가"} />}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h3 style={{ fontWeight: "bold", fontSize: "1.6rem", paddingBottom: "1rem" }}>자료</h3>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {classFiles[0] ? classFiles.map((file, i) => (
                  <ListItem
                    key={`file${i}`}
                    fileName={file.fileName}
                    filePath={file.filePath}
                    title={file.title}
                    url={fileUrl}
                  />
                )) : <NoItem title={"자료가"} />}
              </div>
            </div>
            <div className={styles.listContainer}>
              <div className={styles.name}>
                <h3 style={{ fontWeight: "bold", fontSize: "1.6rem", paddingBottom: "1rem" }}>퀴즈</h3>
              </div>
              <div className={`${styles.list} no-scroll-bar`}>
                {quizs[0] ? quizs.map((quiz, i) => (
                  <ListItem
                    key={`quiz${i}`}
                    quizName={quiz?.quizName}
                    quizType={quiz?.quizType}
                    quizId={quiz?.quizId}
                    jsonData={quiz?.jsonData}
                    description={quiz?.description}
                    deadline={quiz?.deadline}
                    weekId={quiz?.weekId}
                    quizScore={quiz?.quizScore}
                    submissionStatus={quiz?.submissionStatus}
                    enrollmentId={enrollmentId}
                    memberInfoDto={memberInfoDto}
                    courseDto={courseDto}
                    url={quizUrl}
                  />
                )) : <NoItem title={"퀴즈가"} />}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Course;
