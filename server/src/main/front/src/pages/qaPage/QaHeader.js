import "./QaHeader.css";

const QaHeader = () => {
  return (
    <div className="top4">
      <h1 className="title19">QnA</h1>
      <div className="align-middle">
        <div className="spacing">
          <button className="menu2">
            <div className="div188">제목</div>
            <div className="bxsdown-arrow2">
              <img
                className="custom-property-icon"
                alt=""
                src="/vector-5.svg"
              />
            </div>
          </button>
          <div className="search">
            <div className="search-input" />
            <div className="icon">
              <img className="border-radius-icon" alt="" src="/vector-61.svg" />
            </div>
          </div>
          <button className="add-qna">
            <b className="b193">질문하기</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QaHeader;
