const bcrypt = require('bcrypt');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user. The password is hashed before it is stored.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request, missing required fields or invalid data types
 *       409:
 *         description: Username or email is already taken
 *       500:
 *         description: Internal server error, failed to create user
 */
const createUser = async (req, res) => {
  // get data from request body
  const { username, password, email, id } = req.body;

  // POST endpoint check to ensure the data sent from the client is valid
  if (!username || !password || !email) {
    return res.status(400).json({
      error: 'Missing required fields: username, password, and email are required.'
    });
  }
  // id is optional, but if it is sent it must be a number
  if (id !== undefined && typeof id !== 'number') {
    return res.status(400).json({
      error: 'Invalid data type: id must be a number.'
    });
  }
  if (typeof password !== 'string' || password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters.'
    });
  }
  // very basic format check: something@something.something
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      error: 'Invalid email address.'
    });
  }

  // store emails in one form so "A@x.com" and "a@x.com" count as the same
  const normalizedEmail = email.trim().toLowerCase();

  try {
    // get database and users collection
    const db = getDB();
    const users = db.collection('users');

    // usernames and emails must be unique
    const existing = await users.findOne({
      $or: [{ username }, { email: normalizedEmail }]
    });
    if (existing) {
      const error = existing.username === username
        ? 'Username is already taken.'
        : 'Email is already registered.';
      return res.status(409).json({ error });
    }

    // hash the password (bcrypt adds a unique salt automatically)
    const passwordHash = await bcrypt.hash(password, 12);

    // store the hash, never the password itself
    const newUser = { username, passwordHash, email: normalizedEmail };
    if (id !== undefined) newUser.id = id;
    const result = await users.insertOne(newUser);

    // respond without the hash
    res.status(201).json({
      _id: result.insertedId,
      username,
      email: normalizedEmail,
      ...(id !== undefined && { id })
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
};

module.exports = createUser;