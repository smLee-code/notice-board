import UserInput from "../component/UserInput";
import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";


function EditingPage(props) {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [postData, setPostData] = useState({
        title : '',
        content : ''
    });

    const post_id = searchParams.get('id');

    const getPostData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/post/${post_id}`);
            setPostData(response.data);
        } catch (error) {
            console.error("에러 : 해당 포스트가 존재하지 않습니다.:", error);
        }
    }

    useEffect(() => {
        if (post_id) {
            getPostData();
        }
    }, [post_id]); // post_id 변경 시 재요청

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPostData({
            ...postData,
            [name] : value,
        });
    };

    const handleUpdatePost = async () => {
        const editData = {
            ...postData,
            userId : props.id,
            postId : post_id
        };

        const response = await axios.patch('http://localhost:8080/api/post/update', editData);

        if (response.status === 200) {
            alert(`포스트가 수정되었습니다.`);
            navigate(`/post/detail?id=${post_id}`);
        } else {
            alert(`포스트 수정에 실패했습니다.`);
        }
    }


    if (!postData) {
        return (
            <>
                <h1>글 편집 페이지</h1>
                <p>Loading post data...</p>;
            </>
        );
    }

    return (
        <>
            <h1>글 편집 페이지</h1>
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
            <button onClick={handleUpdatePost}>저장</button>
            <button>취소</button>
        </>
    );
}

export default EditingPage;

