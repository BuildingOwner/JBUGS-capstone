import "./AssignListHeader.css"

const AssignListHeader = (props) => {
    const title = props.title;
    return (
        <div className="col-name2">
            <div className="title15">
                <b className="b147">{title}</b>
                <div className="div80">(3)</div>
            </div>
            <div className="div81">제목</div>
            <div className="div82">주차</div>
            <div className="div83">기한</div>
            <div className="div84">성적</div>
        </div>
    );
}

export default AssignListHeader;