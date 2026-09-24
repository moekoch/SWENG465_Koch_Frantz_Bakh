//DELETE - delete one user
const deleteUser = (req, res) => {
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
};

module.exports = deleteUser;