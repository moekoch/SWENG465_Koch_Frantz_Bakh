const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get a session
 *     description: Retrieves a session by their ID.
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
 *         description: Session retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error, failed to retrieve session
 */
const getSession = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get sessions collection
        const sessions = db.collection('sessions');

        // retrieve session by ID
        const session = await sessions.findOne({
            _id: new ObjectId(req.params.id)
        });

        // check if session exists
        if (!session) {
            return res.status(404).json({
                error: 'Session not found.'
            });
        }

        // return ok status and session data
        res.status(200).json(session);

    } catch (error) {
        console.error('Error retrieving session:', error);

        res.status(500).json({
            error: 'Failed to retrieve session.'
        });
    }
};

module.exports = getSession;