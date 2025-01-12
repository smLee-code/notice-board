import {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import axios from "axios";


function PostPage() {

    const [postData, setPostData] = useState(null);
    const [searchParams] = useSearchParams();
    const post_id = searchParams.get('id');

    const getPostData = async () => {
        const response = await axios.get(`http://localhost:8080/api/post/${post_id}`);

        setPostData(response.data);


    }

    useEffect(() => {
        const getPostData = async () => {
            const response = await axios.get(`http://localhost:8080/api/post/${post_id}`);

            setPostData(response.data);
        };

        getPostData();
    }, [post_id]); // post_id 변경 시 재요청

    return (
        <>
            <h1>포스트 페이지</h1>
            <div>
                <h1>{postData.title}</h1>
                <p>{postData.content}</p>
                <p>Views: {postData.views}</p>
                <p>Created At: {new Date(postData.createdAt).toLocaleString()}</p>
                <p>Updated At: {new Date(postData.updatedAt).toLocaleString()}</p>
            </div>
        </>
    );
}

export default PostPage;