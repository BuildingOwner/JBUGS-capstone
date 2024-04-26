import "./YetAssign.css";

const ListRow1 = (props) => {
  console.log(props)
  return (
    <div className="list-row2">
      <button className="submit16">
        {props.status === "NOT_SUBMITTED" ? (
                    <b className="b224">미제출</b>
                  ) : <b className="b224">제출</b>
                }
      </button>
      <div className="div281">
        <span>
          <p className="p182">{props.title}</p>
        </span>
      </div>
      <div className="div282">{props.weekId}주차</div>
      <div className="div283">24-03-24 23:59</div>
      <div className="div284">-</div>
    </div>
  );
};

export default ListRow1;
