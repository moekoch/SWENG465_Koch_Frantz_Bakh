const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/avatars/{id}/price:
 *   get:
 *     summary: Get avatar price
 *     description: Retrieves the price of an avatar by its ID
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
 *         description: Avatar price retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 price:
 *                   type: number
 *                   description: The price of the avatar
 *                   example: 19.99
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error, failed to retrieve avatar price
 */
const getAvatarPrice = async (req, res) => {
    try {
        //get database
        const db = getDB();

        //get avatars collection
        const avatars = db.collection('avatars');

        // retrieve the avatar by ID and project only the price field
        const avatar = await avatars.findOne(
            { _id: new ObjectId(req.params.id) },
            { projection: { price: 1 } }
        );

        // check if avatar exists
        if (!avatar) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        //return ok status and price of avatar
        res.status(200).json({
            price: avatar.price
        });
    } catch (error) {
        console.error('Error retrieving avatar price:', error);
        res.status(500).json({error: 'Failed to retrieve avatar price.'});
    }
};

module.exports = getAvatarPrice;