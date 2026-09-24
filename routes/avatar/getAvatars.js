// GET endpoint to retrieve all instances of the Avatar resource
const getAvatars = (req, res) => {
  //return ok status and array of avatars
  res.status(200).json(avatars);
};

module.exports = getAvatars;