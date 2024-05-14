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
import LoadingPage from "../mainPage/LoadingPage";

const ChatbotPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const memberName = location.state.memberName
  const [studentId, setStudentId] = useState()
  const [chats, setChats] = useState([]); // 대화 데이터를 저장할 상태
  const [chatDtoList, setChatDtoList] = useState([])
  const [chatIdArray, setChatIdArray] = useState([]) // 챗룸 아이디의 배열 
  const [chatId, setChatId] = useState() // 챗룸 아이디  (초기 챗아이디 변경 필요)*****************
  const [text, setText] = useState()
  const [firstDo, setFirstDo] = useState(true)
  const [readOnly, setReadOnly] = useState(false)

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
      const formData = new FormData();
      formData.append('chat_id', chatId);
      const response = await axios.post("http://localhost:5000/regenerate", formData)
      console.log(response)

      // 서버로부터 받은 새로운 응답을 기존 chats 배열의 마지막 요소에 반영
      if (response.data && chats.length > 0) {
        const newChats = [...chats]
        const lastIndex = newChats.length - 1
        if (newChats[lastIndex].content && newChats[lastIndex].content.length > 0) {
          newChats[lastIndex].content[0].text = response.data
        }
        setChats(newChats) // 업데이트된 chats 배열로 상태 업데이트
      }
    } catch (error) {
      console.log(error)
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
    };

    const imageInput = document.getElementById('imageInput');
    if (imageInput.files) {
      for (let i = 0; i < imageInput.files.length; i++) {
        // 이미지 파일을 Base64 문자열로 변환
        const imageBase64 = await convertImageFileToBase64(imageInput.files[i]);
        // Base64 인코딩된 이미지 문자열을 채팅 객체에 추가
        chattings = {
          role: 'user',
          content: [{ text: text, image: imageBase64 }],
        };

      }
    }

    if (!Array.isArray(chats)) {
      setChats([chattings]);
    } else {
      setChats([...chats, chattings]);
    }


    const userText = text
    setText('')
    // 파일이 선택되지 않은 경우
    setFileDescription('')
    handleResizeHeight()

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

      const response = await fetch("http://localhost:5000/chat", {
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
    try {
      const response = await axios.delete(`/api/chat/${chatId}`)
      console.log("deleteChats reponse", response)

      // chatIdArray에서 현재 chatId를 제거합니다.
      const updatedChatIdArray = chatIdArray.filter(id => id !== chatId)
      setChatIdArray(updatedChatIdArray)

      // 현재 chatId의 인덱스를 찾습니다.
      const currentChatIndex = chatIdArray.findIndex(id => id === chatId)

      // 이전 chatId의 인덱스를 계산합니다. 만약 현재 chatId가 첫 번째였다면, 이전 chatId는 없으므로 0을 반환합니다.
      const prevChatIndex = currentChatIndex > 0 ? currentChatIndex - 1 : 0

      // 이전 chatId를 설정합니다. 만약 updatedChatIdArray가 비어 있다면, null을 설정합니다.
      const newCurrentChatId = updatedChatIdArray[prevChatIndex] || null
      setChatId(newCurrentChatId);

      if (newCurrentChatId !== null) {
        await fetchChattings(newCurrentChatId) // 새로운 현재 chatId에 해당하는 채팅 데이터 가져오기
      } else {
        setChats([]) // chatIdArray가 비어있다면 chats를 비움
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
      const chatIdArray = chatDto.map((chat) => chat.chatRoomId)
      console.log("chatIdArray : ", chatIdArray)

      setChatDtoList(chatDto)
      setStudentId(response.data.studentDto.studentId)
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

  const fetchDataAndChattings = async (selectedId) => { // 새로운 함수 추가
    const chatIdArray = await fetchChatData() // fetchChatData 호출 및 chatId 반환 대기
    if (chatIdArray && chatIdArray.length > 0 && firstDo === true) {
      // chatId가 유효하고, 배열에 요소가 있는 경우에만 fetchChattings 호출
      await fetchChattings(chatIdArray[0]) // fetchChattings 호출 및 첫 번째 chatId 전달
    } else if (chatIdArray.length === 0) {
      console.log("채팅방을 생성해주세요")
    }
    else {
      fetchChattings(selectedId)
    }
  }

  // useEffect(() => {
  //   if (firstDo === true) { // 처음 실행하면 1번 채팅룸 호출 (수정필요)
  //     fetchDataAndChattings(1)
  //     setFirstDo(false)
  //   } else {
  //     fetchDataAndChattings(chatId)
  //   }
  //   console.log(chatDtoList)
  // }, [chatId]);
  // useEffect(() => {
  //   const fetchDataAndChattings = async () => {
  //     const chatIdArray = await fetchChatData(); // chatId 배열을 가져옴
  //     if (chatIdArray && chatIdArray.length > 0) {
  //       // chatId가 유효하고, 배열에 요소가 있는 경우에만 첫 번째 요소를 chatId로 설정
  //       setChatId(chatIdArray[0]);
  //       await fetchChattings(chatIdArray[0]); // 해당 chatId에 대한 채팅 데이터 가져오기
  //     } else {
  //       console.log("채팅방을 생성해주세요");
  //     }
  //   };

  //   fetchDataAndChattings(); // fetchDataAndChattings 함수 호출

  //   console.log(chatDtoList);
  // }, [chatId]);
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


  // useEffect(() => {
  //   chatBoardScoll()
  // }, [chats])

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
                {chats?.map((chat, index) => {
                  // chat.content가 존재하며, 그 길이가 0보다 큰지 확인
                  const content = chat.content && chat.content.length > 0 ? chat.content[0] : null;

                  return chat.role === 'user' ? (
                    <UserChatItem
                      key={index}
                      // content가 null이 아니면 해당 값을 사용, 그렇지 않으면 안전한 기본값 사용
                      text={content ? content.text : ""}
                      image={content ? content.image : null}
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
                  <label htmlFor="imageInput" className={`btn btn-primary ${styles.chatBtn} ${styles.imageInputBtn}`}>
                    <LuImagePlus size={20} />
                    {fileDescription && <span className={styles.fileDescription}>{fileDescription}</span>}
                  </label>
                  <input type="file"
                    accept="image/*"
                    id="imageInput"
                    className={`form-control ${styles.imageInput}`}
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
                    className={`btn btn-primary ${styles.chatBtn}`}
                    onClick={sendMessage}
                  ><BsSend size={20} />
                  </button>
                </div>
                <button type="button"
                  className={`${styles.RegenerateBtn} btn btn-primary`}
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
