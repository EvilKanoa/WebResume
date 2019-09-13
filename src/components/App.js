import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hot} from 'react-hot-loader';

import {getPrintMode, getResumeData, getModalElement} from 'reducer';
import Resume from 'components/resume/Resume';
import ActionBar from 'components/ActionBar';
import Editor from 'components/Editor';
import ModalContainer from 'components/modal/ModalContainer'
import {MessageContainer} from 'components/Messages';

@hot(module)
@connect(
    (state) => ({
        resumeData: getResumeData(state),
        printMode: getPrintMode(state),
        modalMode: !!getModalElement(state)
    })
)
class App extends Component {
    render() {
        const {
            resumeData,
            printMode,
            modalMode,
            collabId
        } = this.props;

        let className = '';
        if (printMode) className += ' print ';
        if (modalMode) className += ' modal ';

        return (
            <div id="app" className={className}>
                <ActionBar collabId={collabId}/>
                <Editor/>
                <Resume
                    data={resumeData.data}
                    type={resumeData.type || 'res'}
                />
                <ModalContainer/>
                <MessageContainer/>
            </div>
        );
    }
}

export default App;
