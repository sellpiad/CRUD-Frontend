import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";


// 테이블 스타일 정의
const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: large;
  color: black;
  border-radius: 5px 5px 5px 5px;
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


export default function Board({isCreateOpen,isPostOpen,isEditOpen,editButtonHandler, postButtonHandler, postId}) {

    // 테이블 헤더
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        if (!isCreateOpen && !isPostOpen && !isEditOpen) {
            axios.get('/api/getList')
                .then(response => {
                    setHeaders(response.data)
                })
                .catch(error => console.log(error))
        }

    }, [isPostOpen, isCreateOpen, isEditOpen]);


    return (
        <Container>
            <Row style={{overflowY:"scroll", maxHeight:"350px", borderRadius:"5px 5px 5px 5px"}}>
                <StyledTable>
                    <thead style={{position:"sticky", top:0}}>
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
        </Container>
    )
}
