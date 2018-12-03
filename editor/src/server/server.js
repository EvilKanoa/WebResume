require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const sockets = require('./redux/sockets');

const app = express();
const server = http.Server(app);
sockets.use(server);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
} else {
    console.log('webpack building...');
    const config = require(path.resolve(__dirname, '../../webpack.dev.js'))(process.env);
    const compiler = require('webpack')(config);

    app.use(require('webpack-dev-middleware')(compiler, {
        publicPath: '/',
        watchOptions: { aggregateTimeout: 1000 },
        logLevel: 'warn'
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}

sockets.routes(app);

server.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}.`)
);
