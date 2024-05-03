import "./NoticeRow.css";

const NoticeRow = (props) => {
  return (
    <div className="notice-row2">
      <div className="line14">
        <div className="num6">
          <div className="div204">123</div>
        </div>
        <div className="status22">
          {props.noticeStatus === "EXAM" ?
            <b className="b199">시험</b> :
            props.noticeStatus === "ONLINE" ? <b className="b199">온라인</b> :
             <b className="b199">대면 수업</b>}
        </div>
        <div className="secret5">
          <div className="pin-fill2">
            <img className="vector-icon51" alt="" src="/vector-71.svg" />
          </div>
        </div>
        <div className="title24">
          <div className="title-text4">
            <span className="title-text-txt">
              <p className="p121">{props.title}</p>
            </span>
          </div>
        </div>
        <div className="writer6">
          <div className="div205">{props.writer}</div>
        </div>
        <div className="upload-date6">
          <div className="div206">{props.createdAt}</div>
        </div>
        <div className="view8">
          <div className="div207">{props.views}</div>
        </div>
      </div>
    </div>
  );
};

export default NoticeRow;
