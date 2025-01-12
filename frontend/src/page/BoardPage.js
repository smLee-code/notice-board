import React, { useState, useEffect } from "react";
import axios from "axios";

import {Link, useNavigate} from "react-router-dom";


function BoardPage() {

    const navigate = useNavigate();

    const [noticeList, setNoticeList] = useState([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [inputValue, setInputValue] = useState(1);


    const getNoticeList = async (currentPage) => {

        const response = await axios.get(
            'http://localhost:8080/api/post/retrieve',
            {params: { page : currentPage, size : 10 }}
        );

        setNoticeList(response.data);
    }

    const getMaxPage = async () => {
        const response = await axios.get('http://localhost:8080/api/post/maxpage');

        if (response.data < 1) {
            setMaxPage(1);
        } else {
            setMaxPage(response.data);
        }
    }

    useEffect(() => {
        const initializeData = async () => {
            await getMaxPage();
            await getNoticeList(1);
        };

        initializeData();
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        getNoticeList(newPage);
    };


    /////////////////

    const updatePage = (newPage) => {

        if (newPage < 1)
            newPage = 1;

        if (newPage > maxPage)
            newPage = maxPage;

        setPage(newPage); // page 상태 업데이트
        setInputValue(newPage); // input 값도 동기화
        getNoticeList(newPage); // 쿼리 요청

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

    return (
        <div>
            <h1>게시판 페이지</h1>
            <div>
                <p>게시글 목록 <button onClick={() => navigate('/write')}>글쓰기</button> </p>

                <ul>
                {noticeList.map((notice) => (
                        <li key={notice.id}>
                            제목 : <Link to={`/post/detail?id=${notice.id}`}>{notice.title}</Link>
                            &nbsp; | 글쓴이 : {notice.username}
                        </li>
                    ))}
                </ul>

                <div>
                    {page > 1 ? (
                        <span onClick={() => updatePage(page - 1)}>&lt;&lt;</span>
                    ) : (
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    )}
                    <span>페이지 : </span>
                    <input
                        type="number"
                        name='page'
                        sizee="100"
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        style={{ width: "50px", textAlign: "center" }}
                    />
                    <span> / {maxPage}</span>
                    {page < maxPage ? (
                        <span onClick={() => updatePage(page + 1)}>&gt;&gt;</span>
                    ) : (
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    )}
                </div>

            </div>
        </div>
    );
}

export default BoardPage;