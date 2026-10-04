const { ObjectId } = require('mongodb');
const { getDB } = require('../../../services/database');

/**
 * @swagger
 * /api/chats/{chatID}/messages:
 *   get:
 *     summary: Get all messages in a chat
 *     description: Retrieves all messages belonging to a specific chat.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         required: true
 *         description: The ID of the chat
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error, failed to retrieve messages
 */
const getMessages = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get chats and messages collections
        const chats = db.collection('chats');
        const messages = db.collection('messages');

        // check that the chat exists
        const chat = await chats.findOne({
            _id: new ObjectId(req.params.chatID)
        });
        if (!chat) {
            return res.status(404).json({error: 'Chat not found.'});
        }

        // retrieve all messages from mongo
        const results = await messages
            .find({
                chatID: new ObjectId(req.params.chatID)
            })
            .sort({ sentAt: 1 })
            .toArray();

        // return ok status and array of messages
        res.status(200).json(results);
    } catch (error) {
        console.error('Error retrieving messages:', error);
        res.status(500).json({error: 'Failed to retrieve messages.'});
    }
};

module.exports = getMessages;