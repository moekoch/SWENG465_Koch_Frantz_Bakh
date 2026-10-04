const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update a session
 *     description: Updates one or more fields of an existing session.
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the session
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
 *               id:
 *                 type: number
 *                 description: The ID of the session
 *                 example: 1
 *     responses:
 *       200:
 *         description: Session updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: No fields were provided or price has an invalid data type
 *       404:
 *         description: Session not found
 *       500:
 *         description: Internal server error, failed to update session
 */
const updateSession = async (req, res) => {
    try {
        // extract fields from request body
        const { id } = req.body;

        // check that at least one field was provided
        if (id === undefined) {
            return res.status(400).json({error: 'At least one field must be provided.'});
        }

        // get database
        const db = getDB();

        // get sessions collection
        const sessions = db.collection('sessions');

        // add fields to updates if they are provided
        const updates = {};
        if (id !== undefined) updates.id = id;

        // update the session in the database
        const result = await sessions.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        // check if any document was matched and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Session not found.'
            });
        }

        // retrieve the updated session
        const updatedSession = await sessions.findOne({
            _id: new ObjectId(req.params.id)
        });

        // return the updated session
        res.status(200).json(updatedSession);
    } catch (error) {
        console.error('Error updating session:', error);
        res.status(500).json({error: 'Failed to update session.'});
    }
};

module.exports = updateSession;
