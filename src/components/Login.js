import axios from "axios";
import { useEffect, useState } from "react"
import { Col, Container, Row, Form, Stack, Button } from "react-bootstrap"
import styled from "styled-components"
import Info from "./Info";

const StyledInfo = styled.div`
    font-size: 0.9em;
    color: black;
    overflow: hidden;
    border-radius: 5px 5px 5px 5px;
    background-color: #f3f3f3;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

export default function Login({createButtonHandler}) {

    const [loginBtn, setLoginBtn] = useState(false);
    const [id, setId] = useState(localStorage.getItem('id'));
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(localStorage.getItem('id')!=null?true:false);
    const [createTime, setCreateTime] = useState(localStorage.getItem('createTime'));

    const loginBtnHandler = () => setLoginBtn(true)

    const idHandler = (e) => setId(e.target.value)
    const passwordHandler = (e) => setPassword(e.target.value)



    useEffect(() => {
        if (loginBtn) {

            const formData = new FormData()

            formData.append("username", id)
            formData.append("password", password)

            axios.post('/api/login', formData)
                .then((response) => {
                    console.log("로그인 성공! 반응은... "+ response.data.id)
                    if (response.data) {
                        localStorage.clear()
                        localStorage.setItem('id',response.data.id)
                        localStorage.setItem('createTime',response.data.createTime)
                        setLogin(true)
                        setId(response.data.id)
                        setCreateTime(response.data.createTime)
                    }
                })
                .catch(error => console.log(error))

            setLoginBtn(false)
        }
    }, [loginBtn])


    return (
        <StyledInfo>
            <Container>
                {login 
                ? 
                <Info id={id} createDate={createTime} setLogin={setLogin} createButtonHandler={createButtonHandler}></Info> 
                : 
                <Row>
                <Col xs={{ span: 4, offset: 4 }} sm={{ span: 3, offset: 3 }}>
                    <Form.Control placeholder="ID" type="text" value={id} onChange={idHandler} />
                </Col>
                <Col xs={{ span: 4 }} sm={3}>
                    <Form.Control placeholder="Password" type="password" value={password} onChange={passwordHandler} />
                </Col>
                <Col sm={3}>
                    <Button onClick={loginBtnHandler}>
                        로그인
                    </Button>
                </Col>
            </Row>}
            </Container>
        </StyledInfo>
    )
}

