//GET - get one user's info
const getUser = (req, res) => {
  const userId = Number(req.params.id);

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }

  res.status(200).json(user);
};

module.exports = getUser;