import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import CreateModal from './CreateModal';
import PostModal from "./PostModal";
import { Button, Container, Row, Stack, Col } from "react-bootstrap";
import EditModal from "./EditModal";


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

    // 모달 오픈 감지 변수
    const [isCreateOpen, closeCreateModal] = useState(false);
    const [isPostOpen, closePostModal] = useState(false);
    const [isEditOpen, closeEditModal] = useState(false);

    // 포스트 아이디 
    const [postId, setPostId] = useState(null);

    // 테이블 헤더
    const [headers, setHeaders] = useState([]);

    // 모달 오픈 감지 버튼
    const createButtonHandler = () => closeCreateModal(true)
    const postButtonHandler = (id) => { setPostId(id); closePostModal(true); }
    const editButtonHandler = () => closeEditModal(true)

    useEffect(() => {

        console.log("포스트 - " + isPostOpen);
        console.log("포스트 아이디 - " + postId);

        if (!isCreateOpen && !isPostOpen && !isEditOpen) {
            axios.get('/api/getList')
                .then(response => {
                    setHeaders(response.data)
                })
                .catch(error => console.log(error))
        }

        if (!isPostOpen && postId != null) {
            editButtonHandler()
        }

    }, [isPostOpen, isCreateOpen, isEditOpen]);



    return (

        <Container>
            <Stack gap={2}>
                <Row>
                    <StyledTable>
                        <thead>
                            <StyledRow key={"table-header"}>
                                {
                                    headers.length > 0 &&
                                    Object.keys(headers[0]).map((el) => (
                                        <StyledHeader key={`header-${el}`}>
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
                                                        <StyledCell key={`cell-${index}`}><div onClick={() => postButtonHandler(row['id'])}>{row[data]}</div></StyledCell>
                                                        : <StyledCell key={`cell-${index}`}>{row[data]}</StyledCell>
                                                ))
                                            }
                                        </StyledRow>
                                    )) : null
                            }
                        </tbody>
                    </StyledTable>
                </Row>
                <Row>
                    <Col sm={{span:2, offset:10}}>
                        <Button onClick={createButtonHandler}>글 등록</Button>
                    </Col>
                </Row>
            </Stack>

            <CreateModal show={isCreateOpen} onHide={closeCreateModal}></CreateModal>
            <PostModal show={isPostOpen} onHide={closePostModal} postId={postId} setPostId={setPostId}></PostModal>
            <EditModal show={isEditOpen} onHide={closeEditModal} postId={postId} setPostId={setPostId} ></EditModal>

        </Container>

    )
}
