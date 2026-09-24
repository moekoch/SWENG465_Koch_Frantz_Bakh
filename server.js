// server.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./services/database')

//=======================
// import route functions
//=======================

// avatar
const createAvatar = require('./routes/avatar/createAvatar');
const getAvatars = require('./routes/avatar/getAvatars');

// bot
const createBot = require('./routes/bot/createBot');
const getBots = require('./routes/bot/getBots');

// user
const createUser = require('./routes/user/createUser');
const getUsers = require('./routes/user/getUsers');
const getUser = require('./routes/user/getUser');
const updateUser = require('./routes/user/updateUser');
const deleteUser = require('./routes/user/deleteUser');

//===================
// create express app
//===================

const app = express();
app.use(express.json());

//=====================
// create API endpoints
//=====================

// avatar
app.post('/api/avatars', createAvatar);
app.get('/api/avatars', getAvatars);

// bot
app.post('/api/bots', createBot);
app.get('/api/bots', getBots);

// user
app.post('/api/user', createUser);
app.get('/api/user', getUsers);
app.get('/api/user/:id', getUser);
app.put('/api/user/:id', updateUser);
app.delete('/api/user/:id', deleteUser);

//=================
// start the server
//=================
const PORT = 3000;
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error}`);
    });