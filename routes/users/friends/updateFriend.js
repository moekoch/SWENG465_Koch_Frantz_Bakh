const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/friends/{id}:
 *   put:
 *     summary: Update a friend
 *     description: Updates one or more fields of an existing friend.
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the friend
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
 *                 description: The name of the friend
 *                 example: John Doe
 *               status:
 *                 type: boolean
 *                 description: The online status of the friend
 *                 example: true
 *               email:
 *                 type: string
 *                 description: The email of the friend
 *                 example: john.doe@example.com
 *     responses:
 *       200:
 *         description: Friend updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Friend'
 *       400:
 *         description: No fields were provided or price has an invalid data type
 *       404:
 *         description: Friend not found
 *       500:
 *         description: Internal server error, failed to update friend
 */
const updateFriend = async (req, res) => {
    try {
        // extract fields from request body
        const { name, status, email } = req.body;

        // check that at least one field was provided
        if (name === undefined && status === undefined && email === undefined) {
            return res.status(400).json({error: 'At least one field must be provided.'});
        }

        // get database
        const db = getDB();

        // get friends collection
        const friends = db.collection('friends');

        // add fields to updates if they are provided
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (status !== undefined) updates.status = status;
        if (email !== undefined) updates.email = email;

        // update the friend in the database
        const result = await friends.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        // check if any document was matched and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Friend not found.'
            });
        }

        // retrieve the updated friend
        const updatedFriend = await friends.findOne({
            _id: new ObjectId(req.params.id)
        });

        // return the updated friend
        res.status(200).json(updatedFriend);
    } catch (error) {
        console.error('Error updating friend:', error);
        res.status(500).json({error: 'Failed to update friend.'});
    }
};

module.exports = updateFriend;
