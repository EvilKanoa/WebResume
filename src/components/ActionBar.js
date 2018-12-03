import React, {PureComponent} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';

import {
    getRender,
    getResumeJSON,
    renderResume,
    blipPrintMode,
    showModal
} from 'reducer';
import Messages from 'components/Messages';
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

@withRouter
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
        Messages.info('Downloading markup...');
    };

    downloadJSON = () => {
        const element = document.createElement('a');

        element.href = URL.createObjectURL(new Blob([this.props.json]), { type: 'application/json' });
        element.download = 'resume.json';
        element.click();
        Messages.info('Downloading JSON...');
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
        Messages.info('Generating collaboration space...');
        const res = await fetch(
            `${window.location.protocol}//${window.location.host}/collab`,
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: `{"resume":${this.props.json}}`
            }
        );
        const { id } = await res.json();
        this.props.history.push('/' + id);
    };

    collabIndicatorOnClick = (e) => {
        e.preventDefault();
        if (this.linkNode) {
            window.getSelection().selectAllChildren(this.linkNode);
            document.execCommand('copy');
            Messages.success('Copied to clipboard.');
        }
    };

    leaveCollaboration = () => {
        this.props.history.push('/');
        Messages.info('Disconnected from collaboration space.');
    };

    render() {
        return (
            <div id="action-bar">
                <ActionButton label="Load" onClick={this.load}/>
                <ActionButton label="Save" onClick={this.save}/>
                { this.props.collabId &&
                    <ActionButton label="Leave Collaboration" onClick={this.leaveCollaboration}/>
                }
                { this.props.collabId &&
                    <span className="collab-indicator">
                        Collaborating: <a
                            onClick={this.collabIndicatorOnClick}
                            href={window.location.href}
                            ref={(a) => this.linkNode = a}
                        >
                            { `${window.location.host}/${window.location.hash}` }
                        </a>
                    </span>
                }
                { !this.props.collabId &&
                    <ActionButton label="Collaborate" onClick={this.collaborate}/>
                }

                <ActionButton className="right" label="Print Resume" onClick={this.printResume}/>
                <ActionButton label="Render Markup" onClick={this.renderMarkup}/>
                <ActionButton label="Export JSON" onClick={this.downloadJSON}/>
            </div>
        )
    }
}

export default ActionBar;
