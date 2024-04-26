import React from 'react';
import './App.css';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import CreateModal from './components/CreateModal';
import EditModal from './components/EditModal';
import PostModal from './components/PostModal';
import Login from './components/Login';

function App() {

  // 모달 오픈 감지 변수
  const [isCreateOpen, closeCreateModal] = useState(false);
  const [isPostOpen, closePostModal] = useState(false);
  const [isEditOpen, closeEditModal] = useState(false);

  // 모달 오픈 감지 버튼
  const createButtonHandler = () => closeCreateModal(true)
  const postButtonHandler = (id) => { setPostId(id); closePostModal(true); }
  const editButtonHandler = () => closeEditModal(true)

  // 포스트 아이디 
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    // 포스트 모달이 닫혔지만, 포스트 아이디가 여전히 남아있다면 수정 버튼이 클릭 된 것.
    if (!isPostOpen && postId != null) {
      editButtonHandler()
    }
  },[isPostOpen,isCreateOpen,isEditOpen])


  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Stack gap={2}>
            <Row>
              <Col sm={{ span: 6, offset: 3 }}>
                <Login createButtonHandler={createButtonHandler}></Login>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 6, offset: 3 }}>
                <Board isCreateOpen={isCreateOpen} isPostOpen={isPostOpen} isEditOpen={isEditOpen}
                  setPostId={setPostId}
                  editButtonHandler={editButtonHandler} postButtonHandler={postButtonHandler}></Board>
              </Col>
            </Row>
          </Stack>
          <CreateModal show={isCreateOpen} onHide={closeCreateModal}></CreateModal>
          <PostModal show={isPostOpen} onHide={closePostModal} postId={postId} setPostId={setPostId}></PostModal>
          <EditModal show={isEditOpen} onHide={closeEditModal} postId={postId} setPostId={setPostId} ></EditModal>
        </Container>
      </header>
    </div>
  );
}

export default App;
