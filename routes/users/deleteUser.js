const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user by their ID
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
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error, failed to delete user
 */
const deleteUser = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get users collection
        const users = db.collection('users');

        // delete the user by ID
        const result = await users.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        // check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'User not found.'
            });
        }

        // send ok status and message of success
        res.status(200).json({message: 'User deleted successfully.'});
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({error: 'Failed to delete user.'});
    }
};

module.exports = deleteUser;