import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css"
const LoginForm = () => {
    const navigate = useNavigate();

    const onFrameContainerClick = useCallback(() => {
      navigate("/main");   
    }, [navigate]);
  
    return (
        <div className="loginform">
            <div className="id">
              <div className="id1">ID</div>
              <div className="input">
                <input type="text" className="userID" placeholder="Enter your id.."/>
              </div>
            </div>
            <div className="password">
              <div className="password1">Password</div>
              <div className="input1">
                <input type="password" className="userPassword" placeholder="Enter your password.."/>
              </div>
            </div>
            <div className="idcheck">
              <div className="saveid">
                <input type="checkbox" className="saveIdBox"/>
                <div className="id2">ID 저장</div>
              </div>
              <div className="div1">아이디/비밀번호 찾기</div>
            </div>
            <div className="sign-in-wrapper" onClick={onFrameContainerClick}>
              <div className="sign-in">Sign in</div>
            </div>
          </div>
    );
}
export default LoginForm;