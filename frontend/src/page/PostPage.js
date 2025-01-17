import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";


function PostPage(props) {

    const navigate = useNavigate();
    const [postData, setPostData] = useState(null);
    const [searchParams] = useSearchParams();
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

    if (!postData) {
        return (
            <>
                <h1>포스트 페이지</h1>
                <button onClick={() => navigate('/write')}>글쓰기</button>
                <p>Loading post data...</p>;
            </>
        );
    }

    return (
        <>
            <h1>포스트 페이지</h1>
            <div>
            <h1>{postData.title}</h1>
                {postData.userId === props.id ? (
                    <>
                        <span> id 일치</span>
                        <button> 삭제 </button>
                        <button> 수정 </button>
                    </>
                ) : (
                    <span> id 불일치 </span>
                )}
                <p>작성자 : {postData.username}</p>
                {postData.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}
                <p>조회수 : {postData.views}</p>
                <p>Created At: {new Date(postData.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(postData.updatedAt).toLocaleString()}</p>
            </div>
            <div>
                <button onClick={() => navigate('/write')}>글쓰기</button>
                <button onClick={() => navigate('/board')}>게시판</button>
            </div>
        </>
    );
}

export default PostPage;