//server.js
const express = require('express');

//import route functions
const createAvatar = require('.routes/avatar/createAvatar');
const getAvatars = require('.routes/avatar/getAvatars');

//create express app
const app = express();
app.use(express.json());

//create API endpoints
app.post('api/avatars', createAvatar);
app.get('api/avatars', getAvatars);

//a simple array to act as our "database"
let users = [];

//=====================
//Bobby - User Resource
//=====================

//GET - get all users
app.get('/api/users', (req, res) => {
	res.status(200).json(users);
});

//GET - get one user's info
app.get('/api/users/:id', (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  res.status(200).json(user);
});

//POST - create a new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Name and email are required'
      });
    }

    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      return res.status(409).json({
      	message: 'A user with that email already exists'
      });
    }

    const newUser = {
      id: nextUserId++,
      name,
      email
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

//PUT - Update one user's info
app.put('/api/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: 'Name and email are required'
    });
  }

  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  const emailAlreadyUsed = users.find(
    (user) => user.email === email && user.id !== userId
  );

  if (emailAlreadyUsed) {
    return res.status(409).json({
      message: 'A different user already uses that email'
    });
  }

  const updatedUser = {
    id: userId,
    name,
    email
  };

  users[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
});

//DELETE - delete one user
app.delete('/api/users/:id', (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({
      message: 'User not found'
    });
  }
  const deletedUser = users.splice(userIndex, 1);

  res.status(200).json({
    message: 'User deleted successfully',
    user: deletedUser[0]
  });
});


//==================
// Morgan - Bot Resource
//==================

//simple array to store bot instances
let bots = [];

//GET endpoint to retrieve all bots
app.get('/api/bots', (req, res) => {
  res.status(200).json(bots);
});

//POST endpoint to create a new bot
app.post('/api/bots', (req, res) => {
  // 1. Get data from the request body
  const { name, gameType } = req.body;

  //basic validation: check if required fields exist
  if (!name || !gameType) {
    return res.status(400).json({
      error: 'Missing required fields: name and gameType are required.'
    });
  }

  //check that gameType is a valid string
  if (typeof gameType !== 'string') {
    return res.status(400).json({
      error: 'Invalid data type: gameType must be a string.'
    });
  }

  //create a new bot object and push to the array
  const newBot = {
    id: bots.length + 1,
    name: name,
    gameType: gameType, //"Go-Fish" or "Blackjack"
    score: 0
  };
  bots.push(newBot);

  //respond with a created status and new bot object
  res.status(201).json(newBot);
});

//start the server
const PORT = 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));