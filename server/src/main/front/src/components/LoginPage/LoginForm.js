import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    const changeLoginId = (e) => {
        setLoginId(e.target.value);
        console.log(loginId);
    };

    const changePW = (e) => {
        setPassword(e.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        if (!loginId || !password) {
            alert('제대로 입력해주세요.');
            return;
        }

        axios
            .post('/api/login', {
                loginId: loginId,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.redirectURL) {
                    // 로그인 성공 시 메인 페이지로 리다이렉트
                    window.location.href = response.data.redirectURL;
                } else {
                    // 로그인 실패 시 에러 메시지 표시
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="login-left">
            <form onSubmit={submit}>
                <div className="login-form">
                    <div className="login">
                        <input
                            className="loginId"
                            placeholder=" 사용자 아이디"
                            onChange={changeLoginId}
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
