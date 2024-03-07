import { useState } from 'react';
import axios from 'axios';
const LoginForm = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const changeId = (e) => {
    setId(e.target.value);
    console.log(id);
  };

  const changePW = (e) => {
    setPassword(e.target.value);
  };

  const submit = (e) => {
    e.preventDefault();
    // changeId();
    // changePW();
    if (!id || !password) {
      alert('제대로 입력해라');
    }
  };
  axios
    .post('/api/login', {
      id: id,
      password: password,
    })
    .then((response) => {
      console.log(response.data.id);
      console.log(response.data.password);
      if (response.data.email === undefined) {
        // id 일치하지 않는 경우 userId = undefined, msg = '입력하신 id 가 일치하지 않습니다.'
        console.log('======================', response.data.msg);
        alert('입력하신 id 가 일치하지 않습니다.');
      } else if (response.data.email === null) {
        // id는 있지만, pw 는 다른 경우 userId = null , msg = undefined
        console.log(
          '======================',
          '입력하신 비밀번호 가 일치하지 않습니다.',
        );
        alert('입력하신 비밀번호 가 일치하지 않습니다.');
      } else if (response.data.email === id) {
        // id, pw 모두 일치 userId = userId1, msg = undefined
        console.log('======================', '로그인 성공');
        sessionStorage.setItem('userId', id); // sessionStorage에 id를 user_id라는 key 값으로 저장
        sessionStorage.setItem('userPassword', password); // sessionStorage에 id를 user_id라는 key 값으로 저장
      }
      // 작업 완료 되면 페이지 이동(새로고침)
      document.location.href = '/';
    })
    .catch((err) => {
      console.log(err);
    });
  return (
    <div className="login-left">
      <form onSubmit={submit}>
        <div className="login-form">
          <div className="login">
            <input
              className="id"
              placeholder=" 사용자 아이디"
              onChange={changeId}
            />
            <input
              className="password"
              placeholder=" 비밀번호"
              type="password"
              onChange={changePW}
            />
          </div>
          <div className="button-div">
            <button className="login-button">로그인</button>
          </div>
        </div>
      </form>

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
  );
};

export default LoginForm;
