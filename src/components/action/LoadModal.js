import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import storage from 'core/storage';
import {hideModal, setResume} from 'reducer';
import Modal from 'components/modal/Modal';
import FileList from 'components/action/FileList';

@connect(
    null,
    (dispatch) => bindActionCreators({
        hideModal,
        setResume
    }, dispatch)
)
class LoadModal extends PureComponent {
    state = {
        selected: ''
    };

    onChangeHandler = (selected) => {
        if (selected !== this.state.selected) {
            this.setState({
                selected
            });
        }
    };

    load = () => {
        const file = storage.loadFile(this.state.selected);

        if (file) {
            this.props.setResume(file.data);
            this.props.hideModal();
        }
    };

    render() {
        return (
            <Modal
                title="Load Resume"
                onClose={this.props.hideModal}
                onAction={this.load}
                actionLabel="Load"
            >
                <FileList
                    selected={this.state.selected}
                    onChange={this.onChangeHandler}
                />
            </Modal>
        );
    }
}

export default LoadModal;
