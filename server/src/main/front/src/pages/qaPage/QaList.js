import Sidebar from "../../sidebar/Sidebar";
import QaHeader from "./QaHeader";
import QnaRow1 from "./QnaRow1";
import QnaRow from "./QnaRow";
import "./QaList.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

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
    <div className="qalist">
      <Sidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto}/>
      <main className="align-center">
        <section className="content1">
          <QaHeader />
          <div className="list1">
            <nav className="tab">
              <button className="tab-item">
                <div className="my">전체 질문</div>
              </button>
              <button className="tab-item1">
                <div className="my1">내 질문</div>
              </button>
              <button className="tab-item2">
                <div className="my2">답변 완료</div>
              </button>
            </nav>
            <div className="col-name">
              <div className="num" />
              <div className="status">
                <div className="div15">답변</div>
              </div>
              <div className="secret">
                <div className="div16">비밀글</div>
              </div>
              <div className="title3">
                <div className="div17">제목</div>
              </div>
              <div className="writer">
                <div className="div18">작성자</div>
              </div>
              <div className="upload-date">
                <div className="div19">작성일</div>
              </div>
              <div className="view">
                <div className="div20">조회수</div>
              </div>
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
