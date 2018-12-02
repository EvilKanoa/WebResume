import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getResumeData, setResume} from 'reducer';

@connect(
    (state) => ({
        data: getResumeData(state)
    }),
    (dispatch) => bindActionCreators({
        setResume
    }, dispatch)
)
class Editor extends PureComponent {
    render() {
        return (
            <div id="editor">

            </div>
        );
    }
}

export default Editor;
