const socketio = require('socket.io');
const stores = require('./manager');

let io;

const use = (server) => {
    io = socketio(server);
};

const createChannel = (id) => {
    const channel = io.of(`/${id}`);
    channel.on('connection', connectHandler(id));
    return channel;
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
        const id = stores.createStore(req.params.state);
        createChannel(id);

        res.json({ id });
    });
};

module.exports = {
    use,
    routes
};
