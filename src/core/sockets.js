import io from 'socket.io-client';

let socket;
let collabId;

const currentCollabId = () => collabId;

const getActionListener = (store) => (action) => {
    if (action) store.dispatch(action);
};

const setup = async (newId, store) => {
    kill();
    if (newId) {
        const res = await fetch(
            `${window.location.protocol}//${window.location.host}/collab/${newId}`,
            {
                method: 'post',
                headers: {'Content-Type': 'application/json'}
            }
        );

        const data = await res.json();
        if (!data || data.id !== newId) {
            throw Error('Server rejected collaboration ID: ' + newId);
        }

        collabId = data.id;
        socket = io(`/${collabId}`);
        window.collabSocket = socket;
        socket.on('action', getActionListener(store));
    }
};

const kill = () => {
    if (socket) {
        socket.disconnect();
        socket = undefined;
        window.collabSocket = undefined;
    }

    if (collabId) {
        collabId = undefined;
    }
};

const middleware = () => (next) => (action) => {
    if (socket && action.remote === true) {
        socket.emit('action', {
            ...action,
            remote: false
        });
    }
    return next(action);
};

export { setup, middleware, kill, currentCollabId };
