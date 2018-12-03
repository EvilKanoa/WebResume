import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {getModalElement} from 'reducer';

import './ModalContainer.scss';

@connect(
    (state) => ({
        modalElement: getModalElement(state)
    })
)
class ModalContainer extends PureComponent {
    render() {
        const Modal = this.props.modalElement || false;

        return (
            <div id="modal-container" className={Modal ? 'visible' : 'hidden'}>
                { Modal &&
                    <div className="modal">
                        <Modal/>
                    </div>
                }
            </div>
        );
    }
}

export default ModalContainer;
