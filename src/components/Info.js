import { Badge, Button, Col, Image, Row } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import sadPepe from '../nothing_pepe.png'
import { persistor } from ".."
import { instance } from "../util/useAxiosInter"

export default function Info({ createButtonHandler }) {

    const logoutHandler = () => {
        instance.get('/api/userLogout')
        .then((res) => {
            persistor.purge()
        }).catch((error) => console.log(error))
    }

    const dispatch = useDispatch()
    const id = useSelector((state) => state.accessToken.id)

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
                    <h6>시간</h6>
                </Row>
                <Row>
                    <Badge>unranked</Badge>
                </Row>
            </Col>
            <Col sm={4} style={{alignContent:"space-around"}}>
                <h6>당신이 작성한 글의 랭크는 입니다!</h6>
            </Col>
            <Col sm={3} style={{alignContent:"center", textAlign:"right"}}>
                <Button onClick={createButtonHandler}>등록하기</Button>
                <Button onClick={logoutHandler}>로그아웃</Button>
            </Col>
        </Row>
    )
}
