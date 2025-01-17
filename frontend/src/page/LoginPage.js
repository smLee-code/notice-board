
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInput from "../component/UserInput";
import axios from 'axios';


function LoginPage(props) {

    const navigate = useNavigate();

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

            if (response.status === 200) {
                //
                const { id, username } = response.data;
                props.setUserData({id, username});
                alert(`${username} 님이 로그인 하셨습니다.`);
                navigate('/');
            }
        } catch (err) {
            setError('로그인 실패: 아이디나 비밀번호를 확인하세요.');
        }

    };

    return (
        <div>
            <h1>로그인 페이지</h1>
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
