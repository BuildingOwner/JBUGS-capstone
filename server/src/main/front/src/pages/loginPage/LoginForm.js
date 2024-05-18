import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./LoginForm.css"
import styles from "./LoginForm.module.css"

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();

  const changeId = (e) => {
    setLoginId(e.target.value)
  }
  const changePw = (e) => {
    setPassword(e.target.value)

    // 엔터 키가 눌렸는지 확인 (엔터 키의 keyCode는 13)
    if (e.key === 'Enter') {
      login();
    }
  }


  const login = async () => {
    try {
      const response = await axios.post("/api/login", {
        loginId: loginId,
        password: password,
      })
      console.log("로그인 성공", response)
      const sessionId = response.data.sessionId; // 서버에서 받은 세션 ID
      document.cookie = `sessionId=${sessionId}; path=/`;
      console.log("세션 id: ", sessionId)
      // 로그인 성공 후 다음 페이지로 이동
      navigate("/main")
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패")
    }
  };

  return (
    <div className={`loginform ${styles.loginform}`}>
      <div className="id">
        <div className="input">
          <input type="text" className={`userID`} placeholder="아이디" onChange={changeId} />
        </div>
      </div>
      <div className="password">
        <div className="input1">
          <input type="password" className={`userPassword`} placeholder="비밀번호" onChange={changePw} onKeyDown={changePw} />
        </div>
      </div>
      <div className="idcheck">
        <div className="saveid">
          <input type="checkbox" className={`saveIdBox form-check-input`} />
          <div className="id2">ID 저장</div>
        </div>
        <div className="div1">아이디/비밀번호 찾기</div>
      </div>
      <button type="submit" className={`sign-in-wrapper ${styles.signInBtn}`} onClick={login}>
        <div className="sign-in">로그인</div>
      </button>
    </div>
  );
}
export default LoginForm;