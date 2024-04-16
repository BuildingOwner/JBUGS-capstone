import "./AssignmentInfoModal.css";
import FileItem from "./FileItem";

const AssignmentInfoModal = () => {
  return (
    <div className="assignmentinfomodal">
      <div className="header">
        <h3 className="h3">과제 제목</h3>
        <div className="scroll">
          <div className="heroicons-outlinex">
            <img
              className="vector-icon"
              loading="lazy"
              alt=""
              src="/vector1.svg"
            />
          </div>
        </div>
      </div>
      <main className="scroll1">
        <div className="date-info">
          <div className="date">
            <b className="b">종료 일시</b>
            <b className="b1">2024-10-10</b>
          </div>
          <div className="date1">
            <b className="b">마감 기한</b>
            <b className="b1">2024-10-10</b>
          </div>
          <div className="date2">
            <b className="b">최종 수정 일시</b>
            <b className="b1">2024-10-10</b>
          </div>
          <div className="submit-info">
            <b className="b">제출 현황</b>
            <b className="b1">-</b>
          </div>
        </div>

        <section className="date-info1">
          <b className="b">설명</b>
          <b className="b1">
            <p className="p">내용</p>
          </b>
        </section>
        <section className="top-parent">
          <div className="top">
            <div className="title-wrapper">
              <b className="title">첨부 파일</b>
            </div>
            <button className="upload">
              <b className="b10">파일 업로드</b>
            </button>
          </div>
          <FileItem />
          <FileItem />
          <FileItem />
        </section>
      </main>
      <div className="nav-btn-parent">
        <button className="nav-btn">
          <div className="text">취소</div>
        </button>
        <button className="nav-btn1">
          <b className="text1">수정하기</b>
        </button>
      </div>
    </div>
  );
};

export default AssignmentInfoModal;
