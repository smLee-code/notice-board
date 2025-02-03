import UserInput from "./UserInput";
import React, {useState} from "react";
import axios from "axios";

const CommentForm = (props) => {

    const [commentData, setCommentData] = useState({
        content : '',
    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setCommentData({
            ...commentData,
            [name] : value
        });
    }

    const handleSaveComment = async () => {

        const requestData = {
            ...commentData,
            postId : props.postId,
            userId : props.userId
        }

        try {
            await axios.post(`http://localhost:8080/api/comment/save`, requestData);
            alert("댓글 등록 : 성공!")
            props.onCommentAdded();
        } catch (error) {
            alert(error + "\n댓글 등록 : 실패! 서버 오류가 발생했습니다.");
        }
    }

    /////////// return HTML ///////////

    return (
        <>
            <UserInput
                type='text'
                placeholder='댓글 입력'
                size='50'
                onChange={handleInputChange}
                value={commentData.content}
                name='content'
            />
            <button onClick={handleSaveComment}>등록</button>
        </>
    );
};

export default CommentForm;