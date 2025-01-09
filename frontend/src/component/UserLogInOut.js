import React, {useState} from "react";
import { BrowserRouter, Link, useNavigate} from 'react-router-dom';

const UserLogInOut = (props) => {

    const navigate = useNavigate();

    const handleLogOut = () => {

        props.setUserData({
            loginId : '',
            username : ''
        });

        navigate('/');
    }

    if (props.loginId !== '') {
        return (
            <>
                <Link to='/'>홈</Link>
                &nbsp; | &nbsp;
                {props.username}님 환영합니다. &nbsp;
                <button onClick={handleLogOut}>로그아웃</button>
                <hr/>
            </>
        );
    }
    else {
        return (
            <>
                <Link to='/'>홈</Link>
                &nbsp; | &nbsp;
                <Link to='/login' setUserData={props.setUserData}>로그인</Link>
                &nbsp; | &nbsp;
                <Link to='/signup'>회원가입</Link>
                <hr/>
            </>
        );
    }
};

export default UserLogInOut;