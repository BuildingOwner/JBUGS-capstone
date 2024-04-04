import { useCallback } from "react";
import Header from "./Header";
import Date1 from "./Date1";
import "./AssignmentModal.css";

const AssignmentModal = () => {
  const onAnswerClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='commentContainer']"
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  return (
    <div className="assignmentmodal">
      <Header />
      <section className="scroll5">
        <div className="d-a-t-e-i-n-f-o">
          <div className="date-info2">
            <div className="parent2">
              <b className="b88">종료 일시</b>
              <b className="b89">2024-10-10</b>
            </div>
            <div className="parent3">
              <b className="b90">마감 기한</b>
              <b className="b91">2024-10-10</b>
            </div>
          </div>
          <div className="submit-info1">
            <Date1 />
            <div className="date3">
              <b className="b92">최종 수정 일시</b>
              <b className="b93">2024-10-10</b>
            </div>
          </div>
        </div>
        <div className="f-r-a-m-e">
          <b className="b94">설명</b>
          <b className="b95">
            <p className="p49">내용</p>
            <p className="p50">2</p>
            <p className="p51">3</p>
            <p className="p52">4</p>
            <p className="p53">5</p>
            <p className="p54">6</p>
            <p className="p55">7</p>
            <p className="p56">8</p>
            <p className="p57">9</p>
            <p className="p58">10</p>
          </b>
        </div>
        <footer className="file-list4">
          <div className="top1">
            <div className="f-r-a-m-e1">
              <b className="title7">첨부 파일</b>
            </div>
            <button className="upload2">
              <b className="b96">파일 업로드</b>
            </button>
          </div>
          <div className="file-list5">
            <div className="l-parent1">
              <input className="l4" type="checkbox" />
              <div className="file-item4">
                <div className="txt5">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex6">
              <img
                className="vector-icon14"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list6">
            <div className="l-parent2">
              <input className="l5" type="checkbox" />
              <div className="file-item5">
                <div className="txt6">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex7">
              <img
                className="vector-icon15"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list7">
            <div className="l-parent3">
              <div className="l6" />
              <div className="file-item6">
                <div className="txt7">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex8">
              <input className="vector" type="checkbox" />
            </div>
          </div>
        </footer>
        <div className="comment-owner">
          <div className="file-list8">
            <div className="navbtn1">
              <input className="l7" type="checkbox" />
              <div className="file-item7">
                <div className="txt8">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex9">
              <input className="vector1" type="checkbox" />
            </div>
          </div>
          <div className="comment" data-scroll-to="commentContainer">
            <div className="title8">
              <b className="b97">댓글</b>
            </div>
            <div className="commentlist">
              <div className="commentitem">
                <div className="commentowner">
                  <div className="div58">{`교수님 : `}</div>
                </div>
                <div className="div59">이렇게 해보세요</div>
              </div>
              <div className="commentitem1">
                <div className="commentowner1">
                  <div className="div60">{`교수님 : `}</div>
                </div>
                <div className="div61">이렇게 해보세요</div>
              </div>
              <div className="commentitem2">
                <div className="commentowner2">
                  <div className="div62">{`교수님 : `}</div>
                </div>
                <div className="div63">이렇게 해보세요</div>
              </div>
              <div className="commentitem3">
                <div className="commentowner3">
                  <div className="div64">{`교수님 : `}</div>
                </div>
                <div className="div65">이렇게 해보세요</div>
              </div>
              <div className="commentitem4">
                <div className="commentowner4">
                  <div className="div66">{`교수님 : `}</div>
                </div>
                <div className="div67">이렇게 해보세요</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <input
        className="answer"
        placeholder="피드백 보기..."
        type="text"
        onClick={onAnswerClick}
      />
      <div className="feedback-panel">
        <button className="nav-btn8">
          <div className="text6">취소</div>
        </button>
        <button className="nav-btn9">
          <b className="text7">수정 하기</b>
        </button>
      </div>
    </div>
  );
};

export default AssignmentModal;
