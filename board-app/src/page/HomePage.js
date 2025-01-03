
import {Link} from "react-router-dom";

function HomePage() {
    return (
        <div>
            <h1>홈 페이지</h1>
            <div>
                <Link to='/login'>로그인</Link>
            </div>
            <div>
                <Link to='/signup'>회원가입</Link>
            </div>
        </div>
    );
}

export default HomePage;
