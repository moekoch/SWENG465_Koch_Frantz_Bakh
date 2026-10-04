const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/chats:
 *   post:
 *     summary: Create a new chat
 *     description: Creates a new chat channel with a name and list of participants.
 *     tags: [Chat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - participants
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the chat
 *                 example: General
 *               participants:
 *                 type: array
 *                 description: IDs of users participating in the chat
 *                 items:
 *                   type: string
 *                 example:
 *                   - 68e2f555555555abcdef789
 *                   - 68e2f666666666abcdef890
 *     responses:
 *       201:
 *         description: Chat created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       400:
 *         description: Missing required fields or invalid data
 *       500:
 *         description: Internal server error, failed to create chat
 */
const createChat = async (req, res) => {
    // get data from request body
    const { name, participants } = req.body;

    // check to ensure the data sent from the client is valid
    if (!name || !participants) {
        return res.status(400).json({
            error: 'Missing required fields: name and participants are required.'
        });
    }

    // check that participants is an array
    if (!Array.isArray(participants)) {
        return res.status(400).json({
            error: 'Invalid data type: participants must be an array.'
        });
    }

    try {
        // get database
        const db = getDB();

        // get chat collection
        const chats = db.collection('chats');

        // create chat document
        const newChat = {
            name: name,
            participants: participants,
            createdAt: new Date()
        };

        // insert document into mongo
        const result = await chats.insertOne(newChat);

        // add mongo generated ID to response
        newChat._id = result.insertedId;

        // respond with created status and new chat
        res.status(201).json(newChat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({error: 'Failed to create chat.'});
    }
};

module.exports = createChat;