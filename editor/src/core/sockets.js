import io from 'socket.io-client';

import store from 'core/store';
import {setCollabId, getCollabId} from 'reducer';

const actionListener = (action) => {
    if (action) store.dispatch(action);
};

const setup = () => {
    const href = window.location.href.toString();
    const collab = href.indexOf('collab');
    if (collab > 0) {
        const id = href.substring(collab + 7).replace(/\/.*/i, '');
        store.dispatch(setCollabId(id));

        window.collabSocket = io(`/${id}`);
        window.collabSocket.on('action', actionListener);
    }
};

const middleware = (store) => (next) => (action) => {
    if (action.collab === true && getCollabId(store.getState())) {
        window.collabSocket.emit('action', {
            ...action,
            collab: false
        });
    }
    return next(action);
};

export { setup as default, middleware };
