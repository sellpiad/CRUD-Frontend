import { Col, Container, Row } from "react-bootstrap"
import styled from "styled-components"

const StyledInfo = styled.div`
     font-size: 0.9em;
  color: black;
  border-radius: 5px 5px 5px 5px;
  overflow: hidden;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    background-color: white;
`

export default function Info() {

    return (
        <StyledInfo>
            <Container>
                <Row>
                    <Col sm={2}>
                        이미지
                    </Col>
                    <Col sm={10}>
                        <Row style={{textAlign:"left"}}>
                            <h4>이름</h4>
                        </Row>
                        <Row style={{textAlign:"left"}}>
                            <h6>가입일</h6>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </StyledInfo>
    )
}