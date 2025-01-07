
import React, { useState } from "react";
import {Link} from "react-router-dom";
import UserInput from "../component/UserInput";
import axios from 'axios';


function LoginPage() {

    const [loginData, setLoginData] = useState({
        loginId : '',
        password : '',

    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setLoginData({
                ...loginData,
                [name] : value,
        });
    };

    const handleLogin = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/user/login', loginData);

            // 성공적인 로그인 처리
            if (response.status === 200) {
                alert('로그인 성공!');
                // 토큰 저장 또는 리다이렉트 처리
            }
        } catch (err) {
            // 실패 시 에러 처리
            setError('로그인 실패: 아이디나 비밀번호를 확인하세요.');

        }

    };


    return (
        <div>
            <h1>로그인 페이지</h1>
            <Link to='/'>홈</Link>
            <p>아이디 : </p>
            <UserInput
                type='text'
                placeholder='아이디'
                onChange={handleInputChange}
                value={loginData.loginId}
                name='loginId'
            />
            <p>비밀번호 : </p>
            <UserInput
                type='text'
                placeholder='비밀번호'
                onChange={handleInputChange}
                value={loginData.password}
                name='password'
            />
            <div>
                <button onClick={handleLogin}>로그인</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
        </div>
    );
}

export default LoginPage;
