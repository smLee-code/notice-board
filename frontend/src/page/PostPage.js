import React, {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import axios from "axios";
import UserInput from "../component/UserInput";
import CommentSection from "../component/CommentSection";


function PostPage(props) {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const postId = searchParams.get('id');
    const [postData, setPostData] = useState(null);


    const getPostData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/post/${postId}`);
            setPostData(response.data);
        } catch (error) {
            console.error("에러 : 해당 포스트가 존재하지 않습니다.:", error);
        }
    }

    useEffect(() => {
        const fetchPostData = async () => {
            if (postId) {
                await getPostData();
            }
        }

        fetchPostData();
    }, [postId]); // post_id 변경 시 재요청

    const deletePost = async () => {

        try {
            const response = await axios.delete(`http://localhost:8080/api/post/delete/${postId}`);
            console.log("삭제 시도");
            if (response.status === 200) {
                console.log("삭제 성공:", response.data); // 서버에서 반환된 메시지 출력
                alert("삭제되었습니다."); // 사용자에게 알림
                navigate('/board');
            }
        } catch (error) {
            alert("삭제 실패 : 해당 포스트가 존재하지 않습니다.");
        }
    }

    const updatePost = async () => {
        navigate(`/edit/detail?id=${postId}`)
    }

    /////////// return HTML ///////////

    if (!postData) {
        return (
            <>
                <h1>포스트 페이지</h1>
                <p>Loading post data...</p>;
            </>
        );
    }

    return (
        <>
            <h1>포스트 페이지</h1>
            <div>
                <h1>{postData.title}</h1>
                <button onClick={() => navigate('/board')}>게시판</button>
                {postData.userId === props.userId ? (
                    // id 일치
                    <>
                        <button onClick={deletePost}> 삭제</button>
                        <button onClick={updatePost}> 수정</button>
                    </>
                ) : (
                    // id 불일치
                    <span/>
                )}
                <hr/>
                <p>작성자 : {postData.username}</p>
                <p>조회수 : {postData.views}</p>
                <p>Created At: {new Date(postData.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(postData.updatedAt).toLocaleString()}</p>
                <hr/>
                {postData.content.split("\n").map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br/>
                    </React.Fragment>
                ))}
                <hr/>
                <CommentSection
                    userId={props.userId}
                    postId={postId}
                />
            </div>
        </>
    );
}

export default PostPage;