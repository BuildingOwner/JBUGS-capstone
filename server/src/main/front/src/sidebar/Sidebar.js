import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebars1">
      <div className="input-processor">
        <img
          className="logo-icon1"
          loading="lazy"
          alt=""
          src="/rectangle-1@2x.png"
        />
      </div>
      <div className="nav1">
        <div className="main-nav1">
          <div className="navitem2">
            <div className="bitcoin-iconshome-outline1">
              <img
                className="pattern-matcher-icon"
                loading="lazy"
                alt=""
                src="/vector.svg"
              />
            </div>
            <div className="decision-tree">
              <h3 className="home1">HOME</h3>
            </div>
          </div>
          <div className="navitem3">
            <img className="vector-icon37" alt="" src="/vector-1.svg" />
            <div className="ai-chat-wrapper">
              <h3 className="ai-chat1">AI Chat</h3>
            </div>
          </div>
        </div>
        <div className="course-nav">
          <div className="course-name">
            <h3 className="h34">웹프레임워크2</h3>
            <div className="line8" />
            <h3 className="a4">A</h3>
          </div>
          <div className="aggregator">
            <div className="navitem4">
              <div className="iconoirquestion-mark">
                <img className="scaler-icon" alt="" src="/vector-2.svg" />
              </div>
              <div className="splitter">
                <h3 className="qa">{`Q&A`}</h3>
              </div>
            </div>
          </div>
          <div className="aggregator1">
            <div className="navitem5">
              <div className="tablerspeakerphone">
                <img
                  className="group-icon6"
                  loading="lazy"
                  alt=""
                  src="/group1.svg"
                />
              </div>
              <div className="wrapper40">
                <h3 className="h35">공지사항</h3>
              </div>
            </div>
          </div>
          <div className="aggregator2">
            <div className="navitem6">
              <div className="tablerclipboard-text">
                <img className="group-icon7" alt="" src="/group-1.svg" />
              </div>
              <div className="wrapper41">
                <h3 className="h36">과제</h3>
              </div>
            </div>
          </div>
          <div className="aggregator3">
            <div className="navitem7">
              <div className="system-uiconslightbulb-on">
                <img className="vector-icon38" alt="" src="/vector-3.svg" />
              </div>
              <div className="wrapper42">
                <h3 className="h37">퀴즈</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="info-wrapper">
        <div className="info16">
          <div className="queue">
            <div className="stack">
              <b className="b183">진승원</b>
            </div>
            <div className="div181">웹공학트랙</div>
          </div>
          <div className="last-in-first-out">
            <img
              className="personicon5"
              loading="lazy"
              alt=""
              src="/personicon.svg"
            />
          </div>
        </div>
      </div>
      <div className="bottom6">
        <img className="collepse-btn-icon1" alt="" src="/collepse-btn@2x.png" />
        <div className="log-out1">
          <div className="div182">로그아웃</div>
        </div>
        <div className="phsquare-half-fill1">
          <img className="vector-icon39" alt="" src="/vector-4.svg" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
