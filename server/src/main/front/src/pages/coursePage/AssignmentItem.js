import "./AssignmentItem.css"

const assignmentItem = () => {
  return (
    <div className="assignmentitem">
      <div className="submit-parent">
        <button className="submit">
          <b className="submitState">미제출</b>
        </button>
        <b className="assignTitle">과제 제목입니다</b>
      </div>
      <b className="remainPeriod">n일 남음</b>
    </div>
  );
}

export default assignmentItem;