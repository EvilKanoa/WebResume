require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, '../../dist')));
}

app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.PORT}.`)
);
