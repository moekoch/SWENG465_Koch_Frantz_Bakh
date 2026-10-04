const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Updates one or more fields of an existing user.
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the user
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The email of the user
 *                 example: john.doe@example.com
 *               id:
 *                 type: number
 *                 description: The ID of the user
 *                 example: 1
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: No fields were provided or price has an invalid data type
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error, failed to update user
 */
const updateUser = async (req, res) => {
    try {
        // extract fields from request body
        const { name, email } = req.body;

        // check that at least one field was provided
        if (name === undefined && email === undefined) {
            return res.status(400).json({error: 'At least one field must be provided.'});
        }

        // get database
        const db = getDB();

        // get users collection
        const users = db.collection('users');

        // add fields to updates if they are provided
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (email !== undefined) updates.email = email;

        // update the user in the database
        const result = await users.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        // check if any document was matched and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        // retrieve the updated user
        const updatedUser = await users.findOne({
            _id: new ObjectId(req.params.id)
        });

        // return the updated user
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({error: 'Failed to update user.'});
    }
};

module.exports = updateUser;
