import axios from "axios";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import styled from "styled-components";
import Info from "./Info";

import { useDispatch, useSelector } from "react-redux";

import { changeToken } from "../redux/tokenSlice";

const StyledInfo = styled.div`
    font-size: 0.9em;
    color: black;
    overflow: hidden;
    border-radius: 5px 5px 5px 5px;
    background-color: #f3f3f3;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

export default function Login({ createButtonHandler }) {

    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const idHandler = (e) => setId(e.target.value)
    const passwordHandler = (e) => setPassword(e.target.value)

    const isLogined = useSelector((state) => state.accessToken.isLogined)
    const dispatch = useDispatch()


    // 로그인 버튼이 눌렸을 때 로그인
    const userLogin = () => {
        const formData = new FormData();

        formData.append("username", id);
        formData.append("password", password);

        axios.post('/api/login', formData)
            .then((response) => {
                console.log("로그인 성공! 반응은... " + response.data.username);
                if (response.data) {

                    dispatch(
                        changeToken({
                            id: response.data.username,
                            value: response.data.accessToken
                        })
                    );

               
                }
            })
            .catch(error => console.log(error))
    }

    return (
        <StyledInfo>
            <Container>
                {isLogined
                    ?
                    <Info createButtonHandler={createButtonHandler}></Info>
                    :
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }} sm={{ span: 3, offset: 3 }}>
                            <Form.Control placeholder="ID" type="text" value={id} onChange={idHandler} />
                        </Col>
                        <Col xs={{ span: 4 }} sm={3}>
                            <Form.Control placeholder="Password" type="password" value={password} onChange={passwordHandler} />
                        </Col>
                        <Col sm={3}>
                            <Button onClick={userLogin}>
                                로그인
                            </Button>
                        </Col>
                    </Row>}
            </Container>
        </StyledInfo>
    )
}

