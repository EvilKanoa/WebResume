import React, {PureComponent} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    getRender,
    getResumeJSON,
    renderResume,
    blipPrintMode,
    showModal
} from 'reducer';
import LoadModal from 'components/action/LoadModal';
import SaveModal from 'components/action/SaveModal';

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
        blipPrintMode,
        showModal
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

    save = () => {
        this.props.showModal(SaveModal);
    };

    load = () => {
        this.props.showModal(LoadModal);
    };

    render() {
        return (
            <div id="action-bar">
                <ActionButton label="Load" onClick={this.load}/>
                <ActionButton label="Save" onClick={this.save}/>
                <ActionButton label="Collaborate"/>

                <ActionButton className="right" label="Print Resume" onClick={this.printResume}/>
                <ActionButton label="Render Markup" onClick={this.renderMarkup}/>
                <ActionButton label="Export JSON" onClick={this.downloadJSON}/>
            </div>
        )
    }
}

export default ActionBar;
