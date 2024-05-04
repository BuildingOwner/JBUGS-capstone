import Sidebar from "../../sidebar/MainSidebars";
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import styles from "./ChatbotPage.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";

const ChatbotPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [studentId, setStudentId] = useState()
  const [chats, setChats] = useState([]); // 대화 데이터를 저장할 상태
  const [chatDtoList, setChatDtoList] = useState([])
  const [chatIdArray, setChatIdArray] = useState([]) // 챗룸 아이디의 배열 
  const [chatId, setChatId] = useState(1) // 챗룸 아이디  (초기 챗아이디 변경 필요)*****************
  const [text, setText] = useState()
  const [firstDo, setFirstDo] = useState(true)
  const [readOnly, setReadOnly] = useState(false)
  // React 상태 관리를 위한 Hooks
  const [isSending, setIsSending] = useState(false);

  const textareaRef = useRef(null);
  const chatBoardRef = useRef(null);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const textareaWrapperRef = useRef(null);

  const handleResizeHeight = () => {
    const textarea = textareaRef.current;
    const chatBoard = chatBoardRef.current;
    const bottom = bottomRef.current
    const chat = chatRef.current
    const textareaWrapper = textareaWrapperRef.current

    if (textarea) {
      textarea.style.height = "auto"; // height 초기화
      textarea.style.height = textarea.scrollHeight + "px"; // 스크롤 높이만큼 늘리기
      textareaWrapper.scrollTop = textareaWrapper.scrollHeight;
      chatBoard.style.height = "auto"
      chatBoard.style.height = bottom.scrollHeight - chat.scrollHeight + "px"; // 스크롤 높이만큼 늘리기
    }

    chatBoardScoll()
  };

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

  const newChatting = async () => {
    console.log("new Chatting called : ", chatDtoList)
    await makeNewChat()
    await fetchChatData()
  }

  const makeNewChat = async () => {
    try {
      const response = await axios.post("/api/chat", {
        studentId: studentId
      })
      console.log("makeNewChat의 response : ", response)
      await fetchChatData(); // 이 함수가 내부적으로 chatDtoList 상태를 업데이트해야 합니다.
      const newChatId = response.data.chatRoomId;

      // 새로운 채팅 아이디로 chatId 상태 업데이트
      setChatId(newChatId)
    } catch (error) {

    }
  }

  const keyUp = (e) => {
    // 메시지 전송 중이 아니고, 엔터키가 눌렸으며, shift키가 눌리지 않았을 경우에만 sendMessage 함수를 호출
    if (text.trim() !== "" && !isSending && e.key === "Enter" && !e.shiftKey) {
      sendMessage();
    }
    handleResizeHeight();
  };

  const sendMessage = async () => {
    setIsSending(true);
    setReadOnly(true)
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
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }

    } finally {
      // 함수 처리가 완료된 후 readOnly를 false로 설정하여 입력을 다시 가능하게 함
      setReadOnly(false);
      setIsSending(false);
    }
  }
  const deleteChats = async () => {
    try {
      const response = await axios.delete(`/api/chat/${chatId}`)
      console.log("deleteChats reponse", response)

      // chatIdArray에서 현재 chatId를 제거합니다.
      const updatedChatIdArray = chatIdArray.filter(id => id !== chatId);
      setChatIdArray(updatedChatIdArray);

      // 현재 chatId의 인덱스를 찾습니다.
      const currentChatIndex = chatIdArray.findIndex(id => id === chatId);

      // 이전 chatId의 인덱스를 계산합니다. 만약 현재 chatId가 첫 번째였다면, 이전 chatId는 없으므로 0을 반환합니다.
      const prevChatIndex = currentChatIndex > 0 ? currentChatIndex - 1 : 0;

      // 이전 chatId를 설정합니다. 만약 updatedChatIdArray가 비어 있다면, null을 설정합니다.
      const newCurrentChatId = updatedChatIdArray[prevChatIndex] || null;
      setChatId(newCurrentChatId);

      if (newCurrentChatId !== null) {
        await fetchChattings(newCurrentChatId); // 새로운 현재 chatId에 해당하는 채팅 데이터 가져오기
      } else {
        setChats([]); // chatIdArray가 비어있다면 chats를 비움
      }
    } catch (error) {

    }
  }

  const fetchChattings = async (chatRoomId) => { // chatRoomId 매개변수 추가
    try {
      const formData = new FormData();
      formData.append('chat_id', chatRoomId);
      const response = await axios.post(`http://localhost:5000/get-chat`, formData);
      console.log("fetchCahttings response : ", response)

      const chatData = JSON.parse(response.data.chat_text);

      console.log("Chat data:", chatData);

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
      const chatDto = response.data.chatDtoList.map((chat) => chat)
      const chatId = chatDto.map((chat) => chat.chatRoomId)
      const chatIdArray = chatDto.map((chat) => chat.chatRoomId)
      console.log("chatIdArray : ", chatIdArray)

      setChatDtoList(chatDto)
      setStudentId(response.data.studentDto.studentId)
      setChatIdArray(chatIdArray)
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
    const chatId = await fetchChatData() // fetchChatData 호출 및 chatId 반환 대기
    if (chatId) { // chatId가 유효한 경우에만 fetchChattings 호출
      await fetchChattings(selectedId); // fetchChattings 호출 및 chatId 전달
    }
  }

  // 건들면 죽임
  useEffect(() => {
    if (firstDo == true) { // 처음 실행하면 1번 채팅룸 호출 (수정필요)
      fetchDataAndChattings(1)
      setFirstDo(false)
    } else {
      fetchDataAndChattings(chatId)
    }
    console.log(chatDtoList)
  }, [chatId]);

  useEffect(() => {
    chatBoardScoll()
  }, [chats])

  return (
    <div className={`background`}>
      <Sidebar
      // enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto}
      />
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
          <div className={styles.bottom} ref={bottomRef}>
            <div className={styles.bottomLeft}>
              <div id="chatBoard" className={`${styles.chatBoard} no-scroll-bar`} ref={chatBoardRef}>
                {
                  (
                    chats?.map((chat, index) => (
                      chat.role === 'user' ?
                        <UserChatItem
                          key={index}
                          text={chat.content[0].text}
                        /> :
                        <BotChatItem
                          key={index}
                          text={chat.content[0].text}
                        />
                    ))
                  )}
              </div>
              <div className={styles.chat} ref={chatRef}>
                <div className={styles.inputBtns}>
                  <button type="button" className={`btn btn-primary ${styles.chatBtn}`}><LuImagePlus size={20} /></button>
                  <div className={styles.textareaWrapper} ref={textareaWrapperRef}>
                    <textarea
                      ref={textareaRef}
                      rows={1}
                      className="form-control"
                      placeholder="질문을 입력해주세요..."
                      value={text}
                      onChange={onChange}
                      onKeyUp={keyUp}
                      readOnly={readOnly} // 이 부분에 readOnly 상태를 적용합니다.
                      style={{ overflowY: "hidden" }} // 세로 스크롤 제거
                    />
                  </div>
                  <button type="submit"
                    className={`btn btn-primary ${styles.chatBtn}`}
                    onClick={sendMessage}
                  ><BsSend size={20} />
                  </button>
                </div>
                <button type="button" className={`${styles.RegenerateBtn} btn btn-primary`}>
                  Regenerate response
                </button>
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
                    selectedId={chatId}
                  />
                ))}
              </div>
              <button type="button" className={`btn btn-primary ${styles.historyBtn}`} style={{ height: 'fit-content', width: 'fit-content' }}
                onClick={newChatting}>
                채팅 생성
              </button>
              <button type="button" className={`btn btn-primary ${styles.historyBtn}`} style={{ height: 'fit-content', width: 'fit-content' }}
                onClick={deleteChats}>
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
