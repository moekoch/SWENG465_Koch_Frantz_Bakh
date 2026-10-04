const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/friends/{id}:
 *   get:
 *     summary: Get a friend
 *     description: Retrieves a friend by their ID.
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the friend
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Friend retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Friend'
 *       404:
 *         description: Friend not found
 *       500:
 *         description: Internal server error, failed to retrieve friend
 */
const getFriend = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get friends collection
        const friends = db.collection('friends');

        // retrieve friend by ID
        const friend = await friends.findOne({
            _id: new ObjectId(req.params.id)
        });

        // check if friend exists
        if (!friend) {
            return res.status(404).json({
                error: 'Friend not found.'
            });
        }

        // return ok status and friend data
        res.status(200).json(friend);

    } catch (error) {
        console.error('Error retrieving friend:', error);

        res.status(500).json({
            error: 'Failed to retrieve friend.'
        });
    }
};

module.exports = getFriend;