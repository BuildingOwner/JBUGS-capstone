import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "./LoginForm.css"

const LoginForm = () => {
  const navigate = useNavigate();
  const [loginId, setLoginId] = useState();
  const [password, setPassword] = useState();

  const changeId = (e) => {
    setLoginId(e.target.value)
  }
  const changePw = (e) => {
    setPassword(e.target.value)
  }


  const login = async () => {
    try {
      const response = await axios.post("/api/login", {
        loginId: loginId,
        password: password,
      })
      console.log("로그인 성공",response)
      const sessionId = response.data.sessionId; // 서버에서 받은 세션 ID
      document.cookie = `sessionId=${sessionId}; path=/`;
      console.log("세션 id: ",sessionId)
      // 로그인 성공 후 다음 페이지로 이동
      navigate("/main")
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div className="loginform">
      <div className="id">
        <div className="id1">ID</div>
        <div className="input">
          <input type="text" className="userID" placeholder="Enter your id.." onChange={changeId} />
        </div>
      </div>
      <div className="password">
        <div className="password1">Password</div>
        <div className="input1">
          <input type="password" className="userPassword" placeholder="Enter your password.." onChange={changePw} />
        </div>
      </div>
      <div className="idcheck">
        <div className="saveid">
          <input type="checkbox" className="saveIdBox" />
          <div className="id2">ID 저장</div>
        </div>
        <div className="div1">아이디/비밀번호 찾기</div>
      </div>
      <button type="submit" className="sign-in-wrapper" onClick={login}>
        <div className="sign-in">Sign in</div>
      </button>
    </div>
  );
}
export default LoginForm;