import LoginForm from "./LoginForm";
import "./LoginPage.css";
import logo from "../../image/hansungLogo.png";
import school from "../../image/mirae.jpg"
const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="left">
        <div className="logo">
          <img className="logo-icon" alt="logo" src={logo} />
        </div>
        <LoginForm />
      </div>
      <div className="right">
        <img className="schoolimg-icon" alt="school" src={school} />
      </div>
    </div>
  );
};

export default LoginPage;
