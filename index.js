const express = require('express');
const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

const DEFAULT_PORT = 3000;
const port = process.env.PORT || DEFAULT_PORT;
const isProduction = process.env.NODE_ENV === 'production';

const clients = {};

const app = express();

const server = app.listen(port, () => {
    console.log(`listening on ${port}`);
});

if (!isProduction) {
    app.use(devMiddleware(compiler));
    app.use(hotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, isProduction ? 'dist' : 'public')));
app.get('/verify-username', (req, res) => {
    if (clients[req.query.username]) {
        return res.status(400).send({message: 'Username already taken'});
    }
    return res.send({message: 'OK'});
});

const io = require('socket.io')(server);

io.on('connection', (client) => {
    client.on('sign-in', e => {
        const {userId} = e;
        if (!userId) return;
        client.userId = userId;
        clients[userId] = client;
        const restOfUsers =  _.chain(clients)
            .keys()
            .filter(c => c !== userId)
            .value();
        client.emit('sign-in-done', {
            userId,
            users: restOfUsers
        });
        client.broadcast.emit('sign-in', {userId});
    });

    client.on('typing', ({userId, typing}) => {
        client.broadcast.emit('user-typing', {typing, userId});
    })
    client.on('message', e => {
        const {message, userId, date} = e;
        io.emit('message', ({userId, message, date}));
    });

    client.on('disconnect', () => {
        if (!client.userId || !clients[client.userId]) {
            return;
        }
        client.broadcast.emit('sign-out', {userId: client.userId});
        delete clients[client.userId];

    });
});
