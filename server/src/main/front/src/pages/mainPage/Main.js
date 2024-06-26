import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import Sidebar from "../../sidebar/MainSidebars";
import CourseItem from "./CourseItem";
import RightNav from "./RightNav";
import "./Main.css";
import styles from "./Main.module.css"
import LoadingPage from "./LoadingPage"

const Main = () => {
  const navigate = useNavigate()
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [mainLectures, setMainLectures] = useState()
  const [memberName, setMemberName] = useState("")
  const [firstTrack, setFirstTrack] = useState()
  const [currentDate, setCurrentDate] = useState('')
  const [currentWeek, setCurrentWeek] = useState()
  const [quizDtoList, setQuizDtoList] = useState([])
  const calculateWeek = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000 // 하루의 밀리초 수

    // startDate와 endDate 사이의 경과 일수 계산
    const diffDays = Math.round((endDate - startDate) / oneDay)

    // 개강일로부터 경과한 일수를 7로 나누어서 주차를 계산
    const week = Math.ceil(diffDays / 7)

    return week;
  }

  const fetchMainInfo = async () => {
    try {
      const response = await axios.get("/api/main", {
        withCredentials: true // 세션 쿠키를 사용하기 위해 필요
      });
      const memberInfoDto2 = response.data.memberInfoDto; // 여기에 데이터 저장
      const mainLectures2 = response.data.mainLectures; // 여기에 데이터 저장
      console.log("get 응답:", response)

      setMemberInfoDto(memberInfoDto2)
      setMainLectures(response.data.mainLectures)
      setMemberName(memberInfoDto2.memberName)
      setFirstTrack(memberInfoDto2.firstTrack)

      // 현재 날짜 정보 설정
      const currentDate = new Date();
      const startDate = new Date('2024-03-04') // 개강일 적는 곳
      const year = currentDate.getFullYear()
      const month = currentDate.getMonth() + 1
      const date = currentDate.getDate()

      setCurrentDate(`${year}년 ${month}월 ${date}일`)
      setCurrentWeek(calculateWeek(startDate, currentDate))
    }
    catch (error) {
      if (error.response?.status === 401) {
        navigate("/login")
      } else {
        // 다른 종류의 오류 발생
        console.error(error)
      }
    }
  }

  useEffect(() => {
    fetchMainInfo()
  }, [])

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <Sidebar memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className="course">
            <div className="courseheader">
              <div className="header-left">
                <h1 className="title2">수강중인 강좌</h1>
                <div className="today">{currentDate} {currentWeek}주차</div>
              </div>
              <div className="header-right">
                <div className="lets-iconssetting-fill">
                </div>
              </div>
            </div>
            <div className="scrollframe no-scroll-bar">
              {mainLectures ? mainLectures.map((lecture, index) => (
                <CourseItem
                  key={index}
                  enrollmentId={lecture.enrollmentId}
                  lectureName={lecture.lectureName}
                  professorName={lecture.professorName}
                  division={lecture.division}
                  lectureTime={lecture.lectureTime}
                  classification={lecture.classification}
                />
              )) : <NoItem title={"수강중인 강좌가"} />}
            </div>
          </div>
          <RightNav
            memberName={memberName}
            firstTrack={firstTrack}
            mainLectures={mainLectures}
            memberType={memberInfoDto.memberType}
          />
        </section>
      </main>
    </div>
  );
};

export default Main;
