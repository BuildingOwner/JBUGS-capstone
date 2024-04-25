import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import MainSidebar from "../../sidebar/MainSidebar";
import CourseItem from "./CourseItem";
import RightNav from "./RightNav";
import "./Main.css";

const Main = () => {
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [mainLectures, setMainLectures] = useState()
  const [memberName, setMemberName] = useState()
  const [firstTrack, setFirstTrack] = useState()
  const [currentDate, setCurrentDate] = useState('')
  const [currentWeek, setCurrentWeek] = useState()





  const calculateWeek = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // 하루의 밀리초 수

    // startDate와 endDate 사이의 경과 일수 계산
    const diffDays = Math.round((endDate - startDate) / oneDay);

    // 개강일로부터 경과한 일수를 7로 나누어서 주차를 계산
    const week = Math.ceil(diffDays / 7);

    return week;
  };

  useEffect(() => {
    const fetchMainInfo = async () => {
      try {
        const response = await axios.get("/api/main", {
          withCredentials: true // 세션 쿠키를 사용하기 위해 필요
        });
        const memberInfoDto2 = response.data.memberInfoDto; // 여기에 데이터 저장
        const mainLectures2 = response.data.mainLectures; // 여기에 데이터 저장
        console.log("get 응답:", response)
        setMemberInfoDto(response.data.memberInfoDto)
        setMainLectures(response.data.mainLectures)
        console.log("memberInfoDto:", memberInfoDto2)
        console.log("response memberInfoDto:", response.data.memberInfoDto)
        console.log("mainLectures", mainLectures2)
        console.log("response mainLectures", response.data.mainLectures)

        setMemberName(memberInfoDto2.memberName)
        setFirstTrack(memberInfoDto2.firstTrack)

        // 현재 날짜 정보 설정
        const currentDate = new Date();
        const startDate = new Date('2024-03-01'); // 개강일
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        const date = currentDate.getDate();
        setCurrentDate(`${year}년 ${month}월 ${date}일`);
        console.log("현재 날짜", currentDate)

        setCurrentWeek(calculateWeek(startDate, currentDate))
        console.log("현재 주차:", currentWeek)

      }
      catch (error) {
        console.error("Error fetching main info:", error);
      }
    };

    fetchMainInfo();
  }, []);

  return (
    <div className="mainpage">
      <MainSidebar />
      <main className="mainpage-inner">
        <section className="course-parent">
          <div className="course">
            <div className="courseheader">
              <div className="header-left">
                <h1 className="title2">수강중인 강좌</h1>
                <div className="today">{currentDate} {currentWeek}주차</div>
              </div>
              <div className="header-right">
                <div className="lets-iconssetting-fill">
                  <img className="vector-icon5" alt="" src="/vector-31.svg" />
                </div>
              </div>
            </div>
            <div className="courselist">
              <div className="scrollframe">
                {mainLectures && mainLectures.map((lecture, index) => (
                  <CourseItem
                    key={index}
                    lectureName={lecture.lectureName}
                    professorName={lecture.professorName}
                    division={lecture.division}
                    lectureTime={lecture.lectureTime}
                    classification={lecture.classification}
                  />
                ))}

              </div>
            </div>
          </div>
          <RightNav memberName={memberName} firstTrack={firstTrack} mainLectures={mainLectures} />
        </section>
      </main>
    </div>
  );
};

export default Main;
