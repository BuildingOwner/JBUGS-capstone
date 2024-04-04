import "./FileUploadModal.css";

const FileUploadModal = () => {
  return (
    <div className="fileuploadmodal">
      <div className="group">
        <b className="b74">파일 업로드</b>
        <div className="title6">
          <div className="heroicons-outlinex5">
            <img
              className="vector-icon12"
              loading="lazy"
              alt=""
              src="/vector1.svg"
            />
          </div>
        </div>
      </div>
      <main className="frame-group">
        <div className="car-wrapper">
          <div className="car">
            <b className="b75">{`주차 : `}</b>
            <div className="menu-wrapper">
              <button className="menu1">
                <div className="div53">주차</div>
                <div className="dropdown-icon">
                  <div className="bxsdown-arrow1">
                    <img className="vector-icon13" alt="" src="/vector-5.svg" />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
        <section className="fileinput-parent">
          <div className="fileinput">
            <div className="file-name">
              <b className="b76">{`자료명 : `}</b>
              <div className="div54">자료명을 입력해주세요</div>
            </div>
            <div className="navbtn">
              <div className="wrapper16">
                <div className="div55">파일추가</div>
              </div>
            </div>
          </div>
          <div className="fileinput1">
            <div className="parent1">
              <b className="b77">동영상명 :</b>
              <div className="div56">영상 제목을 입력해주세요</div>
            </div>
            <div className="fileinput-inner">
              <div className="wrapper17">
                <div className="div57">영상추가</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="fileuploadmodal-child" />
      <div className="nav-btn-group">
        <button className="nav-btn2">
          <div className="file-inputfile-input">취소</div>
        </button>
        <button className="nav-btn3">
          <b className="text2">업로드</b>
        </button>
      </div>
    </div>
  );
};

export default FileUploadModal;
