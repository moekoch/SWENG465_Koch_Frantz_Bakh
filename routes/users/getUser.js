const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user
 *     description: Retrieves a user by their ID.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the user
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error, failed to retrieve user
 */
const getUser = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get users collection
        const users = db.collection('users');

        // retrieve user by ID
        const user = await users.findOne({
            _id: new ObjectId(req.params.id)
        });

        // check if user exists
        if (!user) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        // return ok status and user data
        res.status(200).json(user);

    } catch (error) {
        console.error('Error retrieving user:', error);

        res.status(500).json({
            error: 'Failed to retrieve user.'
        });
    }
};

module.exports = getUser;