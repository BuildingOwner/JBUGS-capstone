import "./QaListHeader.css"

const QaListHedaer = () => {
    return (
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
    );
}

export default QaListHedaer;