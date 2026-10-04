const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/avatars/{id}/color:
 *   get:
 *     summary: Get avatar color
 *     description: Retrieves the color of an avatar by its ID
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the avatar
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     responses:
 *       200:
 *         description: Avatar color retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 color:
 *                   type: string
 *                   description: The color of the avatar
 *                   example: blue
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error, failed to retrieve avatar color
 */
const getAvatarColor = async (req, res) => {
    try {
        //get database
        const db = getDB();

        //get avatars collection
        const avatars = db.collection('avatars');

        // retrieve the avatar by ID and project only the color field
        const avatar = await avatars.findOne(
            { _id: new ObjectId(req.params.id) },
            { projection: { color: 1 } }
        );

        // check if avatar exists
        if (!avatar) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        //return ok status and color of avatar
        res.status(200).json({
            color: avatar.color
        });
    } catch (error) {
        console.error('Error retrieving avatar color:', error);
        res.status(500).json({error: 'Failed to retrieve avatar color.'});
    }
};

module.exports = getAvatarColor;