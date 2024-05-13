import { useEffect, useState } from "react";
import "./MakeQaModal.css";
import ReactModal from "react-modal";

const MakeQaModal = (props) => {
  ReactModal.setAppElement("#root")
  const [qnA, setQnA] = useState("")
  const [title, setTitle] = useState("")
  const [memberInfoDto, setMemberInfoDto] = useState({})
  const [memberName, setMemberName] = useState("")
  const [secret, setSecret] = useState(true)

  const uploadQnA = async () => {
    try {
      const response = await axios.post(`api/course/${enrollmentId}/qna/create`)
    } catch (error) {

    }
  }

  useEffect(() => {
    setMemberInfoDto(props.memberInfoDto)
    setMemberName(props.memberInfoDto.memberName)
  }, [])

  return (
    <ReactModal className="makeqamodal"
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}>
      <main className="q-a-modal"><section className="header10">
        <textarea onChange={(e) => { setTitle(e.target.value) }}>

        </textarea>
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
        <section className="info6">
          <div className="parent6">
            <b className="b122">작성자</b>
            <div className="private-message">
              <b className="b123">비밀글</b>
              <img
                className="icround-lock-icon1"
                loading="lazy"
                alt=""
                src="/icroundlock1.svg"
              />
            </div>
          </div>
          <b className="b124">{memberName}</b>
        </section>
        <section className="frame-section">
          <b className="b125">내용</b>
          <b className="b126">
            <textarea onChange={(e) => { setQnA(e.target.value) }}>

            </textarea>
          </b>
        </section>
        <section className="files1">
          <div className="title-group">
            <b className="title13">첨부 파일</b>
            <button className="upload5">
              <b className="b127">파일 업로드</b>
            </button>
          </div>
          <div className="file-list17">
            <div className="file-list18">
              <input className="l16" type="checkbox" />
              <div className="file-item16">
                <div className="txt17">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex18">
              <img
                className="vector-icon24"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list19">
            <div className="l-parent11">
              <input className="l17" type="checkbox" />
              <div className="file-item17">
                <div className="txt18">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex19">
              <img
                className="vector-icon25"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list20">
            <div className="l-parent12">
              <input className="l18" type="checkbox" />
              <div className="file-item18">
                <div className="txt19">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex20">
              <img
                className="vector-icon26"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
          <div className="file-list21">
            <div className="l-parent13">
              <input className="l19" type="checkbox" />
              <div className="file-item19">
                <div className="txt20">파일이름임.txt</div>
              </div>
            </div>
            <div className="heroicons-outlinex21">
              <img
                className="vector-icon27"
                loading="lazy"
                alt=""
                src="/vector1.svg"
              />
            </div>
          </div>
        </section>
      </main>
      <div className="nav-btn-parent1">
        <button className="nav-btn14">
          <div className="text11">취소</div>
        </button>
        <button className="nav-btn15">
          <b className="text12">질문하기</b>
        </button>
      </div>
    </ReactModal>
  );
};

export default MakeQaModal;
