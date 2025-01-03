
import React, { useState } from "react";
import {Link} from "react-router-dom";
import UserInput from "../component/UserInput";


function LoginPage() {

    const [userData, setUserData] = useState({
            userId : '',
            userPw : '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData({
                ...userData,
                [name] : value,
        });
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
                value={userData.userId}
                name='userId'
            />
            <p>비밀번호 : </p>
            <UserInput
                type='text'
                placeholder='비밀번호'
                onChange={handleInputChange}
                value={userData.userPw}
                name='userPw'
            />

        </div>
    );
}

export default LoginPage;
