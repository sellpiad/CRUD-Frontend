import { useEffect, useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import styled from "styled-components";

const StyledForm = styled.form`
    width:inherit;
`

const StyledInput = styled.input`
    width:inherit;
    border-collapse: collapse;
  color: black;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`

export default function CreateModal({ isOpen,setPostId,closeModal, editPostId }) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (editPostId != null) {
            axios.get('/api/getPost?id=' + editPostId)
                .then((response) => {
                    response.data.title && setTitle(response.data.title)
                    response.data.author && setAuthor(response.data.author)
                    response.data.content && setContent(response.data.content)
                })
                .catch((error) => console.log(error));
        } else{
            setTitle('')
            setAuthor('')
            setContent('')
            setIsClicked(false)
        }
    }, [isOpen])

    useEffect(() => {

        if (isClicked == true && editPostId == null) {
            axios.post('/api/createPost', { title: title, author: author, content: content })
                .then((response) => { console.log(response.data); response.data && closeModal(); setPostId(); })
                .catch(error => console.log(error))
        } else if (isClicked == true && editPostId != null) {
            axios.post('/api/updatePost', { id: editPostId, title: title, author: author, content: content })
                .then((response) => { console.log(response.data); response.data && closeModal(); setPostId();})
                .catch(error => console.log(error))
        }

    }, [isClicked])

    const saveTitle = (event) => (
        setTitle(event.target.value)
    )

    const saveAuthor = (event) => (
        setAuthor(event.target.value)
    )

    const saveContent = (event) => (
        setContent(event.target.value)
    )

    return (
        <div>
            <Modal isOpen={isOpen}>

                <button onClick={closeModal}>X</button>


                <h3>제목</h3>
                <StyledForm>
                    <StyledInput className="title" placeholder="제목" value={title} onChange={saveTitle}></StyledInput>
                </StyledForm>

                <h3>글쓴이</h3>
                <StyledForm>
                    <StyledInput className="author" placeholder="글쓴이" value={author} onChange={saveAuthor}></StyledInput>
                </StyledForm>

                <h3>내용</h3>
                <StyledForm style={{ height: "300px" }}>
                    <StyledInput style={{ height: "inherit" }} className="content" placeholder="내용" value={content} onChange={saveContent}></StyledInput>
                </StyledForm>

                <button onClick={() => (setIsClicked(true))}>등록</button>
            </Modal>
        </div>
    )
}