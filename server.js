//server.js

const express = require('express');
const app = express();
app.use(express.json());

//a simple array to act as our "database"
let users = [];

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

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log('Server running on port ${PORT}'));