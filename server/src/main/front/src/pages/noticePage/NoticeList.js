import CourseSidebar from "../../sidebar/CourseSidebars";
import NoticeRow from "./NoticeRow";
import styles from "./NoticeList.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import NoItem from "../mainPage/NoItem";
import LoadingPage from "../mainPage/LoadingPage";

const NoticeList = () => {
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [noticeDtoList, setNoticeDtoList] = useState([])
  const [courseDto, setCourseDto] = useState()
  const [noticeFilter, setNoticeFilter] = useState("ALL")

  const changeNoticeFilter = (e) => {
    setNoticeFilter(e)
    console.log(e)
  }

  // 날짜를 기준으로 오름차순으로 정렬하는 함수
  const sortedNoticeDtoList = noticeDtoList?.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })

  const fetchNoticeList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/notice`)
      console.log("notice response : ", response)
      const noticeData = response.data.noticeDtoList.map((notice) => notice).flat()
      console.log(noticeData)
      const lectureName1 = response.data.courseDto.lectureName
      const division1 = response.data.courseDto.division

      setLectureName(lectureName1)
      setDivision(division1)
      setMemberInfoDto(response.data.memberInfoDto)
      setNoticeDtoList(noticeData)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchNoticeList()
  }, [])

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <CourseSidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.header}>
            <h3 className={styles.title}>공지사항</h3>
            <div className={styles.right}>
              <div className={styles.searchContainer}>
                <select
                  className={`form-select form-select-sm ${styles.select}`}
                  defaultValue={'title'}>
                  <option value={`title`}>제목</option>
                  <option value={`writer`}>글쓴이</option>
                </select>
                <div className={styles.searchBox}>
                  <input className={`form-control ${styles.search}`} type="text" placeholder="검색어를 입력하세요..." />
                  <div className={styles.questionIcon}>
                    <GoSearch size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tabBtns}>
              <button style={{ borderTopLeftRadius: "5px" }}
                className={`${styles.tabItem} ${styles.currentFilter}`}
                onClick={() => changeNoticeFilter('ALL')}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>전체 공지</h3>
              </button>
              <button className={`${styles.tabItem}`}
                onClick={() => changeNoticeFilter('EXAM')}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>시험</h3>
              </button>
              <button className={`${styles.tabItem}`}
                onClick={() => changeNoticeFilter('ONLINE')}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>온라인</h3>
              </button>
              <button style={{ borderTopRightRadius: "5px" }}
                className={`${styles.tabItem}`}
                onClick={() => changeNoticeFilter('FACE_TO_FACE_CLASSES')}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>대면수업</h3>
              </button>
            </div>
            <div className={styles.colName}>
              <h3 className={styles.colNum} style={{ fontSize: "1.25rem" }}>번호</h3>
              <h3 className={styles.colAnswered} style={{ fontSize: "1.25rem" }}>구분</h3>
              <h3 className={styles.colSecret} style={{ fontSize: "1.25rem" }}> </h3>
              <h3 className={styles.colTitle} style={{ fontSize: "1.25rem" }}>제목</h3>
              <h3 className={styles.colWriter} style={{ fontSize: "1.25rem" }}>작성자</h3>
              <h3 className={styles.colDate} style={{ fontSize: "1.25rem" }}>작성일</h3>
              <h3 className={styles.colView} style={{ fontSize: "1.25rem" }}>조회수</h3>
            </div>
            <div className={styles.list}>
              {sortedNoticeDtoList?.length !== 0 ?
                sortedNoticeDtoList.filter((notice) => noticeFilter === "ALL" ||
                  notice.noticeStatus === noticeFilter).map((notice, i) => (
                    <NoticeRow
                      noticeNumber={i + 1}
                      content={notice.content}
                      createdAt={notice.createdAt}
                      noticeId={notice.noticeId}
                      noticeStatus={notice.noticeStatus}
                      title={notice.title}
                      views={notice.views}
                      writer={notice.writer}
                      key={`notice${i}`}
                    />
                  )) : <NoItem title={"공지가 없습니다"} />}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NoticeList;
