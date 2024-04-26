import axios from "axios";
import { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function PostModal({ show, onHide, postId, setPostId }) {

    const [post, setPost] = useState({ title: '', author: '', date: '', content: '', editable: false, deletable: false});
    const [deleteBtn, setDeleteBtn] = useState(false);

    const clickedDeleteBtn = (event) => setDeleteBtn(true)
    const clickedEditBtn = (event) => {onHide()}
    const clickedExitBtn = () => {
        onHide()
        setPostId()
    }


    // 포스트 내용 얻어오기
    useEffect(() => {

        if (postId !== null && postId !== undefined) {
            axios.get('/api/getPost?id=' + postId)
                .then((response) => { setPost(response.data); })
                .catch((error) => console.log(error));
        }

    }, [postId])

    // 포스트 삭제
    useEffect(() => {

        if (deleteBtn == true) {
            axios.get('/api/deletePost?id=' + postId)
                .then((response) => {onHide(); setPostId(); setDeleteBtn(false);})
                .catch(error => console.log(error))
        }

    }, [deleteBtn])


    return (
        <Modal show={show} onHide={onHide} centered={true}>
            <Modal.Header closeButton onClick={clickedExitBtn}>
                <Modal.Title>{post.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <h6>글쓴이: {post.author}</h6>
                    <h6>날짜: {post.date} </h6>
                </div>
                <p>내용: {post.content}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button style={{display: post.editable ? "inline-block" : "none"}} onClick={clickedEditBtn}>수정</Button>
                <Button style={{display: post.deletable ? "inline-block" : "none"}} onClick={clickedDeleteBtn}>삭제</Button>
            </Modal.Footer>
        </Modal>

    )
}