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
    setTimeout(async () => {
        socket.emit('action', {
            type: 'SET_STATE',
            data: (await stores.getStore(id)).getState()
        });
    }, 100);
};

const actionHandler = (id, socket) => async (action) => {
    if (!action) return;

    (await stores.getStore(id)).dispatch(action);
    socket.broadcast.emit('action', action);
};

const routes = (app) => {
    app.post('/collab', async (req, res) => {
        const id = stores.id();
        await stores.getStore(id, req.body);
        createChannel(id);

        res.json({ id });
    });

    app.post('/collab/:collabId', async (req, res) => {
        const id = req.params.collabId;
        await stores.getStore(id);
        createChannel(id);

        res.json({ id });
    });
};

module.exports = {
    use,
    routes
};
