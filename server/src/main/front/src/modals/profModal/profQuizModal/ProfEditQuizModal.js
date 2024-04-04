import Top4 from "./Top4";
import Info from "../../modalComponents/Info";
import "./ProfEditQuizModal.css";

const ProfEditQuizModal = () => {
  return (
    <div className="profeditquizmodal">
      <Top4 />
      <main className="scroll4">
        <div className="deadline2">
          <div className="deadline3">
            <b className="b83">종료 기한</b>
            <b className="quiz-limited-person">2024-00-00 00 : 00</b>
          </div>
          <div className="time2">
            <b className="b84">제한 시간</b>
            <b className="b85">60 분</b>
          </div>
        </div>
        <Info
          prop="응시 인원"
          prop1="0/14"
          propPadding="var(--padding-base-5) 7.419rem var(--padding-base-5) 0rem"
          propMinWidth="unset"
          propAlignSelf="stretch"
          propAlignSelf1="unset"
          propMinWidth1="2.75rem"
        />
        <section className="discription1">
          <b className="b86">설명</b>
          <b className="b87">
            <p className="p37">이거슨 설명입니다</p>
            <p className="p38">2</p>
            <p className="p39">3</p>
            <p className="p40">4</p>
            <p className="p41">5</p>
            <p className="p42">6</p>
            <p className="p43">7</p>
            <p className="p44">8</p>
            <p className="p45">9</p>
            <p className="p46">
              10ㅗㅓㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗㅗ
            </p>
            <p className="p47">11</p>
            <p className="p48">12 ㅁㄴㅇㄹㄴㅇㄻㄴㅇㄹㄻㄴㅇㄻㄻㄴㅇㄻㄴㄹ</p>
          </b>
        </section>
      </main>
      <div className="bottom4">
        <button className="nav-btn6">
          <div className="bottom-navigation-bar">취소</div>
        </button>
        <button className="nav-btn7">
          <b className="text5">수정 하기</b>
        </button>
      </div>
    </div>
  );
};

export default ProfEditQuizModal;
