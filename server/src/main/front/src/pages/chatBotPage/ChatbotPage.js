import Sidebar from "../../sidebar/MainSidebars";
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import styles from "./ChatbotPage.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ChatbotPage = () => {
  const navigate = useNavigate()
  // const location = useLocation()
  const [chats, setChats] = useState([]); // 대화 데이터를 저장할 상태
  const [chatDtoList, setChatDtoList] = useState([])
  // const [chatRoomId, setChatRoomId] = useState([]) // 챗룸 아이디 배열
  const [chatId, setChatId] = useState(1) // 챗룸 아이디  (초기 챗아이디 변경 필요)*****************
  const [text, setText] = useState()
  const [firstDo, setFirstDo] = useState(true)
  const [readOnly, setReadOnly] = useState(false)

  const chatBoardScoll = () => {
    const chatUl = document.querySelector('#chatBoard');
    chatUl.scrollTop = chatUl.scrollHeight;
  }

  const changeRoomId = (selectedId) => {
    console.log("선택된 chat Room Id: ", selectedId)
    setChatId(selectedId)
    fetchChattings(selectedId)
  }

  const onChange = (e) => {
    setText(e.target.value);
  }

  //  수정 필요
  const newChatting = () => {
    console.log("new Chatting called : ", chatDtoList)

  }

  const keyUp = (e) => {
    if (e.key === 'Enter')
      sendMeesage()
  }
  const sendMeesage = async () => {
    console.log(true)
    setReadOnly(!readOnly)
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
      console.log("sendMessage.response : ", response)

      // 텍스트 필드 비워주기
      setText('');
      console.log("Response.data :", response.data);
      fetchChattings(chatId)

      console.log(false)
      setReadOnly(false)
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }
      
    }
  }


  const fetchChattings = async (chatRoomId) => { // chatRoomId 매개변수 추가
    try {
      const formData = new FormData();
      formData.append('chat_id', chatRoomId);
      const response = await axios.post(`http://localhost:5000/get-chat`, formData);
      console.log("fetchCahttings.response : ", response)

      const chatData = JSON.parse(response.data.chat_text);

      console.log("Chat data:", chatData);
      // console.log(chatData[0].content[0].text);
      setChats(chatData);

    } catch (error) {
      if (error.response.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }
    }
  }

  const fetchChatData = async () => {
    try {
      const response = await axios.get(`api/chat`, {
        withCredentials: true,
      })
      console.log("fetchChatData.response : ", response)
      const chatDto = response.data.chatDtoList.map((chat) => chat).flat()
      const chatId = chatDto.map((chat) => chat.chatRoomId).flat()

      console.log("chatBotPage의 response : ", response)
      console.log("chatDto : ", chatDto)
      console.log("chatRoomId : ", chatId)

      // setChatRoomId(chatId);
      setChatDtoList(chatDto)
      return chatId; // chatId 반환

    } catch (error) {
      if (error.response.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }
    }
  }

  const fetchDataAndChattings = async (selectedId) => { // 새로운 함수 추가
    console.log(selectedId)
    const chatId = await fetchChatData() // fetchChatData 호출 및 chatId 반환 대기
    if (chatId) { // chatId가 유효한 경우에만 fetchChattings 호출
      await fetchChattings(selectedId); // fetchChattings 호출 및 chatId 전달
    }
  }

  // 건들면 죽임
  useEffect(() => {
    chatBoardScoll()
    if (firstDo == true) { // 처음 실행하면 1번 채팅룸 호출 (수정필요)
      fetchDataAndChattings(1)
      setFirstDo(false)
    } else {
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
                  <textarea className="form-control" placeholder="질문을 입력해주세요..." value={text} onChange={onChange} onKeyUp={keyUp} readOnly={readOnly} />
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
              <button type="button" className={`btn btn-primary deleteHistoryBtn`} style={{ height: 'fit-content', width: 'fit-content' }}
                onClick={newChatting}>
                채팅 생성
              </button>
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
