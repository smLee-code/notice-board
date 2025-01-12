import UserInput from "../component/UserInput";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function WritingPage(props) {

    const navigate = useNavigate();

    const [postData, setPostData] = useState({
        title : '',
        content : ''
    });

    const [error, setError] = useState('');

    const handleInputChange = (e) => {

        const { name, value } = e.target;

        setPostData({
            ...postData,
            [name] : value,
        });
    };

    const handleSavePost = async () => {

        const requestData = {
            ...postData, // title, content
            loginId : props.loginId, // 유저 ID 추가
        };

        try {
            const response = await axios.post('http://localhost:8080/api/post/save', requestData);

            if (response.status === 200) {
                alert(`포스트가 저장되었습니다.`);
                navigate('/board');
            }
        } catch (err) {
            setError('포스트 저장 실패');
        }
    }

    return (
        <>
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