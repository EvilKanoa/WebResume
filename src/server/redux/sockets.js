const socketio = require('socket.io');
const stores = require('./manager');

let io;
let channels = {};

const use = (server) => {
    io = socketio(server);
};

const createChannel = (id) => {
    if (!channels[id]) {
        channels[id] = io.of(`/${id}`);
        channels[id].on('connection', connectHandler(id));
    }
    return channels[id]
};

const connectHandler = (id) => (socket) => {
    socket.on('action', actionHandler(id, socket));
    setTimeout(() => {
        socket.emit('action', {
            type: 'SET_STATE',
            data: stores.getStore(id).getState()
        });
    }, 100);
};

const actionHandler = (id, socket) => (action) => {
    if (!action) return;

    stores.getStore(id).dispatch(action);
    socket.broadcast.emit('action', action);
};

const routes = (app) => {
    app.post('/collab', (req, res) => {
        const id = stores.createStore(req.body);
        createChannel(id);

        res.json({ id });
    });

    app.post('/collab/:collabId', (req, res) => {
        const id = stores.createStore(null, req.params.collabId);
        createChannel(id);

        res.json({ id });
    });
};

module.exports = {
    use,
    routes
};
