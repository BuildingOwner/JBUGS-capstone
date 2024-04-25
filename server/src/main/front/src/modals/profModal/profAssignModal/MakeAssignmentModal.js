import Header1 from "./Header1";
import "./MakeAssignmentModal.css";

const MakeAssignmentModal = () => {
  return (
    <div className="makeassignmentmodal">
      <main className="header-parent">
        <Header1 qA="과제 제목" frameDivWidth="8.188rem" />
        <div className="date-info4">
          <div className="date11">
            <b className="b138">종료 일시</b>
            <b className="b139">2024-10-10</b>
          </div>
          <div className="date-container">
            <div className="date12">
              <b className="b140">마감 기한</b>
              <b className="b141">2024-10-10</b>
            </div>
            <div className="date13">
              <b className="b142">최종 수정 일시</b>
              <b className="b143">2024-10-10</b>
            </div>
          </div>
        </div>
        <section className="parent7">
          <b className="b144">설명</b>
          <b className="b145">
            <p className="p99">내용</p>
            <p className="p100">2</p>
            <p className="p101">3</p>
            <p className="p102">4</p>
            <p className="p103">5</p>
            <p className="p104">6</p>
            <p className="p105">7</p>
            <p className="p106">8</p>
            <p className="p107">9</p>
            <p className="p108">10</p>
          </b>
        </section>
        <section className="l-file-item-list">
          <div className="top3">
            <div className="upload-button1">
              <b className="title14">첨부 파일</b>
            </div>
            <button className="upload6">
              <b className="b146">파일 업로드</b>
            </button>
          </div>
          <div className="file-list22">
            <div className="l-fileitem-name">
              <input className="l20" type="checkbox" />
              <div className="file-item20">
                <div className="txt21">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex23">
              <img
                className="vector-icon29"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list23">
            <div className="l-parent14">
              <input className="l21" type="checkbox" />
              <div className="file-item21">
                <div className="txt22">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex24">
              <img
                className="vector-icon30"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list24">
            <div className="l-parent15">
              <input className="l22" type="checkbox" />
              <div className="file-item22">
                <div className="txt23">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex25">
              <img
                className="vector-icon31"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list25">
            <div className="l-parent16">
              <input className="l23" type="checkbox" />
              <div className="file-item23">
                <div className="txt24">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex26">
              <img
                className="vector-icon32"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
        </section>
      </main>
      <div className="nav-btn-parent2">
        <button className="nav-btn18">
          <div className="subcontainer">취소</div>
        </button>
        <button className="nav-btn19">
          <b className="text15">업로드</b>
        </button>
      </div>
    </div>
  );
};

export default MakeAssignmentModal;
