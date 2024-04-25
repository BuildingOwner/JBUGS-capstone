import Sidebar from "../../sidebar/Sidebar"
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import "./ChatbotPage.css";

const ChatbotPage = () => {
  return (
    <div className="chatbotpage">
      <Sidebar />
      <main className="box-wrapper">
        <section className="box">
          <div className="top6">
            <div className="title-parent1">
              <h1 className="title25">AI Chat Helper</h1>
              <div className="choice-model">
                <div className="gpt-4-turbo">GPT 4 Turbo</div>
                <div className="bxsdown-arrow4">
                  <img className="vector-icon55" alt="" src="/vector-5.svg" />
                </div>
              </div>
            </div>
            <div className="history-top">
              <h2 className="history1">History</h2>
              <div className="capacity">
                <div className="div210">6 / 50</div>
              </div>
            </div>
          </div>
          <div className="data-aggregator1">
            <div className="content3">
              <div className="chat-board">
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
              </div>
              <div className="chat">
                <button className="regenerate">
                  <div className="icon-park-outlineredo">
                    <img
                      className="group-icon3"
                      loading="lazy"
                      alt=""
                      src="/group2.svg"
                    />
                  </div>
                  <div className="regenerate-response">Regenerate response</div>
                </button>
                <div className="inputs">
                  <div className="input-file">
                    <div className="lucidefile-plus">
                      <img
                        className="group-icon4"
                        loading="lazy"
                        alt=""
                        src="/group-11.svg"
                      />
                    </div>
                  </div>
                  <button className="input-file1">
                    <div className="f7mic">
                      <img
                        className="vector-icon9"
                        alt=""
                        src="/vector-42.svg"
                      />
                    </div>
                  </button>
                  <input
                    className="inputs-child"
                    placeholder="질문을 입력해주세요..."
                    type="text"
                  />
                  <div className="input-file2">
                    <div className="cipaper-plane">
                      <img
                        className="vector-icon10"
                        loading="lazy"
                        alt=""
                        src="/vector-52.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="history">
              <div className="history-list">
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
              </div>
              <div className="history-delete-btn-wrapper">
                <button className="history-delete-btn">
                  <div className="octicontrashcan-16">
                    <img
                      className="vector-icon11"
                      alt=""
                      src="/vector-63.svg"
                    />
                  </div>
                  <div className="div49">선택 삭제</div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ChatbotPage;
