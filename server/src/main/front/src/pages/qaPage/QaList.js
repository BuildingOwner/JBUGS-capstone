import CourseSidebar from "../../sidebar/CourseSidebars";
import QaHeader from "./QaHeader";
import QnaRow1 from "./QnaRow1";
import QnaRow from "./QnaRow";
import styles from "./QaList.module.css"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";

const QaList = () => {
  const location = useLocation()
  console.log("qa location : ", location)
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [qnADtoList, setQnADtoList] = useState()
  const [courseDto, setCourseDto] = useState()

  const fetchQaList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/qna`)
      console.log("qa response : ", response)
      const qnADtoList = response.data.qnADtoList.map((qna) => qna).flat()
      console.log(qnADtoList)
      setQnADtoList(qnADtoList)
      // setCourseDto(response.courseDto)
      // setMemberInfoDto(response.memberInfoDto)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchQaList()
  }, [])

  return (
    <div className={`background`}>
      <CourseSidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto} />
      <main className={`mycontainer`}>
        <section className={`bg ${styles.bg}`}>
          <div className={styles.header}>
            <h3 className={styles.title}>Q & A</h3>
            <div className={styles.right}>
              <div className={styles.searchContainer}>
                <select className={`form-select form-select-sm ${styles.select}`}>
                  <option value={`title`} selected>제목</option>
                  <option value={`writer`}>글쓴이</option>
                </select>
                <div className={styles.searchBox}>
                  <input class={`form-control ${styles.search}`} type="text" placeholder="검색어를 입력하세요..." />
                  <div className={styles.questionIcon}>
                    <GoSearch size={20} />
                  </div>
                </div>
              </div>
              <button type="button" className={`btn btn-primary ${styles.addBtn}`}>
                <h3 style={{ fontSize: "1.05rem", fontWeight:"bold" }}>질문하기</h3>
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tabBtns}>
              <button style={{borderTopLeftRadius:"5px"}} className={`${styles.tabItem} ${styles.currentFilter}`}>
                <h3 style={{fontSize:"1.25rem", fontWeight: "bold"}}>전체 질문</h3>
              </button>
              <button style={{borderTopRightRadius:"5px"}} className={`${styles.tabItem}`}>
                <h3 style={{fontSize:"1.25rem", fontWeight: "bold"}}>내 질문</h3>
              </button>
            </div>
            <div className={styles.colName}>
              <h3 className={styles.colNum} style={{ fontSize: "1.5rem" }}>번호</h3>
              <h3 className={styles.colAnswered} style={{ fontSize: "1.5rem" }}>답변</h3>
              <h3 className={styles.colSecret} style={{ fontSize: "1.5rem" }}>비밀글</h3>
              <h3 className={styles.colTitle} style={{ fontSize: "1.5rem" }}>제목</h3>
              <h3 className={styles.colWriter} style={{ fontSize: "1.5rem" }}>작성자</h3>
              <h3 className={styles.colDate} style={{ fontSize: "1.5rem" }}>작성일</h3>
              <h3 className={styles.colView} style={{ fontSize: "1.5rem" }}>조회수</h3>
            </div>
            <div className={styles.list}>
              {qnADtoList?.map((qna, i) => (
                <QnaRow
                  key={`qna${i}`}
                  createdAt={qna.createdAt}
                  qnAStatus={qna.qnAStatus}
                  title={qna.title}
                  qnaId={qna.qnaId}
                  views={qna.views}
                  writer={qna.writer}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default QaList;
