
import {Link, useNavigate } from "react-router-dom";

function HomePage() {

    const navigate = useNavigate();

    const handleMoveToWriteNotice = () => {

        navigate('/write');
    }

    return (
        <div>
            <h1>홈 페이지</h1>
            <div>
                <button onClick={handleMoveToWriteNotice}>글쓰기</button>
            </div>
        </div>
    );
}

export default HomePage;
