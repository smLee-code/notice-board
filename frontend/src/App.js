
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import WritingPage from "./page/WritingPage";
import BoardPage from "./page/BoardPage";
import PostPage from "./page/PostPage";

import UserLogInOut from "./component/UserLogInOut";

function App() {

    const [userData, setUserData] = useState({
        loginId : '',
        username : ''
    });

    return (
        <BrowserRouter>
            <UserLogInOut
                loginId={userData.loginId}
                username={userData.username}
                setUserData={setUserData}
            />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage setUserData={setUserData}/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route
                    path="/write"
                    element={<WritingPage
                        loginId={userData.loginId}
                        username={userData.username}
                    />}
                />
                <Route path="/board" element={<BoardPage/>}/>
                <Route path="/post" element={<PostPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
