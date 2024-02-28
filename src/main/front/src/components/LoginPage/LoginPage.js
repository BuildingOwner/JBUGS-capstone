import './LoginPage.css';

import backgroundImg1 from '../../image/college.jpg';
import backgroundImg2 from '../../image/bugi.jpg';
import backgroundImg3 from '../../image/mirae.jpg';
import { Icon } from '@iconify/react';

const backgroundImgArr = [backgroundImg1, backgroundImg2, backgroundImg3]; // 무작위 배경화면 만들기
const randIndex = Math.floor(Math.random() * backgroundImgArr.length);
const backgroundImg = backgroundImgArr[randIndex];

const LoginPage = () => {
  return (
    <div className="main" style={{ backgroundImage: `url(${backgroundImg})` }}>
      <div className="main-container">
        <div className="login-top">
          <div className="login-left">
            {/* 로그인폼 */}
            <div className="login-form">
              <div className="login">
                <input className="id" placeholder=" 사용자 아이디"></input>
                <input
                  className="password"
                  placeholder=" 비밀번호"
                  type="password"
                ></input>
              </div>
              <div className="button-div">
                <button className="login-button">로그인</button>
              </div>
            </div>
            {/* 아이디 저장 */}
            <div className="saveId">
              <input className="check-box" type="checkbox" />
              <p>아이디 저장</p>
            </div>
            {/* 비밀번호 찾기 */}
            <div className="find-id">
              <p>아이디/비밀번호 찾기</p>
            </div>
          </div>

          <div className="login-right">
            {/* 학교링크 */}
            <div className="university-link">
              <Icon
                icon="icon-park-twotone:school"
                style={{ color: '#3B469C' }}
                width="1.6rem"
                height="1.6rem"
              />
              <div>한성대학교</div>
            </div>
            <div className="hansungInfo-link">
              <Icon
                icon="eos-icons:system-ok-outlined"
                style={{ color: '#3B469C' }}
                width="1.6rem"
                height="1.6rem"
              />
              <div>종합정보시스템</div>
            </div>
            <div className="hsel-link">
              <Icon
                icon="majesticons:book-line"
                style={{ color: '#3B469C' }}
                width="1.6rem"
                height="1.6rem"
              />
              <div>학술정보관</div>
            </div>
            <div className="nsso-link">
              <Icon
                icon="pepicons-pencil:internet"
                style={{ color: '#3B469C' }}
                width="1.6rem"
                height="1.6rem"
              />
              <div>한성인트라넷</div>
            </div>
            <div className="mail-link">
              <Icon
                icon="octicon:mail-24"
                style={{ color: '#3B469C' }}
                width="1.6rem"
                height="1.6rem"
              />
              <div>한성웹메일</div>
            </div>
          </div>
        </div>
        <div className="notice">
          {/* 학교 공지사항 */}
          <div className="title-wrap">
            <h1 className="notice-title">공지사항</h1>
            <button className="more-button">
              <Icon icon="ic:round-plus" width="1.6rem" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
