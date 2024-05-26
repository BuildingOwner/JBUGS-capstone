import CourseSidebar from "../../sidebar/CourseSidebars";
import ListItem from "./ListItem";
import styles from "./Course.module.css"
import FileUploadModal from "../../modals/profModal/uploadModal/FileUploadModal";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import NoItem from "../mainPage/NoItem";
import LoadingPage from "../mainPage/LoadingPage";

const Course = () => {
  const currentDate = new Date();
  const startDate = new Date('2024-03-04'); // 개강일 적는 곳
  const calculateWeek = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수

    // startDate와 endDate 사이의 경과 일수 계산
    const diffDays = Math.round((endDate - startDate) / oneDay);

    // 개강일로부터 경과한 일수를 7로 나누어서 주차를 계산
    const week = Math.ceil(diffDays / 7);

    return week;
  }
  const cureentWeek = calculateWeek(startDate, currentDate)

  // 선택된 주차에 따른 날짜 범위 계산
  const calculateDateRange = (week) => {
    // 시작 날짜 계산: 개강일로부터 (주차-1)주 후의 월요일
    const start = new Date(startDate);
    start.setDate(start.getDate() + (week - 1) * 7);

    // 끝 날짜 계산: 시작 날짜로부터 6일 후의 일요일
    const end = new Date(start);
    end.setDate(end.getDate() + 6);

    // 날짜 포맷: 예) "3월 4일"
    const format = (date) => `${date.getMonth() + 1}월 ${date.getDate()}일`;

    return `${format(start)} - ${format(end)}`;
  };

  const navigate = useNavigate()
  const location = useLocation()
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
  // reRender를 위한 상태
  const [reRenderFlag, setReRenderFlag] = useState(false)
  const [dateRange, setDateRange] = useState(calculateDateRange(selectedWeek));

  const assignmentUrl = "assignmentlist"
  const quizUrl = "quizlist"
  const videoUrl = "video"
  const fileUrl = "file"

  let enrollmentId

  if (location.state.from === '/main') {
    enrollmentId = location.state.enrollmentId
  } else {
    enrollmentId = location.state?.enrollmentId
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openModal() {
    setModalIsOpen(true)
  }

  function closeModal() {
    setModalIsOpen(false)
  }


  const changeWeek = (week) => {
    setSelectedWeek(week)
  }

  const reRender = () => {
    setReRenderFlag(prevFlag => !prevFlag)
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

      // 현재 날짜 정보 설정
      const currentDate = new Date();
      const startDate = new Date('2024-03-04') // 개강일 적는 곳
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const date = currentDate.getDate()

    }
    catch (error) {
      if (error.response.status === 401 || error.response.status === 400) {
        navigate("/login")
      } else {
        // 다른 종류의 오류 발생
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchCourse();
  }, [reRenderFlag])

  useEffect(() => {
    const selectedWeekData = weeklyContents.find(week => week.week === selectedWeek)
    console.log(selectedWeekData)
    if (selectedWeekData) {
      setLectureVideos(selectedWeekData.lectureVideos)
      setAssignments(selectedWeekData.assignments)
      setQuizs(selectedWeekData.quizzes)
      setClassFiles(selectedWeekData.classFiles)
      setDateRange(calculateDateRange(selectedWeek))
    }
  }, [selectedWeek, weeklyContents])

  // useEffect(() => {
  //   setDateRange(calculateDateRange(selectedWeek));
  // }, [selectedWeek]);

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <FileUploadModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        enrollmentId={enrollmentId}
        selectedWeek={selectedWeek}
        reRender={reRender} />
      <CourseSidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.nav}>
            <div className={styles.titles}>
              <div className={styles.courseTitle}>
                <h3 style={{ fontWeight: "bold", fontSize: "2.2rem" }}>{lectureName}</h3>
                <h3 style={{ fontWeight: "bold", fontSize: "2.2rem" }}>{division}</h3>
              </div>
              <div className={`${styles.date} ${cureentWeek === selectedWeek ? styles.thisWeek : null}`}>
                {/* 선택된 주차 */}
                <h4 className={styles.todayWeek}>{selectedWeek}주차</h4>
                {/* 선택된 주차의 날짜 ex) 5/1 ~ 5/8 */}
                <h4 className={styles.todayDate}>{`[${dateRange}]`}</h4>
              </div>
            </div>
            <div className={styles.topRight}>
              <nav className={styles.weekList}>
                {Array.from({ length: 16 }).map((_, index) => (
                  <button type="button"
                    key={index}
                    className={`btn btn-primary ${styles.weekBtn} ${
                      weeklyContents[index]?.lectureVideos.length > 0 
                      // weeklyContents[index]?.classFiles.length > 0 ||
                      // weeklyContents[index]?.quizzes.length > 0 ||
                      // weeklyContents[index]?.assignments.length > 0
                      ? styles.blue : null
                      } ${selectedWeek - 1 == index ? styles.cureentWeek : null} ${cureentWeek === index + 1 ? styles.today : null}`}
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
                    fileSize={video.fileSize}
                    videoId={video.videoId}
                    reRender={reRender}
                    memberInfoDto={memberInfoDto}
                    enrollmentId={enrollmentId}
                    percent={video.percent}
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
                    memberInfoDto={memberInfoDto}
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
                    fileId={file.fileId}
                    fileName={file.fileName}
                    filePath={file.filePath}
                    title={file.title}
                    url={fileUrl}
                    fileSize={file.fileSize}
                    reRender={reRender}
                    memberInfoDto={memberInfoDto}
                    enrollmentId={enrollmentId}
                    selectedWeek={selectedWeek}
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
                    timeLimit={quiz?.timeLimit}
                    deadline={quiz?.deadline}
                    weekId={quiz?.weekId}
                    quizScore={quiz?.quizScore}
                    submissionStatus={quiz?.submissionStatus}
                    enrollmentId={enrollmentId}
                    memberInfoDto={memberInfoDto}
                    courseDto={courseDto}
                    url={quizUrl}
                    reRender={reRender}
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
