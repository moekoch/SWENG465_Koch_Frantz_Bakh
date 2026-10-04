const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/avatars/{id}/name:
 *   get:
 *     summary: Get avatar name
 *     description: Retrieves the name of an avatar by its ID
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
 *         description: Avatar name retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   description: The name of the avatar
 *                   example: Koi
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error, failed to retrieve avatar name
 */
const getAvatarName = async (req, res) => {
    try {
        //get database
        const db = getDB();

        //get avatars collection
        const avatars = db.collection('avatars');

        // retrieve the avatar by ID and project only the name field
        const avatar = await avatars.findOne(
            { _id: new ObjectId(req.params.id) },
            { projection: { name: 1 } }
        );

        // check if avatar exists
        if (!avatar) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        //return ok status and name of avatar
        res.status(200).json({
            name: avatar.name
        });
    } catch (error) {
        console.error('Error retrieving avatar name:', error);
        res.status(500).json({error: 'Failed to retrieve avatar name.'});
    }
};

module.exports = getAvatarName;