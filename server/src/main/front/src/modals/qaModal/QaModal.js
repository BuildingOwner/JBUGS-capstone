
import "./QaModal.css";
import Modal from "react-modal"

const QaModal = (props) => {

  return (
    <Modal className="qamodal"
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <section className="header10">
        <h3 className="qa6">
          Q&A 제목
        </h3>
        <div className="heroicons-outlinex-wrapper">
          <div className="heroicons-outlinex29" onClick={props.onRequestClose}>
            <img
              className="vector-icon76"
              loading="lazy"
              alt=""
              src="/vector1.svg"
            />
          </div>
        </div>
      </section>
      <section className="scroll7">
        <nav className="info5">
          <div className="owner">
            <b className="b110">작성자</b>
            <b className="b111">김아무개</b>
          </div>
          <div className="date9">
            <b className="b112">작성일</b>
            <b className="b113">2024-10-10</b>
          </div>
          <div className="view3">
            <b className="b114">조회수</b>
            <b className="b115">50000</b>
          </div>
          <div className="answer2">
            <b className="b116">답변 여부</b>
            <button className="status3">
              <b className="b117">완료</b>
            </button>
          </div>
          <div className="parent5">
            <b className="b118">비밀글</b>
            <img
              className="icround-lock-icon"
              loading="lazy"
              alt=""
              src="/icroundlock1.svg"
            />
          </div>
        </nav>
        <div className="comment-owner-list">
          <b className="b119">설명</b>
          <b className="b120">
            <p className="p69">내용</p>
            <p className="p70">2</p>
            <p className="p71">3</p>
            <p className="p72">4</p>
            <p className="p73">5</p>
            <p className="p74">6</p>
            <p className="p75">7</p>
            <p className="p76">8</p>
            <p className="p77">9</p>
            <p className="p78">10</p>
          </b>
        </div>
        <div className="navigation-button">
          <div className="title-parent">
            <b className="title11">첨부 파일</b>
            <button className="upload4">
              <b className="b121">파일 업로드</b>
            </button>
          </div>
          <div className="file-list13">
            <div className="list-files">
              <input className="l12" type="checkbox" />
              <div className="file-item12">
                <div className="txt13">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex14">
              <img
                className="vector-icon20"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list14">
            <div className="l-parent8">
              <input className="l13" type="checkbox" />
              <div className="file-item13">
                <div className="txt14">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex15">
              <img
                className="vector-icon21"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list15">
            <div className="l-parent9">
              <input className="l14" type="checkbox" />
              <div className="file-item14">
                <div className="txt15">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex16">
              <img
                className="vector-icon22"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list16">
            <div className="l-parent10">
              <input className="l15" type="checkbox" />
              <div className="file-item15">
                <div className="txt16">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex17">
              <img
                className="vector-icon23"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
        </div>
        <div className="comment2" data-scroll-to="commentContainer">
          <div className="title12">
            <input className="input2" placeholder="댓글" type="text" />
          </div>
          <div className="commentlist2">
            <div className="commentitem6">
              <div className="commentowner6">
                <div className="div70">{`교수님 : `}</div>
              </div>
              <div className="div71">이렇게 해보세요1</div>
            </div>
            <div className="commentitem7">
              <div className="commentowner7">
                <div className="div72">{`교수님 : `}</div>
              </div>
              <div className="div73">이렇게 해보세요2</div>
            </div>
            <div className="commentitem8">
              <div className="commentowner8">
                <div className="div74">{`교수님 : `}</div>
              </div>
              <div className="div75">이렇게 해보세요3</div>
            </div>
            <div className="commentitem9">
              <div className="commentowner9">
                <div className="div76">{`교수님 : `}</div>
              </div>
              <div className="div77">이렇게 해보세요4</div>
            </div>
            <div className="commentitem10">
              <div className="commentowner10">
                <div className="div78">{`교수님 : `}</div>
              </div>
              <div className="div79">이렇게 해보세요5</div>
            </div>
          </div>
        </div>
      </section>
      <input
        className="qamodal-child"
        placeholder="답변을 해주세요..."
        type="text"
      />
      <div className="main-navbar">
        <button className="nav-btn12">
          <div className="global-navbar">취소</div>
        </button>
        <button className="nav-btn13">
          <b className="text10">답변 하기</b>
        </button>
      </div>
    </Modal >
  );
};

export default QaModal;
