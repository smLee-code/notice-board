
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import HomePage from './page/HomePage'
import LoginPage from './page/LoginPage'
import SignupPage from './page/SignupPage'
import BoardPage from "./page/BoardPage";
import React, {useState} from "react";
import UserLogInOut from "./component/UserLogInOut";


function App() {

    const [userData, setUserData] = useState({
        loginId : '',
        username : '',
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
                <Route path="/board" element={<BoardPage/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
