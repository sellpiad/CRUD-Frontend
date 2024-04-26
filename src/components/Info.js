import { Row, Col, Button, Image, Badge } from "react-bootstrap"
import sadPepe from '../nothing_pepe.png'

export default function Info({ id, createDate, setLogin, rank,createButtonHandler }) {

    const logoutHandler = () => {
        localStorage.clear()
        setLogin(false)
    }

    return (
        <Row>
            <Col sm={2} style={{paddingLeft:"0",paddingRight:"0", textAlign:"left", alignContent:"space-around"}}>
                <Image src={sadPepe} fluid rounded></Image>
            </Col>
            <Col sm={3}>
                <Row style={{ textAlign: "left" }}>
                    <h4>{id}</h4>
                </Row>
                <Row style={{ textAlign: "left" }}>
                    <h6>{createDate}</h6>
                </Row>
                <Row>
                    <Badge>unranked</Badge>
                </Row>
            </Col>
            <Col sm={4} style={{alignContent:"space-around"}}>
                <h6>당신이 작성한 글의 랭크는 {rank} 입니다!</h6>
            </Col>
            <Col sm={3} style={{alignContent:"center", textAlign:"right"}}>
                <Button onClick={createButtonHandler}>등록하기</Button>
                <Button onClick={logoutHandler}>로그아웃</Button>
            </Col>
        </Row>
    )
}
