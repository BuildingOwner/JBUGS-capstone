import "./AssignmentInfoModal.css";

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
          <div className="date-parent">
            <div className="date1">
              <b className="b2">마감 기한</b>
              <b className="b3">2024-10-10</b>
            </div>
            <div className="date2">
              <b className="b4">최종 수정 일시</b>
              <b className="b5">2024-10-10</b>
            </div>
          </div>
        </div>
        <section className="submit-info">
          <b className="b6">제출 현황</b>
          <b className="b7">-</b>
        </section>
        <section className="date-info1">
          <b className="b8">설명</b>
          <b className="b9">
            <p className="p">내용</p>
            <p className="p1">2</p>
            <p className="p2">3</p>
            <p className="p3">4</p>
            <p className="p4">5</p>
            <p className="p5">6</p>
            <p className="p6">7</p>
            <p className="p7">8</p>
            <p className="p8">9</p>
            <p className="p9">10</p>
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
          <div className="file-list">
            <div className="l-file-item">
              <input className="l" type="checkbox" />
              <div className="file-item">
                <div className="txt">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex1">
              <img
                className="vector-icon1"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list1">
            <div className="l-parent">
              <input className="l1" type="checkbox" />
              <div className="file-item1">
                <div className="txt1">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex2">
              <img
                className="vector-icon2"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list2">
            <div className="l-group">
              <input className="l2" type="checkbox" />
              <div className="file-item2">
                <div className="txt2">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex3">
              <img
                className="vector-icon3"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list3">
            <div className="l-container">
              <div className="l3" />
              <div className="file-item3">
                <div className="txt3">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex4">
              <img
                className="vector-icon4"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
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
