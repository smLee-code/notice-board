
import React, {useState} from "react";
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";

import HomePage     from './page/HomePage'
import LoginPage    from './page/LoginPage'
import SignupPage   from './page/SignupPage'
import WritingPage  from "./page/WritingPage";
import BoardPage    from "./page/BoardPage";
import PostPage     from "./page/PostPage";
import EditingPage  from "./page/EditingPage";

import UserLogInOut from "./component/UserLogInOut";

function App() {

    const [userData, setUserData] = useState({
        id : 0,
        username : ''
    });


    return (
        <BrowserRouter>
            <UserLogInOut
                id={userData.id}
                username={userData.username}
                setUserData={setUserData}
            />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/login" element={<LoginPage setUserData={setUserData}/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/board" element={<BoardPage/>}/>
                <Route
                    path="/write"
                    element={<WritingPage
                        id={userData.id}
                    />}
                />
                <Route
                    path="/post/*"
                    element={<PostPage
                        id={userData.id}
                    />}
                />
                <Route
                    path="/edit/*"
                    element={<EditingPage
                        id={userData.id}
                    />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
