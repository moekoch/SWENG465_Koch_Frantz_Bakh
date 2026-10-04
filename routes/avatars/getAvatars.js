const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/avatars:
 *   get:
 *     summary: Get all avatars
 *     description: Retrieves a list of all avatars from the database
 *     tags: [Avatar]
 *     responses:
 *       200:
 *         description: A list of avatars
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Avatar'
 *       500:
 *         description: Internal server error, failed to retrieve avatars
 */
const getAvatars = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get avatars collection
    const avatars = db.collection('avatars');

    // retrieve all avatars from mongo
    const results = await avatars.find({}).toArray();

    // return ok status and array of avatars
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving avatars:', error);
    res.status(500).json({error: 'Failed to retrieve avatars.'});
  }
};

module.exports = getAvatars;