
import LoginForm from "./LoginForm"
import "./LoginPage.css";

const LoginPage = () => {
  
  return (
    <div className="login-page">
      <div className="left">
        <div className="logo">
          <img className="logo-icon" alt="" src="/logo@2x.png" />
        </div>
        <div className="mid">
          <div className="title1">
            <div className="e-class">한성대 E-class</div>
            <div className="div">소통으로 여는 혁신, 혁신으로 여는 내일</div>
          </div>
          <LoginForm />
          <div className="div2">
            <div className="div3">한성대학교</div>
            <div className="div4">종합정보시스템</div>
          </div>
        </div>
      </div>
      <div className="right">
        <img className="schoolimg-icon" alt="" src="/schoolimg@2x.png" />
      </div>
    </div>
  );
};

export default LoginPage;
