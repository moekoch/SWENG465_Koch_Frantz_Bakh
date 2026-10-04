const { ObjectId } = require('mongodb');
const { getDB } = require('../../../services/database');

/**
 * @swagger
 * /api/chats/{chatID}/messages:
 *   post:
 *     summary: Create a new message
 *     description: Creates a new message in a chat.
 *     tags: [Message]
 *     parameters:
 *       - in: path
 *         name: chatID
 *         required: true
 *         description: The ID of the chat the message belongs to
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userID
 *               - body
 *             properties:
 *               userID:
 *                 type: string
 *                 description: ID of the user sending the message
 *                 example: 68e2f555555555abcdef789
 *               body:
 *                 type: string
 *                 description: Text content of the message
 *                 example: Hey everyone!
 *     responses:
 *       201:
 *         description: Message created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Message'
 *       400:
 *         description: Missing required fields
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal server error, failed to create message
 */
const createMessage = async (req, res) => {
    // get data from request body
    const { userID, body } = req.body;

    // check to ensure the data sent from the client is valid
    if (!userID || !body) {
        return res.status(400).json({error: 'Missing required fields: userID and body are required.'});
    }

    try {
        // get database
        const db = getDB();

        // get chats and messages collections
        const chats = db.collection('chats');
        const messages = db.collection('messages');

        // check that the chat exists
        const chat = await chats.findOne({_id: new ObjectId(req.params.chatID)});
        if (!chat) {
            return res.status(404).json({error: 'Chat not found.'});
        }

        // create message document
        const newMessage = {
            chatID: new ObjectId(req.params.chatID),
            userID: new ObjectId(userID),
            body: body,
            sentAt: new Date()
        };

        // insert document into database
        const result = await messages.insertOne(newMessage);

        // add mongo generated id to response
        newMessage._id = result.insertedId;

        // respond with created status and new message
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({error: 'Failed to create message.'});
    }
};

module.exports = createMessage;