import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import React, {useState} from "react";


const CommentSection = (props) => {

    const [refreshKey, setRefreshKey] = useState(0);

    const handleCommentAdded = () => {
        setRefreshKey((prevKey) => prevKey + 1); // 키 값을 업데이트해 새로고침 트리거
    };


    /////////// return HTML ///////////

    return (
        <>
            <CommentForm
                userId={props.userId}
                postId={props.postId}
                onCommentAdded={handleCommentAdded}
            />
            <hr/>
            <CommentList
                userId={props.userId}
                postId={props.postId}
                refreshKey={refreshKey}
            />
        </>
    );
};

export default CommentSection;