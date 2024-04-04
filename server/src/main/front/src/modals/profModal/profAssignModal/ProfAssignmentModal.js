import { useCallback } from "react";
import Date1 from "../../assignModal/Date1";
import "./ProfAssignmentModal.css";

const ProfAssignmentModal = () => {
  const onAnswerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="profassignmentmodal">
      <section className="header9">
        <h3 className="h39">과제 제목</h3>
        <div className="content-container1">
          <div className="heroicons-outlinex28">
            <img
              className="vector-icon75"
              loading="lazy"
              alt=""
              src="/vector1.svg"
            />
          </div>
        </div>
      </section>
      <section className="scroll6">
        <div className="date-info3">
          <div className="date4">
            <b className="b98">종료 일시</b>
            <b className="name-placeholder">2024-10-10</b>
          </div>
          <div className="date-group">
            <div className="date5">
              <b className="b99">마감 기한</b>
              <b className="date-submitted">2024-10-10</b>
            </div>
            <div className="date6">
              <b className="b100">이름</b>
              <b className="b101">진승원</b>
            </div>
          </div>
        </div>
        <div className="submit-info2">
          <Date1 propWidth="13.419rem" />
          <div className="date7">
            <b className="b102">채점 일시</b>
            <b className="b103">2024-10-12</b>
          </div>
          <div className="date8">
            <b className="b104">성적</b>
            <b className="b105">-</b>
          </div>
        </div>
        <div className="parent4">
          <b className="b106">설명</b>
          <b className="b107">
            <p className="p59">내용</p>
            <p className="p60">2</p>
            <p className="p61">3</p>
            <p className="p62">4</p>
            <p className="p63">5</p>
            <p className="p64">6</p>
            <p className="p65">7</p>
            <p className="p66">8</p>
            <p className="p67">9</p>
            <p className="p68">10</p>
          </b>
        </div>
        <footer className="upload-button">
          <div className="top2">
            <div className="title-container">
              <b className="title9">첨부 파일</b>
            </div>
            <button className="upload3">
              <b className="b108">파일 업로드</b>
            </button>
          </div>
          <div className="file-list9">
            <div className="l-parent4">
              <input className="l8" type="checkbox" />
              <div className="file-item8">
                <div className="txt9">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex10">
              <img
                className="vector-icon16"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list10">
            <div className="l-parent5">
              <input className="l9" type="checkbox" />
              <div className="file-item9">
                <div className="txt10">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex11">
              <img
                className="vector-icon17"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list11">
            <div className="l-parent6">
              <input className="l10" type="checkbox" />
              <div className="file-item10">
                <div className="txt11">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex12">
              <img
                className="vector-icon18"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list12">
            <div className="l-parent7">
              <input className="l11" type="checkbox" />
              <div className="file-item11">
                <div className="txt12">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex13">
              <img
                className="vector-icon19"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
        </footer>
        <div className="comment1" data-scroll-to="commentContainer">
          <div className="title10">
            <b className="b109">피드백</b>
          </div>
          <div className="commentlist1">
            <div className="commentitem5">
              <div className="commentowner5">
                <div className="div68">{`교수님 : `}</div>
              </div>
              <div className="div69">이렇게 해보세요</div>
            </div>
          </div>
        </div>
      </section>
      <input
        className="answer1"
        placeholder="피드백 보기.. or 피드백 남기기.."
        type="text"
        onClick={onAnswerClick}
      />
      <div className="nav-btn-container">
        <button className="nav-btn10">
          <div className="text8">취소</div>
        </button>
        <button className="nav-btn11">
          <b className="text9">수정 하기</b>
        </button>
      </div>
    </div>
  );
};

export default ProfAssignmentModal;
