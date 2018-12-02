import React from 'react';

import './Modal.scss'

const Modal = ({
    title = '',
    onClose = () => { },
    onAction = () => { },
    closeLabel = 'Cancel',
    actionLabel = 'Go',
    children,
    className,
    id
}) => (
    <div id={id} className={'inner-modal ' + className}>
        <div className="modal-header">
            <span className="modal-title">
                { title }
            </span>
        </div>

        <div className="modal-body">
            { children }
        </div>

        <div className="modal-footer">
            <span className="modal-button modal-button-close" onClick={onClose}>
                { closeLabel }
            </span>
            <span className="modal-button modal-button-action" onClick={onAction}>
                { actionLabel }
            </span>
        </div>
    </div>
);

export default Modal;
