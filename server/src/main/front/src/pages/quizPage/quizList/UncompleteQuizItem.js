import "./UncompleteQuizItem.css";

const UncompleteQuizItem = () => {
  return (
    <div className="uncomplete-quiz-item">
      <div className="tltle">
        <div className="div232">3주차 연습문제</div>
      </div>
      <div className="discreption">
        <div className="deadline4">
          <div className="div233">기간</div>
          <div className="div234">24 - 05 - 12</div>
        </div>
        <div className="div235">
          <p className="p127">퀴즈에 대한 설명</p>
          <p className="p128">2줄</p>
          <p className="p129">3줄</p>
          <p className="p130">4줄</p>
          <p className="p131">5줄 긴거 ㅁㄴㅇㄹㄴㅇㄻ</p>
        </div>
      </div>
      <div className="bottom13">
        <div className="info24">
          <div className="time5">
            <div className="div236">제한 시간</div>
            <div className="div237">10 분</div>
          </div>
          <div className="score16">
            <div className="div238">점수</div>
            <div className="div239">100 점</div>
          </div>
        </div>
        <div className="go-btn">
          <div className="div240">퀴즈로 가기</div>
          <div className="bxsright-arrow">
            <img className="vector-icon69" alt="" src="/vector-9.svg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UncompleteQuizItem;
