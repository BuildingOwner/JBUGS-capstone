import Info from "../modalComponents/Info";
import "./QuizInfoModal.css";

const QuizInfoModal = () => {
  return (
    <div className="quizinfomodal">
      <div className="top7">
      <h3 className="h38">퀴즈 제목</h3>
      <div className="heroicons-outlinex27">
        <img
          className="vector-icon74"
          loading="lazy"
          alt=""
          src="/vector1.svg"
        />
      </div>
    </div>
      <main className="scroll3">
        <div className="deadline">
          <div className="deadline1">
            <b className="b78">종료 기한</b>
            <b className="minutes">2024-00-00 00 : 00</b>
          </div>
          <div className="time1">
            <b className="b79">제한 시간</b>
            <b className="b80">60 분</b>
          </div>
        </div>
        <Info prop="점수" prop1="- 점 / 100 점" />
        <section className="discription">
          <b className="b81">설명</b>
          <b className="b82">
            <p className="p25">이거슨 설명입니다</p>
            <p className="p26">2</p>
            <p className="p27">3</p>
            <p className="p28">4</p>
            <p className="p29">5</p>
            <p className="p30">6</p>
            <p className="p31">7</p>
            <p className="p32">8</p>
            <p className="p33">9</p>
            <p className="p34">
              10ㅗㅓㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ
            </p>
            <p className="p35">11</p>
            <p className="p36">12 ㅁㄴㅇㄹㄴㅇㄻㄴㅇㄹㄻㄴㅇㄻㄻㄴㅇㄻㄴㄹ</p>
          </b>
        </section>
      </main>
      <div className="bottom3">
        <button className="nav-btn4">
          <div className="text3">취소</div>
        </button>
        <button className="nav-btn5">
          <b className="text4">응시 하기</b>
        </button>
      </div>
    </div>
  );
};

export default QuizInfoModal;
