import { useCallback } from "react";
import { useState } from "react";
import axios from 'axios';
import "./LoginForm.css";

const LoginForm = () => {
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');

    // const onFrameContainerClick = useCallback(() => {
    //     // Please sync "main_mono" to the project
    // }, []);
    const changeLoginId = (e) => {
        setLoginId(e.target.value);
    };

    const changePW = (e) => {
        setPassword(e.target.value);
    };


    const submit = (e) => {
        e.preventDefault();

        axios
            .post('/api/login', {
                loginId: loginId,
                password: password,
            })
            .then((response) => {
                console.log(response.data);
                if (response.data.redirectURL) {
                    // 로그인 성공 시 세션 정보 저장
                    localStorage.setItem('sessionID', response.data.sessionID);
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
        <div className="mid">
            <div className="title">
                <div className="e-class">한성대 E-class</div>
                <div className="div">소통으로 여는 혁신, 혁신으로 여는 내일</div>
            </div>
            <form className="loginform" onSubmit={submit}>
                <div className="id">
                    <div className="e-class">ID</div>
                    <div className="input">
                        <input type="text" placeholder="Enter your id.." className="inputText" onChange={changeLoginId}/>
                    </div>
                </div>
                <div className="id">
                    <div className="e-class">Password</div>
                    <div className="input">
                        <input type="password" placeholder="Enter your password.." className="inputText" onChange={changePW}/>
                    </div>
                </div>
                <div className="idcheck">
                    <div className="saveid">
                        <input type="checkbox" className="saveBtn" />
                        <div className="e-class">ID 저장</div>
                    </div>
                    <div className="e-class">아이디/비밀번호 찾기</div>
                </div>
                <div className="sign-in-wrapper">
                    <div className="e-class">Sign in</div>
                </div>
            </form>
            <div className="div2">
                <div className="e-class">한성대학교</div>
                <div className="e-class">종합정보시스템</div>
            </div>
        </div>
    );
};

export default LoginForm;
