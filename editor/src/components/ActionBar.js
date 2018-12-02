import React, {PureComponent} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getRender, getResumeJSON, renderResume, blipPrintMode} from 'reducer';

const ActionButton = ({
    onClick = () => {},
    className = '',
    label = '',
    ...rest
}) => (
    <div className={'button ' + className} onClick={(e) => {
        e.preventDefault();
        onClick(e);
    }} {...rest}>
        { label }
    </div>
);

@connect(
    (state) => ({
        render: getRender(state),
        json: getResumeJSON(state)
    }),
    (dispatch) => bindActionCreators({
        renderResume,
        blipPrintMode
    }, dispatch)
)
class ActionBar extends PureComponent {
    renderMarkup = async () => {
        const html = await this.props.renderResume();
        const element = document.createElement('a');

        element.href = URL.createObjectURL(new Blob([html]), { type: 'text/plain' });
        element.download = 'resume.html';
        element.click();
    };

    downloadJSON = () => {
        const element = document.createElement('a');

        element.href = URL.createObjectURL(new Blob([this.props.json]), { type: 'application/json' });
        element.download = 'resume.json';
        element.click();
    };

    printResume = () => {
        this.props.blipPrintMode(50, () => {
            window.print();
        });
    };

    render() {
        return (
            <div id="action-bar">
                <ActionButton label="Print Resume" onClick={this.printResume}/>
                <ActionButton label="Render Markup" onClick={this.renderMarkup}/>
                <ActionButton label="Export JSON" onClick={this.downloadJSON}/>
            </div>
        )
    }
}

export default ActionBar;
