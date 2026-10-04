const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/chats/{id}:
 *   get:
 *     summary: Get a chat
 *     description: Retrieves a chat channel by its ID.
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the chat
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     responses:
 *       200:
 *         description: Chat retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error, failed to retrieve chat
 */
const getChat = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get chat collection
        const chats = db.collection('chats');

        // retrieve chat by ID
        const chat = await chats.findOne({
            _id: new ObjectId(req.params.id)
        });

        // check if chat exists
        if (!chat) {
            return res.status(404).json({
                error: 'Chat not found.'
            });
        }

        // return ok status and chat data
        res.status(200).json(chat);
    } catch (error) {
        console.error('Error retrieving chat:', error);
        res.status(500).json({error: 'Failed to retrieve chat.'});
    }
};

module.exports = getChat;