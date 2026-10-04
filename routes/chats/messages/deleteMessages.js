const { ObjectId } = require('mongodb');
const { getDB } = require('../../../services/database');

/**
 * @swagger
 * /api/chats/{chatID}/messages/{messageID}:
 *   delete:
 *     summary: Delete a message
 *     description: Deletes a message from a chat.
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
 *         description: Message deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Message deleted successfully.
 *       404:
 *         description: Message not found
 *       500:
 *         description: Internal server error, failed to delete message
 */
const deleteMessage = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get messages collection
        const messages = db.collection('messages');

        // delete the message by message ID and chat ID
        const result = await messages.deleteOne({
            _id: new ObjectId(req.params.messageID),
            chatID: new ObjectId(req.params.chatID)
        });

        // check if a message was found and deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Message not found.'
            });
        }

        // send ok status and message of success
        res.status(200).json({message: 'Message deleted successfully.'});
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({error: 'Failed to delete message.'});
    }
};

module.exports = deleteMessage;