import React from "react";
import { createPortal } from 'react-dom';
import './Modal.css';
function Modal({ children }) {
    return createPortal(
        <div className="ModalBackground">
            {children}
        </div>,
        document.getElementById('modal') // Asegúrate de que exista un elemento con id="modal" en tu HTML.
    );
}

export { Modal };
