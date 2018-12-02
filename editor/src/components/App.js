import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getResumeData, setResumeData} from 'reducer';
import Resume from 'components/resume/Resume';

@connect(
    (state) => ({
        resumeData: getResumeData(state)
    }),
    (dispatch) => bindActionCreators({
        setResumeData
    }, dispatch)
)
class App extends Component {
    render() {
        const {
            resumeData,
            setResumeData
        } = this.props;

        return (
            <div id="app" ref={(div) => this.div = div}>
                <Resume data={resumeData.data} update={setResumeData}/>
            </div>
        );
    }
}

export default App;
