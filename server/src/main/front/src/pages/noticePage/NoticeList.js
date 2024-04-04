import Sidebar from "../../sidebar/Sidebar";
import Top2 from "./Top2";
import NoticeHeader from "./NoticeHeader";
import NoticeRow from "./NoticeRow";
import "./NoticeList.css";

const NoticeList = () => {
  return (
    <div className="noticelist">
      <Sidebar />
      <main className="content-wrapper">
        <section className="content2">
          <Top2 />
          <div className="list2">
            <NoticeHeader/>
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
              <NoticeRow noticeType="시험" />
              <NoticeRow noticeType="대면 수업" />
              <NoticeRow noticeType="온라인" />
              <NoticeRow noticeType="온라인" />
              <NoticeRow noticeType="온라인" />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default NoticeList;
