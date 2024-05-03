import Sidebar from "../../sidebar/Sidebar";
import Top2 from "./Top2";
import NoticeRow from "./NoticeRow";
import "./NoticeList.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const NoticeList = () => {
  const location = useLocation()
  const enrollmentId = location.state.enrollmentId
  const [memberInfoDto, setMemberInfoDto] = useState()
  const [lectureName, setLectureName] = useState()
  const [division, setDivision] = useState()
  const [noticeDtoList, setNoticeDtoList] = useState()
  const [courseDto, setCourseDto] = useState()

  const fetchNoticeList = async () => {
    try {
      const response = await axios.get(`/api/course/${enrollmentId}/notice`)
      console.log("notice response : ", response)
      const noticeData = response.data.noticeDtoList.map((notice) => notice).flat()
      console.log(noticeData)
      setNoticeDtoList(noticeData)
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchNoticeList()
  }, [])

  return (
    <div className="noticelist">
      <Sidebar enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto}/>
      <main className="content-wrapper">
        <section className="content2">
          <Top2 />
          <div className="list2">
            <nav className="tab1">
              <button className="tab-item3">
                <div className="my3">전체 공지</div>
              </button>
              <button className="tab-item4">
                <div className="my4">시험</div>
              </button>
              <button className="tab-item5">
                <div className="my5">온라인</div>
              </button>
              <button className="tab-item6">
                <div className="my6">대면수업</div>
              </button>
            </nav>
            <div className="col-name1">
              <div className="num1" />
              <div className="status1">
                <div className="div21">구분</div>
              </div>
              <div className="pin" />
              <div className="title4">
                <div className="div22">제목</div>
              </div>
              <div className="writer1">
                <div className="div23">작성자</div>
              </div>
              <div className="upload-date1">
                <div className="div24">작성일</div>
              </div>
              <div className="view1">
                <div className="div25">조회수</div>
              </div>
            </div>
            <div className="table1">
              {noticeDtoList?.map((notice, i) => (
                <NoticeRow
                  content={notice.content}
                  createdAt={notice.createdAt}
                  noticeId={notice.noticeId}
                  noticeStatus={notice.noticeStatus}
                  title={notice.title}
                  views={notice.views}
                  writer={notice.writer}
                  key={`notice${i}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NoticeList;
