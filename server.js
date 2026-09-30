// server.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./services/database');
const PORT = 3000;

//===================
// create express app
//===================

const app = express();
app.use(express.json());

//======================
// swagger configuration
//======================

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0', // specifies openapi version
        info: {
            title: 'Worquarium API',
            version: '1.0.0',
            description: 'API for leveraging Worquarium resources'
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'development server'
            }
        ]
    },
    apis: ['./routes/**/*.js'] // paths to files containing api definitions
};

// generate openapi specification
const specs = swaggerJsdoc(options);

//serve the swagger ui on a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//=======================
// import route functions
//=======================

// avatar
const createAvatar = require('./routes/avatars/createAvatar');
const getAvatars = require('./routes/avatars/getAvatars');

// bot
const createBot = require('./routes/bots/createBot');
const getBots = require('./routes/bots/getBots');

// user
const createUser = require('./routes/users/createUser');
const getUsers = require('./routes/users/getUsers');
const getUser = require('./routes/users/getUser');
const updateUser = require('./routes/users/updateUser');
const deleteUser = require('./routes/users/deleteUser');

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
app.post('/api/users', createUser);
app.get('/api/users', getUsers);
app.get('/api/users/:id', getUser);
app.put('/api/users/:id', updateUser);
app.delete('/api/users/:id', deleteUser);

//=================
// start the server
//=================
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(`Failed to connect to MongoDB: ${error}`);
    });