//POST - create a new user
const createUser = (req, res) => {
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
};

module.exports = createUser;