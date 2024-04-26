
import { useState, useEffect } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";


export default function EditModal({ show, onHide, postId, setPostId }) {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [content, setContent] = useState('')
    const [editBtn, setEditBtn] = useState(false)


    const clickedExitBtn = () => {
        onHide(false)
        setPostId()
        setTitle('')
        setAuthor('')
        setContent('')
        setEditBtn(false)
    }

    const titleHandler = (e) => {
        setTitle(e.target.value)
    }

    const contentHandler = (e) => {
        setContent(e.target.value)
    }



    // 포스트 정보 불러오기

    useEffect(() => {
        if (postId !== null && show!==false) {
            axios.get('/api/getPost?id=' + postId)
                .then((response) => {
                    response.data.title && setTitle(response.data.title)
                    response.data.author && setAuthor(response.data.author)
                    response.data.content && setContent(response.data.content)
                })
                .catch((error) => console.log(error));
        } 
    }, [show])

    // 포스트 수정 버튼 클릭

    useEffect(() => {

        if (editBtn === true && postId !== null) {
            axios.post('/api/updatePost', { id: postId, title: title, author: author, content: content })
                .then((response) => clickedExitBtn() )
                .catch(error => console.log(error))
        }

    }, [editBtn])


    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton onClick={clickedExitBtn}>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="title" placeholder="제목" value={title} onChange={titleHandler} />
                </Form.Group>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={10} value={content} onChange={contentHandler} />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => (setEditBtn(true))}>등록</Button>
            </Modal.Footer>
        </Modal>
    )
}