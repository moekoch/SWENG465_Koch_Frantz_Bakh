const { ObjectId } = require('mongodb');
const { getDB } = require('../../../services/database');

/**
 * @swagger
 * /api/chats/{chatID}/messages/{messageID}:
 *   get:
 *     summary: Get a message
 *     description: Retrieves a specific message from a chat.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         required: true
 *         description: The ID of the chat
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *       - in: path
 *         name: messageID
 *         required: true
 *         description: The ID of the message
 *         schema:
 *           type: string
 *           example: 68e2f987654321abcdef456
 *     responses:
 *       200:
 *         description: Message retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error, failed to retrieve message
 */
const getMessage = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get messages collection
        const messages = db.collection('messages');

        // retrieve message by ID
        const message = await messages.findOne({
            _id: new ObjectId(req.params.messageID),
            chatID: new ObjectId(req.params.chatID)
        });

        // check if message exists
        if (!message) {
            return res.status(404).json({
                error: 'Message not found.'
            });
        }

        // return ok status and message data
        res.status(200).json(message);
    } catch (error) {
        console.error('Error retrieving message:', error);
        res.status(500).json({error: 'Failed to retrieve message.'});
    }
};

module.exports = getMessage;