import "./MainAssignItem.css"

const MainAssignItem = (props) => {
  console.log("MainAssignItem의 props", props)
  // dueDate 문자열을 Date 객체로 변환합니다
  const dueDate = new Date(props.dueDate);
  // 현재 날짜를 가져옵니다
  const currentDate = new Date();
  // 남은 시간을 계산합니다 (밀리초 단위)
  const timeDiff = dueDate.getTime() - currentDate.getTime();
  // 남은 일수를 계산합니다
  const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return (
    <div className="homeworkitem">
      <div className="week">
        <div className="div162">{props.weekNumber}주차</div>
      </div>
      <div className="name2">
        <b className="b177">{props.lectureName}</b>
        <div className="div163">{props.title}</div>
      </div>
      <div className="info10">
        <div className="star-styles">
          <div className="n9">{daysRemaining}일 남음</div>
        </div>
        {props.status === "NOT_SUBMITTED" ? (
          <img
            className="octiconx-12"
            loading="lazy"
            alt=""
            src="/octiconx12.svg"
          />
        ) : (
          <img
            className="custom-img"
            loading="lazy"
            alt=""
            src="/custom-img-2.svg"
          />
        )}
      </div>
    </div>
  );
}

export default MainAssignItem;