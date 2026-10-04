const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session
 *     description: Deletes a session by their ID
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the session
 *         schema:
 *           type: string
 *           example: 507f1f77bcf86cd799439011
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Session deleted successfully
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error, failed to delete session
 */
const deleteSession = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get sessions collection
        const sessions = db.collection('sessions');

        // delete the session by ID
        const result = await sessions.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        // check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Session not found.'
            });
        }

        // send ok status and message of success
        res.status(200).json({message: 'Session deleted successfully.'});
    } catch (error) {
        console.error('Error deleting session:', error);
        res.status(500).json({error: 'Failed to delete session.'});
    }
};

module.exports = deleteSession;