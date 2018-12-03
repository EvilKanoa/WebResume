import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {hot} from 'react-hot-loader';

import {getPrintMode, getResumeData, setResumeData, getModalElement} from 'reducer';
import Resume from 'components/resume/Resume';
import ActionBar from 'components/ActionBar';
import Editor from 'components/Editor';
import ModalContainer from 'components/modal/ModalContainer'

@hot(module)
@connect(
    (state) => ({
        resumeData: getResumeData(state),
        printMode: getPrintMode(state),
        modalMode: !!getModalElement(state)
    }),
    (dispatch) => bindActionCreators({
        setResumeData
    }, dispatch)
)
class App extends Component {
    render() {
        const {
            resumeData,
            setResumeData,
            printMode,
            modalMode
        } = this.props;

        let className = '';
        if (printMode) className += ' print ';
        if (modalMode) className += ' modal ';

        return (
            <div id="app" className={className}>
                <ActionBar/>
                <Editor/>
                <Resume
                    data={resumeData.data}
                    update={setResumeData}
                />
                <ModalContainer/>
            </div>
        );
    }
}

export default App;
