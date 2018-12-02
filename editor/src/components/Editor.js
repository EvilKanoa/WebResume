import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/theme/tomorrow';

import {getResumeJSON, setResume} from 'reducer';

@connect(
    (state) => ({
        json: getResumeJSON(state)
    }),
    (dispatch) => bindActionCreators({
        setResume
    }, dispatch)
)
class Editor extends PureComponent {
    onChange = (json) => {
        if (json !== this.props.json) {
            try {
                const data = JSON.parse(json);
                this.props.setResume(data);
            } catch (e) { }
        }
    };

    render() {
        return (
            <div id="editor">
                <AceEditor
                    mode="json"
                    theme="tomorrow"
                    showPrintMargin={true}
                    showGutter={true}
                    highlightActiveLine={true}
                    value={this.props.json}
                    width="100%"
                    height="100%"
                    onChange={this.onChange}
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        wrap: true
                    }}
                />
            </div>
        );
    }
}

export default Editor;
