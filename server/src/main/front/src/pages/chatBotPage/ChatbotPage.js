import Sidebar from "../../sidebar/MainSidebars";
import BotChatItem from "./BotChatItem";
import UserChatItem from "./UserChatItem"
import HistoryItem from "./HistoryItem";
import styles from "./ChatbotPage.module.css";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsSend } from "react-icons/bs";
import { LuImagePlus } from "react-icons/lu";
import LoadingPage from "../mainPage/LoadingPage";

const ChatbotPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const memberName = location.state.memberName
  const [memberId, setMemberId] = useState()
  const [chats, setChats] = useState([]); // 대화 데이터를 저장할 상태
  const [chatDtoList, setChatDtoList] = useState([])
  const [chatIdArray, setChatIdArray] = useState([]) // 챗룸 아이디의 배열 
  const [chatId, setChatId] = useState() // 챗룸 아이디  (초기 챗아이디 변경 필요)*****************
  const [text, setText] = useState()
  const [firstDo, setFirstDo] = useState(true)
  const [readOnly, setReadOnly] = useState(false)
  const [selectedChatIds, setSelectedChatIds] = useState([]); // 선택된 채팅방 ID들을 관리하는 상태

  // React 상태 관리를 위한 Hooks
  const [isSending, setIsSending] = useState(false);

  const [fileDescription, setFileDescription] = useState('');

  const handleFileChange = (event) => {
    const files = event.target.files;
    const fileCount = files.length;

    if (fileCount === 1) {
      // 파일이 하나만 선택된 경우, 파일 이름을 표시
      setFileDescription(files[0].name);
    } else if (fileCount > 1) {
      // 여러 파일이 선택된 경우, "파일 n개" 형식으로 표시
      setFileDescription(`이미지 ${fileCount}개`);
    } else {
      // 파일이 선택되지 않은 경우
      setFileDescription('');
    }
  }

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
    const chatUl = chatBoardRef.current;
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
        memberId: memberId
      })
      console.log("makeNewChat의 response : ", response)
      await fetchChatData(); // 이 함수가 내부적으로 chatDtoList 상태를 업데이트해야 합니다.
      const newChatId = response.data.chatRoomId;

      // 새로운 채팅 아이디로 chatId 상태 업데이트
      setChatId(newChatId)
    } catch (error) {

    }
  }

  const keyUp = async (e) => {
    // 메시지 전송 중이 아니고, 엔터키가 눌렸으며, shift키가 눌리지 않았을 경우에만 sendMessage 함수를 호출
    if (text?.trim() !== "" && !isSending && e.key === "Enter" && !e.shiftKey) {
      await sendMessage()
      await fetchChatData()
    }
    handleResizeHeight()
  }

  const regenerateResponse = async () => {
    try {
      setIsSending(true)
      setReadOnly(true)

      const formData = new FormData();
      formData.append('chat_id', chatId);

      // Fetch API를 사용하여 POST 요청 보내기
      const response = await fetch("http://43.200.202.59:5000/aimodule/regenerate", {
        method: 'POST',
        body: formData
      });

      // 스트림 데이터를 읽기 위해 body 사용
      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = '';
      let done = false;

      // 새로운 chats 배열을 복사하여 업데이트 준비
      const newChats = [...chats];
      const lastIndex = newChats.length - 1;

      // 마지막 채팅을 초기화
      if (newChats[lastIndex].content && newChats[lastIndex].content.length > 0) {
        newChats[lastIndex].content[0].text = '';
      }

      while (!done) {
        // 스트림의 다음 청크(chunk) 읽기
        const { value, done: streamDone } = await reader.read();
        done = streamDone;

        // 청크 데이터를 문자열로 변환
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          result += chunk;

          // 한 글자씩 업데이트
          if (newChats[lastIndex].content && newChats[lastIndex].content.length > 0) {
            newChats[lastIndex].content[0].text += chunk;
            setChats([...newChats]); // 상태 업데이트
          }
        }
      }

      // 최종 결과를 전체 텍스트로 업데이트
      if (newChats[lastIndex].content && newChats[lastIndex].content.length > 0) {
        newChats[lastIndex].content[0].text = result;
        setChats(newChats); // 상태 업데이트
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsSending(false)
      setReadOnly(false)
    }
  }

  // 이미지 파일을 Base64 문자열로 변환하는 함수
  const convertImageFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  const sendMessage = async () => {
    setIsSending(true);
    setReadOnly(true);

    let chattings = {
      role: 'user',
      content: [{ text: text }],
    }

    const imageInput = document.getElementById('imageInput')

    if (imageInput.files) {
      for (let i = 0; i < imageInput.files.length; i++) {
        // 이미지 파일을 Base64 문자열로 변환
        const imageBase64 = await convertImageFileToBase64(imageInput.files[i]);
        // 이미지를 새로 추가하거나 기존 이미지 배열에 추가하는 로직
        let imageContent = chattings.content.find(c => c.image);
        if (!imageContent) {
          // 이미지 정보가 없는 경우, 새로운 이미지 정보를 content 배열에 추가
          chattings.content.push({ image: [imageBase64] });
        } else {
          // 이미지 정보가 이미 있는 경우, 해당 배열에 새로운 이미지 정보 추가
          imageContent.image.push(imageBase64);
        }
        console.log("chattings", chattings)
      }
    }

    if (!Array.isArray(chats)) {
      setChats([chattings]);
    } else {
      setChats([...chats, chattings]);
    }

    const userText = text
    setText('')
    handleResizeHeight()
    // 파일이 선택되지 않은 경우
    setFileDescription('')

    try {
      const formData = new FormData();
      formData.append('question', userText);
      formData.append('chat_id', chatId);

      // 이미지 파일을 FormData에 추가
      const imageInput = document.getElementById('imageInput');
      if (imageInput.files) {
        for (let i = 0; i < imageInput.files.length; i++) {
          // 이미지 파일을 'image_0', 'image_1' 등의 키로 추가
          formData.append(`image_${i}`, imageInput.files[i]);
        }
      }

      const response = await fetch("http://43.200.202.59:5000/aimodule/chat", {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      // 성공적으로 파일을 전송한 후, 입력 필드 초기화
      document.getElementById('imageInput').value = '';

      const reader = response.body.getReader();
      let completeMessage = ""; // 누적된 메시지를 저장하기 위한 변수
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        setChats((chats) => {
          // chats가 null이면 빈 배열로 처리
          const currentChats = chats || [];

          if (currentChats.length > 0 && currentChats[currentChats.length - 1].role === 'assistant') {
            // 기존 로직
            const updatedChat = {
              ...currentChats[currentChats.length - 1],
              content: [{ text: currentChats[currentChats.length - 1].content[0].text + text }],
            };
            return [...currentChats.slice(0, -1), updatedChat];
          } else {
            const newChat = {
              role: 'assistant',
              content: [{ text: text }],
            };
            return [...currentChats, newChat];
          }
        });
      }

    } catch (error) {
      // 오류 처리...
    } finally {
      setIsSending(false)
      setReadOnly(false)
    }
  }

  const deleteChats = async () => {
    if (selectedChatIds.length === 0) {
      console.warn("No chats selected for deletion.");
      return;
    }

    try {
      const response = await axios.delete(`/api/chat`, { data: selectedChatIds });
      console.log("deleteChats response", response);

      // chatIdArray에서 선택된 모든 chatId를 제거합니다.
      const updatedChatIdArray = chatIdArray.filter(id => !selectedChatIds.includes(id));
      setChatIdArray(updatedChatIdArray);

      //chatDtoList를 업데이트시켜 HistoryItem 리렌더링
      const updatedChatDtoList = chatDtoList.filter(chat => !selectedChatIds.includes(chat.chatRoomId));
      setChatDtoList(updatedChatDtoList);

      // 확인: 삭제된 채팅방 중 현재 선택된 채팅방(chatId)도 포함되어 있으면 새로운 채팅방 선택
      let newCurrentChatId = null;
      if (selectedChatIds.includes(chatId)) {
        // 현재 선택된 chatId가 삭제된 경우, 적절한 채팅방 선택 로직
        const currentChatIndex = chatIdArray.findIndex(id => id === chatId);
        const newChatIndex = currentChatIndex > 0 ? currentChatIndex - 1 : 0;
        newCurrentChatId = updatedChatIdArray[newChatIndex] || null;
      } else {
        newCurrentChatId = chatId; // 현재 선택된 chatId 유지
      }
      setChatId(newCurrentChatId);

      // 새로운 chatId에 대한 채팅 데이터 가져오기 또는 chatIdArray가 empty 인 경우 chat 비움
      if (newCurrentChatId !== null) {
        await fetchChattings(newCurrentChatId);
      } else {
        setChats([]); // chatIdArray가 비어있다면 chats를 비움
      }
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
  };

  const toggleChatSelection = (chatRoomId) => {
    setSelectedChatIds(prev => {
      if (prev.includes(chatRoomId)) {
        return prev.filter(id => id !== chatRoomId);
      } else {
        return [...prev, chatRoomId];
      }
    });
  };

  const fetchChattings = async (chatRoomId) => { // chatRoomId 매개변수 추가
    try {
      const formData = new FormData();
      formData.append('chat_id', chatRoomId);
      const response = await axios.post(`http://43.200.202.59:5000/aimodule/get-chat`, formData);
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
      const chatIdArray = chatDto.map((chat) => chat.chatRoomId)
      console.log("chatIdArray : ", chatIdArray)

      setChatDtoList(chatDto)
      setMemberId(response.data.memberInfoDto.memberId)
      setChatIdArray(chatIdArray)
      return chatIdArray; // chatId 배열 반환

    } catch (error) {
      if (error.response.status === 401) {
        navigate("/")
      } else {
        // 다른 종류의 오류 발생
        console.error(error);
      }
    }
  }
  useEffect(() => {
    const fetchDataAndChattings = async () => {
      const chatIdArray = await fetchChatData(); // chatId 배열을 가져옴
      if (chatIdArray && chatIdArray.length > 0) {
        if (!chatId || firstDo) { // chatId가 없거나 첫 실행인 경우
          setChatId(chatIdArray[0]); // 첫 번째 요소를 chatId로 설정
          setFirstDo(false); // 첫 실행이 끝났음을 표시
        } else {
          setChatId(chatId); // 기존의 chatId를 유지
        }
        await fetchChattings(chatId); // 해당 chatId에 대한 채팅 데이터 가져오기
      } else {
        console.log("채팅방을 생성해주세요");
      }
    };

    fetchDataAndChattings(); // fetchDataAndChattings 함수 호출

    console.log(chatDtoList);
  }, [chatId, firstDo]); // chatId 또는 firstDo가 변경될 때마다 useEffect를 실행


  useEffect(() => {
    chatBoardScoll()
  }, [chats])

  // if (!chats) return <LoadingPage />;

  return (
    <div className={`background`}>
      <Sidebar
      // enrollmentId={enrollmentId} lectureName={lectureName} division={division} memberInfoDto={memberInfoDto}
      />
      <div className={`mycontainer`}>
        <div className={`bg ${styles.bg}`}>
          <div className={styles.top}>
            <div className={styles.topLeft}>
              <h3 style={{ fontWeight: "bold" }}>AI 부기</h3>
              <div className={styles.selectedModel}><b>Powered by GPT-4o</b></div>
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
                {chats?.map((chat, index) => {
                  // chat.content가 존재하며, 그 길이가 0보다 큰지 확인
                  const content = chat.content && chat.content.length > 0 ? chat.content[0] : null;

                  return chat.role === 'user' ? (
                    <UserChatItem
                      key={index}
                      // content가 null이 아니면 해당 값을 사용, 그렇지 않으면 안전한 기본값 사용
                      text={content ? chat.content[0].text : ""}
                      image={chat.content[1]?.image ? chat.content[1].image : null}
                      memberName={memberName}
                    />
                  ) : (
                    <BotChatItem
                      key={index}
                      text={content ? content.text : ""}
                    />
                  );
                })}
              </div>
              <div className={styles.chat} ref={chatRef}>
                <div className={styles.inputBtns}>
                  <label htmlFor="imageInput" className={`btn btn-primary ${styles.chatBtn} ${styles.imageInputBtn} ${readOnly ? "disabled" : null}`}>
                    <LuImagePlus size={20} />
                    {fileDescription && <span className={styles.fileDescription}>{fileDescription}</span>}
                  </label>
                  <input type="file"
                    accept="image/*"
                    id="imageInput"
                    className={`form-control ${styles.imageInput} ${readOnly ? "disabled" : null}`}
                    onChange={handleFileChange}
                    multiple></input>
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
                    className={`btn btn-primary ${styles.chatBtn} ${readOnly ? "disabled" : null}`}
                    onClick={sendMessage}
                  ><BsSend size={20} />
                  </button>
                </div>
                <button type="button"
                  className={`${styles.RegenerateBtn} btn btn-primary ${readOnly ? "disabled" : null}`}
                  onClick={regenerateResponse}>
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
                    isSelected={selectedChatIds.includes(chat.chatRoomId)}
                    onSelectionChange={toggleChatSelection}
                  />
                ))}
              </div>
              <button type="button"
                className={`btn btn-primary ${styles.historyBtn}`}
                style={{ height: 'fit-content', width: 'fit-content' }}
                onClick={newChatting}>
                채팅 생성
              </button>
              <button type="button"
                className={`btn btn-primary ${styles.historyBtn}`}
                style={{ height: 'fit-content', width: 'fit-content' }}
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
