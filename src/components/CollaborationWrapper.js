import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import App from 'components/App';
import Messages from 'components/Messages';
import {setup, currentCollabId, kill} from 'core/sockets';
import store from 'core/store';

@withRouter
class CollaborationWrapper extends Component {
    componentDidMount() {
        this.checkForSetup();
    }

    componentDidUpdate() {
        this.checkForSetup();
    }

    componentWillUnmount() {
        kill();
    }

    checkForSetup = () => {
        if (this.collabId() && this.collabId() !== currentCollabId()) {
            Messages.info('Connecting to collaboration space...');
            setup(this.collabId(), store).then(() => {
                Messages.success('Connected to collaboration space.', 4500);
                this.forceUpdate();
            });
        }
    };

    collabId = () =>
        this.props.match &&
        this.props.match.params &&
        this.props.match.params['collabId'];

    render() {
        return <App collabId={currentCollabId()}/>;
    }
}

export { CollaborationWrapper as WrappedApp, App };
