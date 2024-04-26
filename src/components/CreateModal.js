import axios from "axios";
import { useEffect, useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";

export default function CreateModal({ show, onHide }) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [createBtn, setCreateBtn] = useState(false);

    useEffect(() => {

        if (createBtn == true) {
            axios.post('/api/createPost', { title: title, content: content })
                .then((response) => { response.data && onHide(); setCreateBtn(false); setTitle(''); setContent('')})
                .catch(error => console.log(error))
        }

    }, [createBtn])

    const saveTitle = (event) => (
        setTitle(event.target.value)
    )

    const saveContent = (event) => (
        setContent(event.target.value)
    )

    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton>
                <Form.Group className="mb-3">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="title" placeholder="제목" value={title} onChange={saveTitle} />
                    <input type="hidden" name="_csrf" value="${XSRF-TOKEN}" />
                </Form.Group>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={10} value={content} onChange={saveContent} />
                </Form.Group>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => (setCreateBtn(true))}>등록</Button>
            </Modal.Footer>
        </Modal>
    )
}