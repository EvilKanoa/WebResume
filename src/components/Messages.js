import React, {PureComponent} from 'react';
import './Messages.scss';

const containers = [];
const update = () => containers.forEach((container) => container.forceUpdate());

const messages = [];

const addMessage = (type) => (contents, delay = 4000) => {
    const message = { type, contents };
    messages.unshift(message);
    update();
    setTimeout(() => {
        const idx = messages.indexOf(message);
        if (idx > -1) {
            messages.splice(idx, 1);
            update();
        }
    }, delay);
};

const error = addMessage('error');
const warn = addMessage('warn');
const info = addMessage('info');
const success = addMessage('success');
const message = (type, ...rest) => addMessage(type)(...rest);

const icons = {
    'error': <i className="icon fas fa-times-circle"></i>,
    'warn': <i className="icon fas fa-exclamation-triangle"></i>,
    'info': <i className="icon fas fa-info-circle"></i>,
    'success': <i className="icon fas fa-check-circle"></i>,
};

const Message = ({ type, contents }) => (
    <div className={'message ' + type}>
        { icons[type] }
        <div className="message-body">
            { contents }
        </div>
    </div>
);

class MessageContainer extends PureComponent {
    componentDidMount() {
        containers.push(this);
    }

    componentWillUnmount() {
        const idx = containers.indexOf(this);
        if (idx > -1) {
            containers.splice(idx, 1);
        }
    }

    render() {
        return (
            <div id="message-container">
                { messages.map(
                    (message, idx) => (
                        <Message
                            key={message.type + message.contents + idx}
                            {...message}
                        />
                    )
                ) }
            </div>
        );
    }
}

const actions = {
    error,
    warn,
    info,
    success,
    message
};

export { MessageContainer, Message, actions as default };
