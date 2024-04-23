import React from 'react';
import './App.css';
import Board from './components/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import Info from './components/Info';


function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Container>
          <Stack gap={2}>
            <Row>
              <Col sm={{ span: 6, offset: 3 }}>
                <Info></Info>
              </Col>
            </Row>
            <Row>
              <Col sm={{ span: 6, offset: 3 }}>
                <Board></Board>
              </Col>
            </Row>
          </Stack>
        </Container>
      </header>
    </div>
  );
}

export default App;
