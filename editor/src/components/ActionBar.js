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

const CollaborateModal = () => (
    <div style={{
        width: '400px',
        height: '100px',
        fontSize: '18pt',
        padding: '2rem',
        lineHeight: '100px',
        textAlign: 'center'
    }}>
        <span>Generating collaboration space...</span>
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

    collaborate = async () => {
        this.props.showModal(CollaborateModal);
        const res = await fetch('http://localhost:8080/collab', {
            method: 'post'
        });
        const id = await res.json();
        console.log('Editor ID ', id);
    };

    render() {
        return (
            <div id="action-bar">
                <ActionButton label="Load" onClick={this.load}/>
                <ActionButton label="Save" onClick={this.save}/>
                <ActionButton label="Collaborate" onClick={this.collaborate}/>

                <ActionButton className="right" label="Print Resume" onClick={this.printResume}/>
                <ActionButton label="Render Markup" onClick={this.renderMarkup}/>
                <ActionButton label="Export JSON" onClick={this.downloadJSON}/>
            </div>
        )
    }
}

export default ActionBar;
