//PUT - Update one user's info
const updateUser = (req, res) => {
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
};

module.exports = updateUser;