import "./NoticeRow.css";

const NoticeRow = (props) => {
  const noticeType = props.noticeType;
  return (
    <div className="notice-row2">
      <div className="line14">
        <div className="num6">
          <div className="div204">123</div>
        </div>
        <div className="status22">
          <b className="b199">{noticeType}</b>
        </div>
        <div className="secret5">
          <div className="pin-fill2">
            <img className="vector-icon51" alt="" src="/vector-71.svg" />
          </div>
        </div>
        <div className="title24">
          <div className="title-text4">
            <span className="title-text-txt">
              <p className="p121">온라인 강의 바꼈다~</p> 
            </span>
          </div>
        </div>
        <div className="writer6">
          <div className="div205">김아무개</div>
        </div>
        <div className="upload-date6">
          <div className="div206">2024-10-10</div>
        </div>
        <div className="view8">
          <div className="div207">50000</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRow;
