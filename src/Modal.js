import { useRef, useState } from "react";
import styled from "styled-components";

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
`

const ModalWindow = styled.div`
  background-color: #ffffff;
  width: 500px;
  height: 600px;
  border-radius: 5px 5px 5px 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
  color: black;
  border: 2px solid #b77777;
  text-align: left;
  padding: 1%;
  h3 {
    margin-block-start: 0rem;
    margin-block-end: 0rem;
};
div {
    display: flex
};
overflow:auto;


`
export default function Modal({ isOpen, ...props }) {

    return (
        <div>
            {
                isOpen &&
                <ModalContainer>
                    <ModalWindow>
                        {props.children}
                    </ModalWindow>
                </ModalContainer>}
        </div>
    )
}

