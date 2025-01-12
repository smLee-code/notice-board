import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInput from "../component/UserInput";
import {Link, useNavigate} from "react-router-dom";


function BoardPage() {

    const navigate = useNavigate();

    const [noticeList, setNoticeList] = useState([]);

    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);

    const [prevArrow, setPrevArrow] = useState(<span> </span>);
    const [nextArrow, setNextArrow] = useState(<span> </span>);


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



    // useEffect(() => {
    //
    //     setPrevArrow(
    //         page === 1
    //             ? <span> </span>
    //             : <span onClick={() => setPage(page - 1)}>&lt;&lt;</span>
    //     );
    //
    //     setNextArrow(
    //         page === maxPage
    //             ? <span> </span>
    //             : <span onClick={() => setPage(page + 1)}>&gt;&gt;</span>
    //     );
    //
    // }, [page, maxPage]);

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

    return (
        <div>
            <h1>게시판 페이지</h1>
            <div>
                <p>게시글 목록</p>
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
                        <span onClick={() => handlePageChange(page - 1)}>&lt;&lt;</span>
                    ) : (
                        <span> </span>
                    )}
                    <span>페이지 : </span>
                    <input
                        type="number"
                        name='page'
                        value={page}
                        onChange={handlePageChange}
                        size="50"
                    />
                    <span> / {maxPage}</span>
                    {page < maxPage ? (
                        <span onClick={() => handlePageChange(page + 1)}>&gt;&gt;</span>
                    ) : (
                        <span> </span>
                    )}
                </div>
                <button onClick={() => navigate('/write')}>글쓰기</button>
            </div>
        </div>
    );
}

export default BoardPage;