const { ObjectId } = require('mongodb');
const { getDB } = require('../../../services/database');

/**
 * @swagger
 * /api/chats/{chatID}/messages/{messageID}:
 *   put:
 *     summary: Update a message
 *     description: Updates the text content of an existing message.
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - body
 *             properties:
 *               body:
 *                 type: string
 *                 description: Updated text content of the message
 *                 example: Hey everyone! I am ready to start.
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Message body is required
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error, failed to update message
 */
const updateMessage = async (req, res) => {
    try {
        // extract fields from request body
        const { body } = req.body;

        // validate body if provided
        if (body === undefined || body === '') {
            return res.status(400).json({
                error: 'Message body is required.'
            });
        }

        // get database
        const db = getDB();

        // get messages collection
        const messages = db.collection('messages');

        // update the message by message ID and chat ID
        const result = await messages.updateOne(
            {
                _id: new ObjectId(req.params.messageID),
                chatID: new ObjectId(req.params.chatID)
            },
            {
                $set: {
                    body: body
                }
            }
        );

        // check if a message was found and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Message not found.'
            });
        }

        // retrieve the updated message
        const updatedMessage = await messages.findOne({
            _id: new ObjectId(req.params.messageID),
            chatID: new ObjectId(req.params.chatID)
        });

        // return the updated message
        res.status(200).json(updatedMessage);
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({error: 'Failed to update message.'});
    }
};

module.exports = updateMessage;