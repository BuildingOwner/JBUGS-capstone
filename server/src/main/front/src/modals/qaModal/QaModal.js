
import axios from "axios";
import "./QaModal.css";
import Modal from "react-modal"

const QaModal = (props) => {
  Modal.setAppElement("#root")
  const data = props.props

  
  return (
    <Modal className="qamodal"
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <section className="header10">
        <h3 className="qa6">
          {data.title}
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
            <b className="b111">{data.writer}</b>
          </div>
          <div className="date9">
            <b className="b112">작성일</b>
            <b className="b113">{data.createdAt}</b>
          </div>
          <div className="view3">
            <b className="b114">조회수</b>
            <b className="b115">{data.views}</b>
          </div>
          <div className="answer2">
            <b className="b116">답변 여부</b>
            {
              data.qnAStatus === "RESPONSE_EXPECTED" ?
                <button className="status3">
                  <b className="b117">답변 예정</b>
                </button>
                : <button className="status3">
                  <b className="b117">답변 완료</b>
                </button>
            }

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
            <p className="p69">{data.content}</p>
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
