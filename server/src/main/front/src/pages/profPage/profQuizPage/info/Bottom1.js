import Item from "./Item";
import "./Bottom1.css";

const Bottom1 = () => {
  return (
    <div className="bottom18">
      <div className="quiz-list">
      <div className="top8">
          <b className="b236">과제목록</b>
          <button className="menu7">
            <div className="div295">주차</div>
            <div className="bxsdown-arrow8">
              <img className="pattern-matcher-icon1" alt="" src="/vector-53.svg" />
            </div>
          </button>
        </div>
        <div className="name21">
          <div className="title35">
            <div className="div306">제목</div>
          </div>
          <div className="category2">
            <div className="div307">분류</div>
          </div>
          <div className="ave2">
            <div className="div308">평균</div>
          </div>
          <div className="week25">
            <div className="div309">주차</div>
          </div>
          <div className="count2">
            <div className="div310">응시 인원</div>
          </div>
          <div className="date37">
            <div className="div311">종료 일시</div>
          </div>
          <div className="status29">
            <div className="div312">상태</div>
          </div>
        </div>
        <div className="list7">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
    </div>
  );
};

export default Bottom1;
