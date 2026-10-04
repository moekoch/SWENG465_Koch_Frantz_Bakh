const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieves a list of all users from the database
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error, failed to retrieve users
 */
const getUsers = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get users collection
    const users = db.collection('users');

    // retrieve all users from mongo
    const results = await users.find({}).toArray();

    // return ok status and array of users
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({error: 'Failed to retrieve users.'});
  }
};

module.exports = getUsers;