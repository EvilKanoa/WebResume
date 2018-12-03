import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import storage from 'core/storage';
import {getResumeData, hideModal} from 'reducer';
import Messages from 'components/Messages';
import Modal from 'components/modal/Modal';
import FileList from 'components/action/FileList';

import './SaveModal.scss';

@connect(
    (state) => ({
        data: getResumeData(state)
    }),
    (dispatch) => bindActionCreators({
        hideModal
    }, dispatch)
)
class SaveModal extends PureComponent {
    state = {
        filename: ''
    };

    onChangeHandler = (filename) => {
        if (this.state.filename !== filename) {
            this.setState({
                filename
            });
        }
    };

    save = () => {
        if (!this.state.filename) return;

        storage.saveFile(this.state.filename, this.props.data);
        this.props.hideModal();
        Messages.success(`Saved file: ${this.state.filename}`);
    };

    render() {
        return (
            <Modal
                className="save-modal"
                title="Save Current Resume"
                onClose={this.props.hideModal}
                onAction={this.save}
                actionLabel="Save"
            >
                <FileList
                    selected={this.state.filename}
                    onChange={this.onChangeHandler}
                />
                <input
                    className="filename-input"
                    type="text"
                    value={this.state.filename}
                    onChange={(e) => {
                        e.preventDefault();
                        this.onChangeHandler(e.target.value);
                    } }
                />
            </Modal>
        );
    }
}

export default SaveModal;
