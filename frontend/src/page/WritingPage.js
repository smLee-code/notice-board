import UserInput from "../component/UserInput";
import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function WritingPage(props) {

    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title : '',
        content : ''
    });



    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setPostData({
            ...postData,
            [name] : value
        });
    };

    const handleSavePost = async () => {
        const requestData = {
            ...postData, // title, content
            id : props.id, // 유저 ID 추가
        };

        const response = await axios.post('http://localhost:8080/api/post/save', requestData);

        if (response.status === 200) {
            alert(response.data);
            navigate('/board');
        } else {
            alert(response.data);
        }
    }

    return (
        <>
            <h1>글쓰기 페이지</h1>
            <div>
                제목 : &nbsp;
                <UserInput
                    type='text'
                    placeholder='제목 입력'
                    size='50'
                    onChange={handleInputChange}
                    value={postData.title}
                    name='title'
                />
            </div>
            &nbsp;
            <div>
                내용 : &nbsp;
                <textarea
                    cols="50"
                    rows="20"
                    onChange={handleInputChange}
                    value={postData.content}
                    name='content'
                />
            </div>
            <button onClick={handleSavePost}>저장</button>
        </>
    );
}

export default WritingPage;