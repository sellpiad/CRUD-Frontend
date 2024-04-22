import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import styled from "styled-components";


const StlyedContent = styled.h3`
   
`

const StyledInfo = styled.div`

`

export default function PostModal({ clickedPostID, isOpen, openModal, closeModal, editPost,setPostID }) {

    const [post, setPost] = useState({ title: '', author: '', date: '', content: '' });
    const [deleteBtn, setDeleteBtn] = useState(false);
    const [editBtn, setEditBtn] = useState(false);

    const clickedDelete = (event) => (
        setDeleteBtn(true)
    )

    const clickedEdit = (event) => {
        setEditBtn(true)
        editPost()
    }

    const clickedExit = () => {
        closeModal()
        setPostID();
    }


    useEffect(() => {

        if (clickedPostID !== null && clickedPostID!==undefined) {
            axios.get('/api/getPost?id=' + clickedPostID)
                .then((response) => { setPost(response.data); console.log(response.data); openModal(); })
                .catch((error) => console.log(error));
        }

    }, [clickedPostID])

    useEffect(() => {

        if (deleteBtn == true) {
            axios.get('/api/deletePost?id=' + clickedPostID)
                .then((response) => closeModal())
                .catch(error => console.log(error))

        }

    }, [deleteBtn])

    useEffect(() => {

        if (editBtn == true) {
            editPost();
        }

    }, [editBtn])

    return (
        <div>
            <Modal isOpen={isOpen}>
                <button onClick={clickedExit}>X</button>
                <h3>제목: {post.title}</h3>
                <div>
                <h6>글쓴이: {post.author}</h6>
                <h6>날짜: {post.date} </h6>
                </div>
                
                <StlyedContent>내용: {post.content}</StlyedContent>
                <button onClick={clickedEdit}>수정</button>
                <button onClick={clickedDelete}>삭제</button>
            </Modal>
        </div>
    )
}