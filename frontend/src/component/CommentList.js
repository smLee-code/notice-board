import axios from "axios";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import UserInput from "./UserInput";

const CommentList = (props) => {

    const [commentList, setCommentList] = useState([]);
    const [editingComment, setEditingComment] = useState({
        id : null,
        content : ''
    });

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);

    const getMaxPage = async () => {
        const response = await axios.get(
            'http://localhost:8080/api/comment/maxpage',
            {params : { postId : props.postId }}
        );

        if (response.data < 1) {
            setMaxPage(1);
        } else {
            setMaxPage(response.data);
        }
    }

    const getCommentList = async (currentPage) => {

        const response = await axios.get(
            'http://localhost:8080/api/comment/retrieve',
            {params: { postId : props.postId, page : currentPage, size : 10 }}
        );

        setCommentList(response.data);
    }

    const fetchCommentList = async () => {
        await getMaxPage();
        await getCommentList(1);
    }

    // useEffect(() => {
    //     fetchCommentList();
    // }, [])

    useEffect(() => {
        fetchCommentList();
    }, [props.refreshKey]);


    const updatePage = (newPage) => {
        if (newPage < 1)
            newPage = 1;

        if (newPage > maxPage)
            newPage = maxPage;

        setPage(newPage); // page 상태 업데이트
        setInputValue(newPage); // input 값도 동기화
        getCommentList(newPage); // 쿼리 요청
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const newPage = parseInt(inputValue, 10); // 정수로 변환
            if (!isNaN(newPage)) {
                updatePage(newPage);
            } else {
                alert("유효한 숫자를 입력하세요.");
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:8080/api/comment/delete/${commentId}`);
            alert("댓글 삭제 : 성공!")
            fetchCommentList();
        } catch(error) {
            alert(error + "\n댓글 삭제 : 실패! 서버 오류가 발생했습니다.");
        }

    }

    const handleEditComment = (comment) => {
        setEditingComment({
            id : comment.id,
            content : comment.content
        });
    }

    const setEditedContent = (content) => {
        setEditingComment({
            ...editingComment,
            content : content
        });
    }

    const initEditingComment = () => {
        setEditingComment({
            id : null,
            content : ''
        });
    }

    const handleCancelEdit = () => {
        initEditingComment();
    };


    const updateComment = async () => {

        const editData = {
            ...editingComment
        };

        const response = await axios.patch(`http://localhost:8080/api/comment/update`, editData);
    }

    const handleSaveEdit = async () => {

        try {
            await updateComment();

            initEditingComment();
        } catch (error) {

        }
    };

    /////////// return HTML ///////////

    return (
        <div>
            <ul>
                {commentList.map((comment) => (
                    <li key={comment.id}>
                        {editingComment.id === comment.id ? (
                            <>
                                <UserInput
                                    type='text'
                                    placeholder=''
                                    size='30'
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    value={editingComment.content}
                                    name='content'
                                />
                                <button onClick={() => handleSaveEdit(comment.id)}>저장</button>
                                <button onClick={handleCancelEdit}>취소</button>
                            </>
                        ) : (
                            <>
                                <p>{comment.content} &nbsp; | {comment.username} &nbsp;
                                    {comment.userId === props.userId ? (
                                        // id 일치
                                        <>
                                            <button onClick={() => handleDeleteComment(comment.id)}> 삭제</button>
                                            <button onClick={() => handleEditComment(comment)}> 수정</button>
                                        </>
                                    ) : (
                                        // id 불일치
                                        <span/>
                                    )}
                                </p>
                            </>
                        )}
                    </li>
                ))}
            </ul>

            {page > 1 ? (
                <span onClick={() => updatePage(page - 1)}>&lt;&lt;</span>
            ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            )}
            <span>페이지 : </span>
            <input
                type="text"
                name='page'
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{width: "30px", textAlign: "center"}}
            />
            <span> / {maxPage}</span>
            {page < maxPage ? (
                <span onClick={() => updatePage(page + 1)}>&gt;&gt;</span>
            ) : (
                <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
            )}
        </div>
    );
};

export default CommentList;