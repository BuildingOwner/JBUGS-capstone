import CourseSidebar from "../../sidebar/CourseSidebars";
import QaHeader from "./QaHeader";
import QnaRow1 from "./QnaRow1";
import QnaRow from "./QnaRow";
import styles from "./QaList.module.css"
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

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
                <input class="form-control" type="text" placeholder="검색어를 입력하세요..." />
                <div className={styles.questionIcon}>
                  <IoIosSearch />
                </div>
              </div>
              <button type="button" className={`btn btn-primary ${styles.addBtn}`}>
                <h3 style={{ fontSize: "1rem" }}>질문하기</h3>
              </button>
            </div>
          </div>

          <div className={styles.content}>
            <div className={styles.tabBtns}>
              <button className={`btn btn-primary ${styles.tabItem}`}>
                <h3>전체 질문</h3>
              </button>
              <button className={`btn btn-primary ${styles.tabItem}`}>
                <h3>내 질문</h3>
              </button>
            </div>
            <div className={styles.colName}>
              <h3 style={{fontSize: "1rem"}}>번호</h3>
              <h3 style={{fontSize: "1rem"}}>답변</h3>
              <h3 style={{fontSize: "1rem"}}>비밀글</h3>
              <h3 style={{fontSize: "1rem"}}>제목</h3>
              <h3 style={{fontSize: "1rem"}}>작성자</h3>
              <h3 style={{fontSize: "1rem"}}>작성일</h3>
              {/* <h3 style={{fontSize: "1rem"}}>조회수</h3> */}
            </div>
            <div className="table">
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
