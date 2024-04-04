import ProfAssignItem1 from "./ProfAssignItem1";
import ProfAssignItem from "./ProfAssignItem";
import "./Bottom2.css";

const Bottom2 = () => {
  return (
    <footer className="bottom20">
      <div className="quiz-list1">
        <div className="top8">
          <b className="b236">과제목록</b>
          <button className="menu7">
            <div className="div295">주차</div>
            <div className="bxsdown-arrow8">
              <img className="pattern-matcher-icon1" alt="" src="/vector-53.svg" />
            </div>
          </button>
        </div>
        <div className="name22">
          <div className="title39">
            <div className="div328">제목</div>
          </div>
          <div className="ave5">
            <div className="div329">평균</div>
          </div>
          <div className="week28">
            <div className="div330">주차</div>
          </div>
          <div className="count5">
            <div className="div331">제출 인원</div>
          </div>
          <div className="date43">
            <div className="div332">마감 일시</div>
          </div>
          <div className="status32">
            <div className="div333">상태</div>
          </div>
        </div>
        <div className="list8">
          <ProfAssignItem1 />
          <ProfAssignItem />
          <ProfAssignItem />
          <ProfAssignItem />
          <ProfAssignItem />
          <ProfAssignItem1 />
          <ProfAssignItem1 />
          <ProfAssignItem />
          <ProfAssignItem1 />
          <ProfAssignItem />
          <ProfAssignItem1 />
          <ProfAssignItem />
          <ProfAssignItem />
        </div>
      </div>
    </footer>
  );
};

export default Bottom2;
