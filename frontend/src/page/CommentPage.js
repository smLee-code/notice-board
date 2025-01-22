import {Link, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";


function CommentPage() {

    const [commentList, setCommentList] = useState([]);
    const [searchParams] = useSearchParams();
    const post_id = searchParams.get('id');

    const getCommentList = async (postId, currentPage) => {

        const response = await axios.get(
            'http://localhost:8080/api/comment/retrieve',
            {params: { postId : postId, page : currentPage, size : 10 }}
        );

        setCommentList(response.data);
    };

    return (
        <div>
            <h1>댓글 페이지</h1>
            <p>댓글 목록 &nbsp; <Link to={`/post/details?id=${post_id}`}>게시글로 돌아가기</Link> </p>
            <ul>
                {commentList.map((comment) => (
                    <li key={comment.id}>
                        <p>
                            {comment.username} | {comment.content}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CommentPage;
