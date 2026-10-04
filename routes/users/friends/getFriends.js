const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Get all friends
 *     description: Retrieves a list of all friends from the database
 *     tags: [Friend]
 *     responses:
 *       200:
 *         description: A list of friends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Friend'
 *       500:
 *         description: Internal server error, failed to retrieve friends
 */
const getFriends = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get friends collection
    const friends = db.collection('friends');

    // retrieve all friends from mongo
    const results = await friends.find({}).toArray();

    // return ok status and array of friends
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving friends:', error);
    res.status(500).json({error: 'Failed to retrieve friends.'});
  }
};

module.exports = getFriends;