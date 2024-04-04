import "./NoticeModal.css";

const NoticeModal = () => {
  return (
    <div className="noticemodal">
      <div className="header4">
        <h3 className="h33">공지사항 제목</h3>
        <div className="heroicons-outlinex22">
          <img
            className="vector-icon28"
            loading="lazy"
            alt=""
            src="/vector1.svg"
          />
        </div>
      </div>
      <main className="scroll8">
        <nav className="info7">
          <div className="owner1">
            <b className="b128">작성자</b>
            <b className="b129">교수님</b>
          </div>
          <div className="date10">
            <b className="b130">작성일</b>
            <b className="b131">2024-10-10</b>
          </div>
          <div className="view4">
            <b className="b132">조회수</b>
            <b className="b133">50000</b>
          </div>
          <div className="answer3">
            <b className="b134">구분</b>
            <button className="status4">
              <b className="b135">시험</b>
            </button>
          </div>
        </nav>
        <section className="discription2">
          <b className="b136">설명</b>
          <b className="b137">
            <p className="p89">시험 준비물은 ~~</p>
            <p className="p90">5</p>
            <p className="blank-line">&nbsp;</p>
            <p className="p91">3467</p>
            <p className="p92">7</p>
            <p className="p93">8</p>
            <p className="p94">9</p>
            <p className="p95">9</p>
            <p className="p96">4</p>
            <p className="p97">64</p>
            <p className="blank-line1">&nbsp;</p>
            <p className="p98">4</p>
            <p className="blank-line2">&nbsp;</p>
          </b>
        </section>
      </main>
      <div className="btunsection">
        <button className="nav-btn16">
          <div className="text13">닫기</div>
        </button>
        <button className="nav-btn17">
          <b className="text14">작성하기</b>
        </button>
      </div>
    </div>
  );
};

export default NoticeModal;
