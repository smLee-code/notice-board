
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInput from "../component/UserInput";
import axios from "axios";

function SignupPage() {

    const navigate = useNavigate();

    const [registerData, setRegisterData] = useState({
        loginId : '',
        password : '',
        username : '',
        email : '',
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setRegisterData({
            ...registerData,
            [name] : value,
        });
    };

    const handleRegister = async () => {

        try {
            const response = await axios.post('http://localhost:8080/api/user/register', registerData);

            if (response.status === 200) {
                console.log(response.data);
                alert(response.data || '회원가입 성공!');
                navigate('/');
            }
        } catch (err) {
            console.error(err.response.data);
            setError('회원가입 실패 : ' + err.response.data);
        }
    }

    return (
        <div>
            <div>
                <h1>회원가입 페이지</h1>
                <p>아이디 : </p>
                <UserInput
                    type='text'
                    placeholder='아이디'
                    onChange={handleInputChange}
                    value={registerData.loginId}
                    name='loginId'
                />
                <p>비밀번호 : </p>
                <UserInput
                    type='text'
                    placeholder='비밀번호'
                    onChange={handleInputChange}
                    value={registerData.password}
                    name='password'
                />
                <p>닉네임 : </p>
                <UserInput
                    type='text'
                    placeholder='닉네임'
                    onChange={handleInputChange}
                    value={registerData.username}
                    name='username'
                />
                <p>이메일 : </p>
                <UserInput
                    type='text'
                    placeholder='이메일'
                    onChange={handleInputChange}
                    value={registerData.email}
                    name='email'
                />
                <div>
                    <button onClick={handleRegister}>회원가입</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <div>
                    <p>{registerData.loginId}</p>
                    <p>{registerData.password}</p>
                    <p>{registerData.username}</p>
                    <p>{registerData.email}</p>
                </div>
            </div>
        </div>
    );
}

export default SignupPage;
