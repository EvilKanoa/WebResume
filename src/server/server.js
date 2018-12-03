require('dotenv').config();

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const sockets = require('./redux/sockets');

const app = express();
const server = http.Server(app);
sockets.use(server);
app.use(bodyParser.json());

// serve react SPA
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../dist')));
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

// redirect 404 to index
app.use((req, res) => {
    res.redirect(301, '/');
});

server.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}.`)
);
