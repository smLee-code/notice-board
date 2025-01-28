
import React, {useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import HomePage     from './page/HomePage'
import LoginPage    from './page/LoginPage'
import SignupPage   from './page/SignupPage'
import WritingPostPage  from "./page/WritingPostPage";
import BoardPage    from "./page/BoardPage";
import PostPage     from "./page/PostPage";
import EditingPostPage  from "./page/EditingPostPage";


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
                    element={<WritingPostPage
                        userId={userData.id}
                    />}
                />
                <Route
                    path="/post/*"
                    element={<PostPage
                        userId={userData.id}
                    />}
                />
                <Route
                    path="/edit/*"
                    element={<EditingPostPage
                        userId={userData.id}
                    />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
