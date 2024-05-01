import Sidebar from "../../sidebar/sidebars";
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import styles from "./ChatbotPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useLocation } from "react-router-dom";

const ChatbotPage = () => {
  const location = useLocation()
  const [chats, setChats] = useState([]); // 대화 데이터를 저장할 상태
  const [chatDtoList, setChatDtoList] = useState([])
  const [chatRoomId, setChatRoomId] = useState([]) // 챗룸 아이디 배열
  const [chatId, setChatId] = useState() // 챗룸 아이디 
  const [text, setText] = useState()
  const [firstDo, setFirstDo] = useState(true)

  const chatBoardScoll = () => {
    const chatUl = document.querySelector('#chatBoard');
    chatUl.scrollTop = chatUl.scrollHeight;
  }

  const changeRoomId = (selectedId) => {
    console.log("선택된 chat Room Id: ", selectedId)
    setChatId(selectedId)
    fetchChattings(selectedId)
  }

  function onChange(e) {
    setText(e.target.value);
  }

  const sendMeesage = async () => {
    // Axios 구성 생성
    const axiosInstance = axios.create({
      withCredentials: true,
      credentials: 'include',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    console.log("text : ", text)
    console.log("chatRoomId : ", chatId)
    try {
      const formData = new FormData();
      formData.append('question', text);
      formData.append('chat_id', chatId);

      const response = await axiosInstance.post("http://localhost:5000/chat", formData);
      // 텍스트 필드 비워주기
      setText('');
      console.log("Response.data :", response.data);
      fetchChattings(chatId)
      // 여기에서 응답 처리
    } catch (error) {
      console.error("Error sending message:", error);
      // 에러 처리
    }
  }

  const fetchChattings = async (chatRoomId) => { // chatRoomId 매개변수 추가
    try {
      const formData = new FormData();
      formData.append('chat_id', chatId);
      const response = await axios.post(`http://localhost:5000/get-chat`, formData);

      const chatData = JSON.parse(response.data.chat_text);

      console.log("Chat data:", chatData);
      // console.log(chatData[0].content[0].text);
      setChats(chatData);

    } catch (error) {
      console.error("Error fetching chat data:", error);
    }
  }

  const fetchChatData = async () => {
    try {
      const response = await axios.get(`api/chat`, {
        withCredentials: true,
      })

      const chatDto = response.data.chatDtoList.map((chat) => chat).flat()
      const chatId = chatDto.map((chat) => chat.chatRoomId).flat()

      console.log("chatBotPage의 response : ", response)
      console.log("chatDto : ", chatDto)
      console.log("chatRoomId : ", chatId)

      setChatRoomId(chatId);
      setChatDtoList(chatDto);
      return chatId; // chatId 반환

    } catch (error) {
      console.error("Error fetching chat data:", error);
      return null; // 에러 발생 시 null 반환
    }
  }

  const fetchDataAndChattings = async (selectedId) => { // 새로운 함수 추가
    console.log(selectedId)
    const chatId = await fetchChatData(); // fetchChatData 호출 및 chatId 반환 대기
    if (chatId) { // chatId가 유효한 경우에만 fetchChattings 호출
      await fetchChattings(selectedId); // fetchChattings 호출 및 chatId 전달
    }
  }
  useEffect(() => {
    chatBoardScoll()
    // 수정 필요
    if (firstDo == true) {
      fetchDataAndChattings(1)
      setFirstDo(false)
    } else {
      console.log("firstDo : ", firstDo)
      fetchDataAndChattings(chatId)
    }
  }, [chatId]);

  return (
    <div className={`background`}>
      <Sidebar />
      <div className={`mycontainer`}>
        <div className={`bg ${styles.bg}`}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <h3>AI Chat Hellper AI부기</h3>
              <div className={styles.selectedModel}>GPT 4 Turbo</div>
            </div>
            <div className={styles.topRight}>
              <h3>History</h3>
              <div className={styles.historyCount}>
                {chatDtoList?.length} / 50
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <div className={styles.bottomLeft}>
              <div id="chatBoard" className={`${styles.chatBoard} no-scroll-bar`}>
                {chats.length > 0 && (
                  chats.map((chat, index) => (
                    chat.role === 'user' ?
                      <UserChatItem
                        key={index}
                        props={chat.content[0].text}
                      /> :
                      <BotChatItem
                        key={index}
                        props={chat.content[0].text}
                      />
                  ))
                )}
              </div>
              <div className={styles.chat}>
                <button type="button" className={`${styles.RegenerateBtn} btn btn-primary`}>
                  Regenerate response
                </button>
                <div className={styles.inputBtns}>
                  <button type="button" className="btn btn-primary">이미지</button>
                  <textarea className="form-control" placeholder="질문을 입력해주세요..." value={text} onChange={onChange} />
                  <button type="submit" className="btn btn-primary" onClick={sendMeesage}>보내기</button>
                </div>
              </div>
            </div>
            <div className={styles.bottomRight}>
              <div className={`${styles.historys} no-scroll-bar`}>
                {chatDtoList.map((chat, i) => (
                  <HistoryItem
                    key={i}
                    changeRoomId={changeRoomId}
                    chatRoomId={chat.chatRoomId}
                    chatRoomName={chat.chatRoomName}
                  />
                ))}
              </div>
              <button type="button" className={`btn btn-primary deleteHistoryBtn`} style={{ height: 'fit-content', width: 'fit-content' }}>
                선택 삭제
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
