import CourseSidebar from "../../sidebar/CourseSidebars";
import NoticeRow from "./NoticeRow";
import styles from "./NoticeList.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { GoSearch } from "react-icons/go";
import NoItem from "../mainPage/NoItem";
import LoadingPage from "../mainPage/LoadingPage";
import MakeNoticeModal from "../../modals/noticeModal/MakeNoticeModal";

const NoticeList = () => {
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [noticeDtoList, setNoticeDtoList] = useState([])
  const [courseDto, setCourseDto] = useState()
  const [noticeFilter, setNoticeFilter] = useState("ALL")
  const [searchFilter, setSearchFilter] = useState("title")
  const [keyword, setKeyword] = useState("")
  const [editFlag, setEditFlag] = useState(false)

  // reRender를 위한 상태
  const [reRenderFlag, setReRenderFlag] = useState(false)
  // 모달창 노출 여부 state
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = (event) => {
    if (event) {
      event.stopPropagation()
    }
    setModalIsOpen(false)
  }

  const reRender = () => {
    setReRenderFlag(prevFlag => !prevFlag)
  }

  const changeKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const changeSearchFilter = (e) => {
    setSearchFilter(e.target.value)
  }

  const changeNoticeFilter = (e) => {
    setNoticeFilter(e)
    console.log(e)
  }

  // 날짜를 기준으로 오름차순으로 정렬하는 함수
  let sortedNoticeDtoList = noticeDtoList?.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
  console.log("sortedNoticeDtoList : ", sortedNoticeDtoList)

  if (sortedNoticeDtoList) {
    sortedNoticeDtoList = sortedNoticeDtoList.map((item, index) => ({
      ...item, // 기존 객체의 모든 키-값 쌍을 복사
      number: index // "number" 키에 순서를 값으로 추가
    }));
  }

  console.log(" number sortedNoticeDtoList : ", sortedNoticeDtoList)

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
      console.log("Notice Fetch 실패.. ", error)
    }
  }

  useEffect(() => {
    fetchNoticeList()
  }, [reRenderFlag])

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <MakeNoticeModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        memberInfoDto={memberInfoDto}
        enrollmentId={enrollmentId}
        reRender={reRender}
      />
      <CourseSidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.header}>
            <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
              <h3 className={styles.title}>공지사항</h3>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{lectureName} {division}</h3>
            </div>
            <div className={styles.right}>
              <div className={styles.searchContainer}>
                <select
                  className={`form-select form-select-sm ${styles.select}`}
                  defaultValue={'title'}
                  onChange={changeSearchFilter}>
                  <option value={`title`}>제목</option>
                  <option value={`writer`}>글쓴이</option>
                </select>
                <div className={styles.searchBox}>
                  <input className={`form-control ${styles.search}`}
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    onChange={changeKeyword}
                  />
                  <div className={styles.questionIcon}>
                    <GoSearch size={20} />
                  </div>
                </div>
              </div>
              {
                memberInfoDto?.memberType === "PROFESSOR" ?
                  <button type="button"
                    className={`btn btn-primary ${styles.addBtn}`}
                    onClick={openModal}>
                    <h3 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>공지작성</h3>
                  </button>
                  : null
              }
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.tabBtns}>
              <div className={styles.btnDiv}>
                <button style={{ borderTopLeftRadius: "5px" }}
                  className={`${styles.tabItem} ${noticeFilter === 'ALL' ? styles.currentFilter : ''}`}
                  onClick={() => changeNoticeFilter('ALL')}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>전체 공지</h3>
                </button>
                <button className={`${styles.tabItem} ${noticeFilter === 'EXAM' ? styles.currentFilter : ''}`}
                  onClick={() => changeNoticeFilter("EXAM")}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>시험</h3>
                </button>
                <button className={`${styles.tabItem} ${noticeFilter === 'ONLINE' ? styles.currentFilter : ''}`}
                  onClick={() => changeNoticeFilter('ONLINE')}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>온라인</h3>
                </button>
                <button style={{ borderTopRightRadius: "5px" }}
                  className={`${styles.tabItem} ${noticeFilter === 'FACE_TO_FACE_CLASSES' ? styles.currentFilter : ''}`}
                  onClick={() => changeNoticeFilter('FACE_TO_FACE_CLASSES')}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>대면수업</h3>
                </button>
              </div>
              {/* 공지 수정 버튼 */}
              {
                memberInfoDto?.memberType === "PROFESSOR" ? <button type="button"
                  className={`btn btn-primary ${styles.addBtn} ${styles.editBtn}`}
                  onClick={() => setEditFlag(!editFlag)}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>공지수정</h3>
                </button> : null
              }
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
            <div className={`${styles.list} no-scroll-bar`}>
              {
                sortedNoticeDtoList?.length !== 0
                  ? sortedNoticeDtoList.reverse()
                    .filter((notice) =>
                      (noticeFilter === "ALL" || notice.noticeStatus === noticeFilter) &&
                      (searchFilter === "title"
                        ? notice.title.toLowerCase().includes(keyword.toLowerCase())
                        : notice.writer.toLowerCase().includes(keyword.toLowerCase()))
                    )
                    .map((notice, i) => (
                      <NoticeRow
                        noticeNumber={notice.number}
                        content={notice.content}
                        createdAt={notice.createdAt}
                        noticeId={notice.noticeId}
                        noticeStatus={notice.noticeStatus}
                        title={notice.title}
                        views={notice.views}
                        writer={notice.writer}
                        key={`notice${i}`}
                        reRender={reRender}
                        editFlag={editFlag}
                        memberType={memberInfoDto?.memberType}
                      />
                    ))
                  : <NoItem title={"공지가"} />
              }
            </div>
          </div>
        </section>
      </main>
    </div >
  );
};

export default NoticeList;
