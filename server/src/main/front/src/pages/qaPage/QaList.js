import CourseSidebar from "../../sidebar/CourseSidebars";
import QnaRow from "./QnaRow";
import styles from "./QaList.module.css"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import NoItem from "../mainPage/NoItem";
import LoadingPage from "../mainPage/LoadingPage";
import MakeQaModal from "../../modals/qaModal/MakeQaModal";

const QaList = () => {
  const location = useLocation()
  console.log("qa location : ", location)
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [memberName, setMemberName] = useState("")
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [qnADtoList, setQnADtoList] = useState()
  const [courseDto, setCourseDto] = useState()
  const [qaFilter, setQaFilter] = useState("ALL")
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

  const changeKeyword = (e) => {
    setKeyword(e.target.value)
  }

  const changeSearchFilter = (e) => {
    setSearchFilter(e.target.value)
  }

  const changeQaFilter = (e) => {
    if (e === "ME") {
      setQaFilter(memberInfoDto.memberName)
      console.log(memberInfoDto.memberName)
    } else {
      setQaFilter(e)
    }
  }

  // 날짜를 기준으로 오름차순으로 정렬하는 함수
  let sortedQnaDtoList = qnADtoList?.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt)
  })
  console.log("sortedQnaDtoList : ", sortedQnaDtoList)

  if (sortedQnaDtoList) {
    sortedQnaDtoList = sortedQnaDtoList.map((item, index) => ({
      ...item, // 기존 객체의 모든 키-값 쌍을 복사
      number: index // "number" 키에 순서를 값으로 추가
    }));
  }

  console.log(" number sortedQnaDtoList : ", sortedQnaDtoList)

  const reRender = () => {
    console.log("리렌더링")
    setReRenderFlag(prevFlag => !prevFlag)
  }

  const fetchQaList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/qna`, {
        withCredentials: true // 세션 쿠키를 사용하기 위해 필요
      })
      console.log("qa response : ", response)
      const qnADtoList = response.data.qnADtoList.map((qna) => qna).flat()
      console.log(qnADtoList)
      const lectureName1 = response.data.courseDto.lectureName
      const division1 = response.data.courseDto.division

      setLectureName(lectureName1)
      setDivision(division1)
      setMemberName(response.data.memberInfoDto.memberName)
      setCourseDto(response.data.courseDto)
      setMemberInfoDto(response.data.memberInfoDto)
      setQnADtoList(qnADtoList)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchQaList();
  }, [reRenderFlag])

  if (!memberInfoDto) return <LoadingPage />;

  return (
    <div className={`background`}>
      <MakeQaModal
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
              <h3 className={styles.title}>Q & A</h3>
              <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{lectureName} {division}</h3>
            </div>
            <div className={styles.right}>
              <div className={styles.searchContainer}>
                <select className={`form-select form-select-sm ${styles.select}`}
                  onChange={changeSearchFilter}>
                  <option value={`title`} selected>제목</option>
                  <option value={`writer`}>글쓴이</option>
                </select>
                <div className={styles.searchBox}>
                  <input className={`form-control ${styles.search}`}
                    type="text" placeholder="검색어를 입력하세요..."
                    onChange={changeKeyword} />
                  <div className={styles.questionIcon}>
                    <GoSearch size={20} />
                  </div>
                </div>
              </div>
              <button type="button"
                className={`btn btn-primary ${styles.addBtn}`}
                onClick={openModal}>
                <h3 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>질문하기</h3>
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tabBtns}>
              <div className={styles.btnDiv}>
              <button style={{ borderTopLeftRadius: "5px" }}
                className={`${styles.tabItem} ${qaFilter === 'ALL' ? styles.currentFilter : ''}`}
                onClick={() => changeQaFilter('ALL')}
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>전체 질문</h3>
              </button>
              <button style={{ borderTopRightRadius: "5px" }}
                className={`${styles.tabItem} ${qaFilter === `${memberInfoDto.memberName}` ? styles.currentFilter : ''}`}
                onClick={() => changeQaFilter('ME')} // 수정필
              >
                <h3 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>내 질문</h3>
              </button>
              </div>
              
              {/* 수정 버튼 */}
              {
                memberInfoDto?.memberType === "PROFESSOR" ? <button type="button"
                  className={`btn btn-primary ${styles.addBtn}`}
                  onClick={() => setEditFlag(!editFlag)}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: "bold" }}>Q&A 수정</h3>
                </button> : null
              }
            </div>
            <div className={styles.colName}>
              <h3 className={styles.colNum} style={{ fontSize: "1.25rem" }}>번호</h3>
              <h3 className={styles.colAnswered} style={{ fontSize: "1.25rem" }}>답변</h3>
              <h3 className={styles.colSecret} style={{ fontSize: "1.25rem" }}>비밀글</h3>
              <h3 className={styles.colTitle} style={{ fontSize: "1.25rem" }}>제목</h3>
              <h3 className={styles.colWriter} style={{ fontSize: "1.25rem" }}>작성자</h3>
              <h3 className={styles.colDate} style={{ fontSize: "1.25rem" }}>작성일</h3>
              <h3 className={styles.colView} style={{ fontSize: "1.25rem" }}>조회수</h3>
            </div>
            <div className={`${styles.list} no-scroll-bar`}>
              {sortedQnaDtoList?.length !== 0 ?
                sortedQnaDtoList.reverse().filter((qna) => (qaFilter === "ALL" || qna.writer === qaFilter)
                  && (searchFilter === "title" ?
                    // 필터가 title일 경우 keyword가 포함되어있는지 확인
                    qna.title.toLowerCase().includes(keyword.toLowerCase())
                    // 필터가 writer일 경우 keyword가 포함되어있는지 확인
                    : qna.writer.toLowerCase().includes(keyword.toLowerCase())
                  )).map((qna, i) => (
                    <QnaRow
                      key={`qna${i}`}
                      number={qna.number}
                      createdAt={qna.createdAt}
                      qnAStatus={qna.qnAStatus}
                      title={qna.title}
                      qnaId={qna.qnaId}
                      views={qna.views}
                      writer={qna.writer}
                      content={qna.content}
                      secret={qna.secret}
                      courseDto={courseDto}
                      memberInfoDto={memberInfoDto}
                      materials={qna.materials}
                      comment={qna.comment}
                      reRender={reRender}
                      editFlag={editFlag}
                    />
                  )) : <NoItem title={"등록된 질문이"} />}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QaList;
