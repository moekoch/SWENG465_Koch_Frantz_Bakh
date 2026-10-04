const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/chats/{id}:
 *   put:
 *     summary: Update a chat
 *     description: Updates one or more fields of an existing chat.
 *     tags: [Chat]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the chat
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the chat
 *                 example: Study Session
 *               participants:
 *                 type: array
 *                 description: IDs of users participating in the chat
 *                 items:
 *                   type: string
 *                 example:
 *                   - 68e2f555555555abcdef789
 *                   - 68e2f666666666abcdef890
 *     responses:
 *       200:
 *         description: Chat updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: No fields were provided or participants has an invalid data type
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error, failed to update chat
 */
const updateChat = async (req, res) => {
    try {
        // extract fields from request body
        const { name, participants } = req.body;

        // check that at least one field was provided
        if (name === undefined && participants === undefined) {
            return res.status(400).json({
                error: 'At least one field must be provided.'
            });
        }

        // validate participants if provided
        if (participants !== undefined && !Array.isArray(participants)) {
            return res.status(400).json({
                error: 'Invalid data type: participants must be an array.'
            });
        }

        // get database
        const db = getDB();

        // get chats collection
        const chats = db.collection('chats');

        // add fields to updates if they are provided
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (participants !== undefined) updates.participants = participants;

        // update the chat in the database
        const result = await chats.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        // check if any document was matched and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Chat not found.'
            });
        }

        // retrieve the updated chat
        const updatedChat = await chats.findOne({
            _id: new ObjectId(req.params.id)
        });

        // return ok status and updated avatar
        res.status(200).json(updatedChat);
    } catch (error) {
        console.error('Error updating chat:', error);
        res.status(500).json({error: 'Failed to update chat.'});
    }
};

module.exports = updateChat;