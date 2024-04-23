import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CreateModal from './CreateModal';
import PostModal from "./PostModal";
import StyledBox from "./StyledBox";


// 테이블 스타일 정의
const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 0.9em;
  color: black;
  border-radius: 5px 5px 5px 5px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  width:100%;
`;

// 테이블 헤더 셀 스타일 정의
const StyledHeader = styled.th`
  text-align: left;
  padding: 12px 15px;
  text-align: center;
`;

// 테이블 로우 스타일 정의
const StyledRow = styled.tr`
  border-bottom: 1px solid #dddddd;
  background-color: #f3f3f3;

`;

// 테이블 데이터 셀 스타일 정의
const StyledCell = styled.td`
  padding: 12px 15px;
`;


export default function Board() {

    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isPostModalOpen, setPostModalOpen] = useState(false);
    const [clickPostID, setPostID] = useState(null);
    const [headers, setHeaders] = useState([]);


    const createButtonHandler = () => {
        setCreateModalOpen(true);
    }

    const postModalHandler = (id) => {
        setPostID(id)
    }

    const closeCreateModal = () => {
        setCreateModalOpen(false)
        setPostID(null)
    }

    const openPostModal = () => {
        setPostModalOpen(true);
    }

    const closePostModal = () => {
        setPostModalOpen(false)
        setPostID()
    }

    const editPost = () => {
        setPostModalOpen(false)
        setCreateModalOpen(true)
    }


    useEffect(() => {
        (!isCreateModalOpen, !isPostModalOpen) &&
            axios.get('/api/getList')
                .then(response => {
                    setHeaders(response.data);
                })
                .catch(error => console.log(error))
    }, [isPostModalOpen, isCreateModalOpen]);


    return (

        <StyledBox>
            <StyledTable>
                <thead>
                    <StyledRow key={"table-header"}>
                        {
                            headers.length > 0 &&
                            Object.keys(headers[0]).map((el,index) => (
                                <StyledHeader key={`header-${index}`}>
                                    {{
                                        id: "번호",
                                        title: "제목",
                                        author: "글쓴이",
                                        createTime: "날짜"
                                    }[el]}
                                </StyledHeader>
                            ))

                        }
                    </StyledRow>
                </thead>
                <tbody>
                    {
                        headers.length > 0 ?
                            Object.values(headers).map((row, index) => (
                                <StyledRow key={`post-${index}`}>
                                    {

                                        Object.keys(row).map((data, index) => (
                                            data === 'title' ?
                                                <StyledCell key={`cell-${index}`}><div onClick={() => postModalHandler(row['id'])}>{row[data]}</div></StyledCell>
                                                : <StyledCell key={`cell-${index}`}>{row[data]}</StyledCell>
                                        ))
                                    }
                                </StyledRow>
                            )) : null
                    }
                </tbody>
            </StyledTable>
            <button onClick={createButtonHandler}>글 등록</button>
            <CreateModal isOpen={isCreateModalOpen} setPostId={setPostID} closeModal={closeCreateModal} editPostId={clickPostID}></CreateModal>
            <PostModal clickedPostID={clickPostID} setPostID={setPostID} isOpen={isPostModalOpen} openModal={openPostModal} closeModal={closePostModal} editPost={editPost}></PostModal>
        </StyledBox>
        
    )
}
