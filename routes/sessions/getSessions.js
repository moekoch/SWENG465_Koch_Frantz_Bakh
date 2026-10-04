const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get all sessions
 *     description: Retrieves a list of all sessions from the database
 *     tags: [Session]
 *     responses:
 *       200:
 *         description: A list of sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Session'
 *       500:
 *         description: Internal server error, failed to retrieve sessions
 */
const getSessions = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get sessions collection
    const sessions = db.collection('sessions');

    // retrieve all sessions from mongo
    const results = await sessions.find({}).toArray();

    // return ok status and array of sessions
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving sessions:', error);
    res.status(500).json({error: 'Failed to retrieve sessions.'});
  }
};

module.exports = getSessions;