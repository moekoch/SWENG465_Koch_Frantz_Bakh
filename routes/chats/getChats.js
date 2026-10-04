const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/chats:
 *   get:
 *     summary: Get all chats
 *     description: Retrieves all chat channels.
 *     tags: [Chat]
 *     responses:
 *       200:
 *         description: Chats retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 *       500:
 *         description: Internal server error, failed to retrieve chats
 */
const getChats = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get chats collection
        const chats = db.collection('chats');

        // retrieve all chats from database
        const results = await chats.find({}).toArray();

        // return ok status and array of chats
        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving chats:', error);
        res.status(500).json({error: 'Failed to retrieve chats.'});
    }
};

module.exports = getChats;