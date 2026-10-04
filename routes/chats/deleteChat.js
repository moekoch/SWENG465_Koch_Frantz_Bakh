const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/chats/{id}:
 *   delete:
 *     summary: Delete a chat
 *     description: Deletes a chat channel by its ID.
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
 *         description: Chat deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chat deleted successfully.
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error, failed to delete chat
 */
const deleteChat = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get chat collection
        const chats = db.collection('chats');

        // delete chat by ID
        const result = await chats.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        // check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Chat not found.'
            });
        }

        // send ok status and message of success
        res.status(200).json({message: 'Chat deleted successfully.'});
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({error: 'Failed to delete chat.'});
    }
};

module.exports = deleteChat;