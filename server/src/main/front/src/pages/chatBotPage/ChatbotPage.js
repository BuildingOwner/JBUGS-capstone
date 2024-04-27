import MainSidebar from "../../sidebar/MainSidebar";
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import styles from "./ChatbotPage.module.css";
import { useEffect } from "react";

const ChatbotPage = () => {
  const chatBoardScoll = () => {
    const chatUl = document.querySelector('#chatBoard');
    chatUl.scrollTop = chatUl.scrollHeight;
  }

  useEffect(() => {
    chatBoardScoll();
  }, []);

  return (
    <div className={styles.chatbotpage}>
      <MainSidebar />
      <main className={styles.boxWrapper}>
        <div className={styles.box}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <h3>AI Chat Hellper AI부기</h3>
              <div className={styles.selectedModel}>GPT 4 Turbo</div>
            </div>
            <div className={styles.topRight}>
              <h3>History</h3>
              <div className={styles.historyCount}>
                6 / 50
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomLeft}>
              <div id="chatBoard" className={`${styles.chatBoard} no-scroll-bar`}>
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
                <UserChatItem />
                <BotChatItem />
              </div>
              <div className={styles.chat}>
                <button type="button" className={`${styles.RegenerateBtn} btn btn-primary`}>
                  Regenerate response
                </button>
                <div className={styles.inputBtns}>
                  <button type="button" className="btn btn-primary">이미지</button>
                  <textarea className="form-control" placeholder="질문을 입력해주세요..."/>
                  <button type="submit" className="btn btn-primary">보내기</button>
                </div>
              </div>
            </div>
            <div className={styles.bottomRight}>
              <div className={`${styles.historys} no-scroll-bar`}>
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
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
                <HistoryItem />
              </div>
              <button type="button" className={`btn btn-primary deleteHistoryBtn`} style={{ height: 'fit-content', width: 'fit-content' }}>
                선택 삭제
              </button>
            </div>
          </div>
        </div>
      </main>
      {/* <main className="box-wrapper">
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
      </main> */}
    </div>
  );
};

export default ChatbotPage;
