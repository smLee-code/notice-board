
import {Link, useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();


    return (
        <div>
            <h1>홈 페이지</h1>
            <div>
                <button onClick={() => navigate('/write')}>글쓰기</button>
                <button onClick={() => navigate('/board')}>게시판</button>
            </div>
        </div>
    );
}

export default HomePage;
