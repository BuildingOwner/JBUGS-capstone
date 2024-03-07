import './Login.css';
import LoginForm from './LoginForm';
import SchoolLink from './SchoolLink';
import Notice from './Notice';
import backgroundImg1 from '../../image/college.jpg';
import backgroundImg2 from '../../image/bugi.jpg';
import backgroundImg3 from '../../image/mirae.jpg';

const backgroundImgArr = [backgroundImg1, backgroundImg2, backgroundImg3]; // 무작위 배경화면 만들기
const randIndex = Math.floor(Math.random() * backgroundImgArr.length);
const backgroundImg = backgroundImgArr[randIndex];

const btnClicked = (e) => {};

const Login = () => {
  return (
    <div className="main" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="main-container">
        <div className="login-top">
          {/* 로그인폼 */}
          <LoginForm />
          {/* 학교링크 */}
          <SchoolLink />
        </div>
        {/* 학교 공지사항 */}
        <Notice />
      </div>
    </div>
  );
};

export default Login;
