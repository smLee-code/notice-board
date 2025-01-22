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

    const deletePost = async () => {

        try {
            const response = await axios.delete(`http://localhost:8080/api/post/delete/${post_id}`);
            console.log("삭제 시도");
            if (response.status === 200) {
                console.log("삭제 성공:", response.data); // 서버에서 반환된 메시지 출력
                alert("삭제되었습니다."); // 사용자에게 알림
                navigate('/board');
            }
        } catch (error) {
            //if (error.response && error.response.status === 404) {
                console.error("삭제 실패: 포스트를 찾을 수 없습니다.");
                alert("해당 포스트가 존재하지 않습니다.");
            //}
        }
    }

    const updatePost = async () => {
        navigate(`/edit/detail?id=${post_id}`)
    }

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
                {postData.userId === props.id ? (
                    <>
                        <span> id 일치</span>
                        <button onClick={deletePost}> 삭제 </button>
                        <button onClick={updatePost}> 수정 </button>
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
                <button onClick={() => navigate(`/comment/detail?id=${post_id}`)}>댓글</button>
            </div>
            <div>

            </div>
        </>
    );
}

export default PostPage;