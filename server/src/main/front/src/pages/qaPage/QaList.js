import Sidebar from "../../sidebar/Sidebar";
import QaHeader from "./QaHeader";
import QnaRow1 from "./QnaRow1";
import QnaRow from "./QnaRow";
import QaListHeader from "./QaListHeader";
import "./QaList.css";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const QaList = () => {
  const location = useLocation()
  console.log("qa location : ", location)
  const enrollmentId = location.state.enrollmentId
  const [qnADtoList, setQnADtoList] = useState()
  const [courseDto, setCourseDto] = useState()
  const [memberInfoDto, setMemberInfoDto] = useState()

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
      <Sidebar />
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
            <QaListHeader />
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
